import { Component, OnInit } from '@angular/core';
import { ApiReportComponent } from '../api.report.services';

@Component({
  selector: 'app-report24hmoney',
  templateUrl: './report24hmoney.component.html',
  styleUrls: ['./report24hmoney.component.scss'],
})
export class Report24hmoneyComponent implements OnInit {

  constructor(private api:ApiReportComponent) { 

  }

  ngOnInit(): void {
    this.api.Get_Data_24hMoney();
   
    this.api.Get_Model_Dstock().subscribe(x=>{
      console.log(x);
      this.api.Get_Data_Dstock();
    })
  }
}
