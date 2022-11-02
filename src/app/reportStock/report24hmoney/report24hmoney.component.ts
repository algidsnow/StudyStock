import { Component, OnInit } from '@angular/core';
import { ApiReportComponent, HeaderReport24h } from '../api.report.services';

@Component({
  selector: 'app-report24hmoney',
  templateUrl: './report24hmoney.component.html',
  styleUrls: ['./report24hmoney.component.scss'],
})
export class Report24hmoneyComponent implements OnInit {
  headersReport24h: HeaderReport24h[] = [];
  constructor(private api:ApiReportComponent) { 
  }

  ngOnInit(): void {
    debugger;
    this.api.Get_Data_24hMoney().subscribe(x=>{
      console.log(x);
      this.headersReport24h = x['headers'];
    });
    // this.api.Get_Model_Dstock().subscribe(x=>{
    //   console.log(x);
    //   this.api.Get_Data_Dstock();
    // })
  }
}
