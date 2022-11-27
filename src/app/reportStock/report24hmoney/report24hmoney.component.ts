import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApiReportComponent, CreateReport24hData, FinanciReportTypeLabel, HeaderReport24h, OptionReport24h } from '../api.report.services';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CdkTreeNodeToggle, FlatTreeControl } from '@angular/cdk/tree';
import { TreeNode } from 'primeng/api';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CommonServiceComponent } from 'src/app/common/service/common.services';
import { CalculationFormula } from 'src/model/CalculationFormula';
@Component({
  selector: 'app-report24hmoney',
  templateUrl: './report24hmoney.component.html',
  styleUrls: ['./report24hmoney.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Report24hmoneyComponent implements OnInit {
  @ViewChild('calculator') calculator: ElementRef;
  finacialReportTypes: any[] = [];
  option: OptionReport24h = new OptionReport24h();
  dropdownSettings : IDropdownSettings;
  tableData: TreeNode[] = [];
  resultApi: any[] = [];
  cols: any[] = [{ field: 'col', header: 'Tiêu đề' }];
  // calculator =  '';
  // calculatorName = '';
  model: CreateReport24hData = new CreateReport24hData();
  closeResult = '';
  modalReference: any;
  multipleSelect = [];
  options: string[] = ['One', 'Two', 'Three'];
  // frozenCols: any[] =  [{ field: "col", header: "col" }];
  constructor(private api: ApiReportComponent, private modalService: NgbModal, private common: CommonServiceComponent) {
  }
  ngOnInit(): void {
    this.GetFinacialReportType();
    this.GetData();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'field',
      textField: 'header',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  GetListFormula
  GetData() {
    if (this.option.StockCode) {
      this.cols = [{ field: "col", header: "Tiêu đề" }];
      this.multipleSelect = [];
      this.tableData = [];
      this.api.Get_Data_24hMoney(this.option).subscribe(x => {
        console.log(x);
        x.data.headers.forEach(element => {
          const fomatHeader = this.FomatHeader(element)
          const header =
          {
            field: fomatHeader,
            header: fomatHeader
          }
          this.cols.push(header);
          if(fomatHeader.indexOf('%') < 0){
            this.multipleSelect.push(header);
          }
        });
        this.model.SelectedCols = this.multipleSelect;
        let rowParent: any;
        // tslint:disable-next-line: variable-name
        let rowChild_lv2: TreeNode;
        x.data.rows.forEach(element => {

          switch (element.level) {
            case 1:
              rowParent = this.FillDataForCol(this.cols, element);
              this.tableData.push(rowParent)
              break;
            case 2:
              rowChild_lv2 = this.FillDataForCol(this.cols, element);
              rowParent.children.push(rowChild_lv2)
              break
            case 3:
              // tslint:disable-next-line: variable-name
              let rowChild_lv3 = this.FillDataForCol(this.cols, element);
              rowChild_lv2.children.push(rowChild_lv3)
              break;
          }
        });
        this.tableData = this.tableData.slice();
        this.resultApi = x.data.rows;
      });
    }
  }


  RecursionData(data:TreeNode[], col:string):TreeNode {
    let result;
     // tslint:disable-next-line: prefer-for-of
     for(let i = 0; i < data.length; i++) {
        const element = data[i];
        if(this.common.nonAccentVietnamese(element.data.col) === this.common.nonAccentVietnamese(col)){
        return element;
        }
        if(element.children.length > 0){
          result =   this.RecursionData(element.children, col);
          if(result){
           break;
          }
        }
      }
      return result;
     }

     RecursionReplaceDataTable(data:TreeNode[], node:TreeNode) {
      let result;
       // tslint:disable-next-line: prefer-for-of
       for(let i = 0; i < data.length; i++) {
          const element = data[i];
          if(this.common.nonAccentVietnamese(element.data.col) === this.common.nonAccentVietnamese(node.data.col)){
              element.data.forEach(el => {
                if( node.data[el] && ( +element.data[el] === 0 || !element.data[el] )){
                  element.data[el] = node.data[el];
                }
              });
          return true;
          }
          if(element.children.length > 0){
            result =   this.RecursionReplaceDataTable(element.children, node);
            if(result){
             break;
            }
          }
        }
        return result;
       }

  SearchReport() {
    this.GetData();
  }
  GetFinacialReportType() {
    FinanciReportTypeLabel.forEach((label, value) => {
      const data = {
        Id: value,
        Name: label
      }
      this.finacialReportTypes.push(data)
    });
  }
  FomatHeader(hearder: HeaderReport24h): string {
    const typeStr = hearder.type === 'percent' ? '%' : '';
    return typeStr + hearder.quarter + '/' + hearder.year;
  }
  // Lấy dữ liệu cho cột
  FillDataForCol(cols: any[], datafill: any): TreeNode {
    const node = {
      data: {
        col: datafill.name,
      },
      expanded: true,
      children: []
    }
    for (let i = 1; i < cols.length; i++) {
      const colField = cols[i].field;
      const colData = datafill.values[i - 1]
      node.data[colField] = !colData ? "0" : typeof colData === "number" ? this.numberWithCommas(colData) : colData;
    }
    return node;
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  onclick_Table(val) {
    this.model.Calculator += '{' + val.node.data.col + '}';
    this.calculator.nativeElement.focus();
  }
  CalculateRow(){
    const node = {
      data: {
        col: this.model.CalculatorName,
      },
      expanded: true,
      children: []
    }
    let isSaveFormula = false;
    const match = this.RegexData(this.model.Calculator);
    for (let i = 0; i < this.model.SelectedCols.length; i++) {
      let objData = {};
      let calculateStr = '';
      if(match && match.length > 0){
        match.forEach(element => {
          const getCol = this.RecursionData(this.tableData, element);
          if(getCol){
            objData[element] =  getCol.data[this.model.SelectedCols[i].field];
          }
         });
      }
       if(Object.keys(objData).length > 0 ){
        // tslint:disable-next-line: no-shadowed-variable
        const replaceComma = this.FomatString(this.model.Calculator, objData).replace(/\,/gi,'')
         calculateStr  =   '{result:' +replaceComma + '}';
         isSaveFormula = true;
       }
       else{
        const replaceComma = this.model.Calculator.replace(/\,/gi,'')
        calculateStr  =   '{result:' + replaceComma + '}';
       }
      const resultCalculate = this.looseJsonParse(calculateStr);
      const colField = this.model.SelectedCols[i].field;
      node.data[colField] = resultCalculate.result.toFixed(2);
    }
  // tslint:disable-next-line: max-line-length
  const existRowInTable = this.tableData.find(x=> this.common.nonAccentVietnamese(x.data.col) === this.common.nonAccentVietnamese(node.data.col));
    if(existRowInTable){
      Object.keys(node.data).forEach(element => {
          if(element !== 'col' && node.data[element]){
            existRowInTable.data[element] = node.data[element];
          }
      });
    }
    else{
      this.tableData.push(node);
    }
    if(isSaveFormula){
      const formulaModel:CalculationFormula = {
        Name: this.model.CalculatorName,
        Caculate: this.model.Calculator,
        Search_Filed : this.common.nonAccentVietnamese(this.model.CalculatorName)
      }
      this.api.r1_Post_Data(formulaModel, 'api/CalculationsFomula').subscribe(res =>{
        console.log(res);
      });
    }
    this.tableData = this.tableData.slice();
    this.modalReference.close();
  }
  // replace chuỗi thành số
  FomatString(str: string, arr): string {
    if (str && arr)
      // tslint:disable-next-line: prefer-const
      var args = Object.keys(arr);
    args.forEach(element => {
      str = str.replace(new RegExp('\\{' + element + '\\}', 'gi'), arr[element]);
    })
    return str;
  }
// Tính toán
looseJsonParse(obj) {
  return Function(`"use strict";return (${obj})`)();
}
// Dùng regex lấy data trong {}
RegexData(str){
  const match = str.match(/(?<=({))[a-za-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý , /]*(?=(}))/g);
  return match;
}

/** Modal */
open(content) {
  this.modalReference = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title',modalDialogClass: 'dark-modal' })
  this.modalReference.result.then(
    (result) => {
      this.closeResult = `Closed with: ${result}`;
    },
    (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    },
  );
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}

}



// Demo data
    //   this.cols = [
    //     { field: 'name', header: 'First Name' },
    //     { field: 'age', header: 'Age' },
    // ];
    // this.tableData = [
    //     {
    //         data: {
    //             col: 'David',
    //             // age: '40',
    //         },
    //         children: [
    //             {
    //                 data: {
    //                     col: 'Nathan',
    //                     age: '16',
    //                 },
    //                 children: [
    //                   {
    //                       data: {
    //                           col: 'Nathan',
    //                           age: '16',
    //                       },

    //                   }],
    //             },

    //             {
    //                 data: {
    //                     col: 'Shane',
    //                     age: '14',
    //                 },
    //             },
    //         ],
    //     },
    // ]
