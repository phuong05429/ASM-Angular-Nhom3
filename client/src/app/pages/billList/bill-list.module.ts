import { NgModule } from '@angular/core';
import {BillListComponent} from './bill-list.component';
import {BreadcrumbModule} from "xng-breadcrumb";
@NgModule({
  imports: [
    BreadcrumbModule
  ],
  declarations: [
    BillListComponent
  ],
})
export class BillListModule { }
