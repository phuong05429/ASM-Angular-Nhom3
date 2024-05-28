import { NgModule } from '@angular/core';
import {CheckinComponent} from './checkin.component';
import {BreadcrumbModule} from "xng-breadcrumb";
@NgModule({
  imports: [
    BreadcrumbModule
  ],
  declarations: [
    CheckinComponent
  ],
})
export class CheckindModule { }
