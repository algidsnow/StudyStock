import { Component, OnInit } from '@angular/core';
import { ApiReportComponent, HeaderReport24h } from '../api.report.services';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';

interface FoodNode {
  name: string;
  count?: number;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      { name: 'Apple', count: 10 },
      { name: 'Banana', count: 20 },
      { name: 'Fruit loops', count: 30 },
    ]
  }, {
    name: 'Vegetables',
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
  level: number;
}

@Component({
  selector: 'app-report24hmoney',
  templateUrl: './report24hmoney.component.html',
  styleUrls: ['./report24hmoney.component.scss'],
})
export class Report24hmoneyComponent implements OnInit {
  private transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      count: node.count,
      level: level,
    };
  }
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level,
    node => node.expandable, node => node.children);
  headersReport24h: HeaderReport24h[] = [];
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  displayedColumns: string[] = ['name', 'count'];
  constructor(private api: ApiReportComponent) {
    this.dataSource.data = TREE_DATA;
  }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
  ngOnInit(): void {


    this.api.Get_Data_24hMoney().subscribe(x => {
      console.log(x);
      this.headersReport24h = x.data.headers;


    });

    // this.api.Get_Model_Dstock().subscribe(x=>{
    //   console.log(x);
    //   this.api.Get_Data_Dstock();
    // })
  }
}
