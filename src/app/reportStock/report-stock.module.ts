import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Report24hmoneyComponent } from "./report24hmoney/report24hmoney.component";
import { ReportStockRoutes, ReportStockRoutingModule } from "./report-stock.routing";
import { ReportRootComponent } from './report-root/report-root.component';
import { FomatTypePipe } from "../common/pipes/fomat-type.pipe";
import { PipeModule } from "../common/modules/pipe.module";
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forChild(ReportStockRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReportStockRoutingModule,
    MatTreeModule,
    MatIconModule,
    MatTableModule
  ],
  declarations: [
     Report24hmoneyComponent,
    // RtlComponent
    ReportRootComponent,
  ],
  // providers: [FomatTypePipe]
})
export class ReportStockModule {}
