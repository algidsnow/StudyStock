import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Report24hmoneyComponent } from "./report24hmoney/report24hmoney.component";
import { ReportStockRoutes, ReportStockRoutingModule } from "./report-stock.routing";
import { ReportRootComponent } from './report-root/report-root.component';
import { TreeTableModule } from 'primeng/treetable';
import { ShareModule } from "../common/modules/share.module";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forChild(ReportStockRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReportStockRoutingModule,
    TreeTableModule,
    ShareModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  declarations: [
     Report24hmoneyComponent,
    // RtlComponent
    ReportRootComponent,
  ],
  // providers: [FomatTypePipe]
})
export class ReportStockModule {}
