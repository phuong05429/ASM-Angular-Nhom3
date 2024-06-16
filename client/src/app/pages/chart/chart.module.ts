import { NgModule } from '@angular/core';
import {ChartComponent} from './chart.component';
import {BreadcrumbModule} from "xng-breadcrumb";
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    BreadcrumbModule,
    FormsModule
  ],
  declarations: [
  ],
})
export class ChartModule { }
