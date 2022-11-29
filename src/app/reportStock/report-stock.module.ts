import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Report24hmoneyComponent } from "./report24hmoney/report24hmoney.component";
import { ReportStockRoutes, ReportStockRoutingModule } from "./report-stock.routing";
import { ReportRootComponent } from './report-root/report-root.component';
import { TreeTableModule } from 'primeng/treetable';
import { ShareModule } from "../common/modules/share.module";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { MatNativeDateModule } from "@angular/material/core";
import { MaterialModule } from "src/material.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forChild(ReportStockRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ReportStockRoutingModule,
    TreeTableModule,
    ShareModule,
    NgMultiSelectDropDownModule.forRoot(),
    MaterialModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
     Report24hmoneyComponent,
    // RtlComponent
    ReportRootComponent,
  ],
  // providers: [FomatTypePipe]
})
export class ReportStockModule {}
