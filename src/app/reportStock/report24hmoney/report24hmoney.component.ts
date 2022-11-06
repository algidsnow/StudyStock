import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiReportComponent, HeaderReport24h } from '../api.report.services';
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

  tableData: TreeNode[] = [];
  cols: any[] = [{ field: "col", header: "col" }];
  // frozenCols: any[] =  [{ field: "col", header: "col" }];
  constructor(private api: ApiReportComponent) {
  }
  ngOnInit(): void {
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
    this.api.Get_Data_24hMoney().subscribe(x => {
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
      console.log(this.tableData)
      this.tableData = this.tableData.slice();
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
      var colData =  datafill.values[i - 1]
      node.data[colField] = typeof colData === "number" ? this.numberWithCommas(colData) : colData;
    }
    return node;
  }
   numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
}


