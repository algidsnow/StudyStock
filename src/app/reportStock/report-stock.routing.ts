import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ReportRootComponent } from "./report-root/report-root.component";
import { Report24hmoneyComponent } from "./report24hmoney/report24hmoney.component";


// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const ReportStockRoutes: Routes = [
  {
  path:'',
  component: Report24hmoneyComponent,
  children: [
    { path: 'report24h', component: Report24hmoneyComponent},
  ]
}
]
@NgModule({
  imports: [RouterModule.forChild(ReportStockRoutes)],
  exports: [RouterModule]
})
export class ReportStockRoutingModule { }