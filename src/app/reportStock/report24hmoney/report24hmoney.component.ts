import { Component, OnInit } from '@angular/core';
import { ApiReportComponent, HeaderReport24h } from '../api.report.services';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

interface FoodNode {
  name: string;
  count?: number;
  demo?: number;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    count: 60,
    demo: 1995,
    children: [
      { name: 'Apple',
       count: 10,
       demo: 1995,
       children: [
        {name: 'orange', count: 1999}
      ]
     },
      { name: 'Banana', count: 20 },
      { name: 'Fruit loops', count: 30 },
    ]
  }, {
    name: 'Vegetables',
    demo: 1995,
    children: [
      {
        name: 'Green',
        children: [
          { name: 'Broccoli', count: 10 },
          { name: 'Brussel sprouts', count: 20 },
        ]
      }, {
        name: 'Orange',
        children: [
          { name: 'Pumpkins', count: 30 },
          { name: 'Carrots', count: 40 },
        ]
      },
    ]
  },
];

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  count: number;
  demo: number;
  level: number;
}

@Component({
  selector: 'app-report24hmoney',
  templateUrl: './report24hmoney.component.html',
  styleUrls: ['./report24hmoney.component.scss'],
})
export class Report24hmoneyComponent implements OnInit {
  private transformer = (node: any, level: number, ) => {
    // var a = {
    //   name : node.name,

    // }
    return {
      expandable: !!node.children && node.children.length > 0,
      // name: node.name,
      'name': node.name,
      // count: node.count,
      // demo: node.demo,
      level: level,
    };
  }
  // tslint:disable-next-line: member-ordering
  treeControl = new FlatTreeControl<any>(
    node =>node.level, node => node.expandable);

  // tslint:disable-next-line: member-ordering
  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.children)
  // tslint:disable-next-line: member-ordering
  headersReport24h: HeaderReport24h[] = [];
  // tslint:disable-next-line: member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  displayedColumns: string[] = ['name','count'];
  displayedColumnsExeptName: string[] = ['count'];
  constructor(private api: ApiReportComponent) {
    this.dataSource.data = TREE_DATA;
  }
  // hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit(): void {

    console.log(this.transformer)
    this.api.Get_Data_24hMoney().subscribe(x => {
      console.log(x);
      this.headersReport24h = x.data.headers;
      this.headersReport24h.forEach(element => {
        const hearder = this.FomatHeader(element);
        // this.displayedColumns.push(hearder);
        // this.displayedColumnsExeptName.push(hearder);
      });
    });
  }
  FomatHeader(hearder: HeaderReport24h): string{
     const typeStr = hearder.type === 'percent' ? '%' : '';
     return typeStr + ' ' + hearder.quarter + '/'  + hearder.year;
  }
}
