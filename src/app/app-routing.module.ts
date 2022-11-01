import { NgModule } from "@angular/core";
import { CommonModule, LocationStrategy, PathLocationStrategy } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
// import {APP_BASE_HREF} from '@angular/common';

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ReportRootComponent } from "./reportStock/report-root/report-root.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/report/report24h",
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminLayoutComponent,
    data:{
      tittle:""
    },
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/admin-layout/admin-layout.module").then(m => m.AdminLayoutModule)
      },
      {
      path: "report",
      loadChildren: () => import ("./reportStock/report-stock.module").then(m => m.ReportStockModule)
      }
    ]
  },
   {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        loadChildren: () => import ("./layouts/auth-layout/auth-layout.module").then(m => m.AuthLayoutModule)
      }
    ]
  },
  // { path: '**', component: Error404Component }
];

@NgModule({
  imports: [
    // CommonModule,
    // BrowserModule,
      // RouterModule.forRoot(routes)
  // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  CommonModule,
  BrowserModule,
  RouterModule.forRoot(routes, {
    useHash: true
  })
  ],
  exports: [RouterModule],
  providers: [
    Location, {provide: LocationStrategy, useClass: PathLocationStrategy}
    ]
})
export class AppRoutingModule {}
