import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FomatTypePipe } from "../pipes/fomat-type.pipe";

@NgModule({
    declarations: [FomatTypePipe],
    imports: [
      CommonModule
    ],
    exports: [
    FomatTypePipe
    ]
  })
  export class PipeModule {
  }