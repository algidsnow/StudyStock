import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiReportComponent, FinanciReportTypeLabel, HeaderReport24h, OptionReport24h } from '../api.report.services';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { TreeNode } from 'primeng/api';
import { analyzeAndValidateNgModules } from '@angular/compiler';
@Component({
  selector: 'app-report24hmoney',
  templateUrl: './report24hmoney.component.html',
  styleUrls: ['./report24hmoney.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Report24hmoneyComponent implements OnInit {
  finacialReportTypes: any[] = [];
  option: OptionReport24h = new OptionReport24h();
  tableData: TreeNode[] = [];
  resultApi: any[] = [];
  cols: any[] = [{ field: "col", header: "Tiêu đề" }];
  calculator: string = "";
  // frozenCols: any[] =  [{ field: "col", header: "col" }];
  constructor(private api: ApiReportComponent) {
  }
  ngOnInit(): void {
    this.GetFinacialReportType();
    this.GetData();
  }


  GetData() {
    if (this.option.StockCode) {
      this.cols = [{ field: "col", header: "Tiêu đề" }];
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
          this.cols.push(header)
        });
        var rowParent: any;
        var rowChild_lv2: TreeNode;
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
              var rowChild_lv3 = this.FillDataForCol(this.cols, element);
              rowChild_lv2.children.push(rowChild_lv3)
              break;
          }
        });
        this.tableData = this.tableData.slice();
        this.resultApi = x.data.rows;
      });
    }
  }
  SearchReport() {
    this.GetData();
  }
  GetFinacialReportType() {
    FinanciReportTypeLabel.forEach((label, value) => {
      var data = {
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
    var node = {
      data: {
        col: datafill.name,
      },
      expanded: true,
      children: []
    }
    for (let i = 1; i < cols.length; i++) {
      var colField = cols[i].field;
      var colData = datafill.values[i - 1]
      node.data[colField] = !colData ? "N/A" : typeof colData === "number" ? this.numberWithCommas(colData) : colData;
    }
    return node;
  }
  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  onclick_Table(val) {
    this.calculator += "{" + val.node.data.col + "}";
   
  }
  CalculateRow(){
    var match = this.calculator.match(/(?<=({))[a-za-z0-9A-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễếệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý ,]*(?=(}))/g)
    // let objData;
    // match.forEach(element => {
    //  var getCol =  this.resultApi.find(x=> x.name=== element);
    //  objData[element] = getCol.values
    // });
    var node = {
      data: {
        col: "Demo",
      },
      expanded: true,
      children: []
    }
    for (let i = 1; i < this.cols.length; i=i+ 2) {
      let objData = {};
      match.forEach(element => {
        var getCol =  this.resultApi.find(x=> x.name=== element);
        objData[element] = getCol.values[i-1];
       });
      var calculateStr  =   '{result:' +this.FomatString(this.calculator, objData) + '}';
      var resultCalculate = this.looseJsonParse(calculateStr);
      var colField = this.cols[i].field;
      node.data[colField] = resultCalculate.result.toFixed(2);
   
    }
    this.tableData.push(node);
    this.tableData = this.tableData.slice();
  }
    
  FomatString(str: string, arr): string {
    if (str && arr)
      var args = Object.keys(arr);
    args.forEach(element => {
      str = str.replace(new RegExp("\\{" + element + "\\}", "gi"), arr[element]);
    })
    return str;
  }

looseJsonParse(obj) {
  return Function(`"use strict";return (${obj})`)();
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
