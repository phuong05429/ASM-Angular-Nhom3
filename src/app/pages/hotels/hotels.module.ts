import { NgModule } from '@angular/core';
import {HotelsComponent} from './hotels.component';
import {BreadcrumbModule} from "xng-breadcrumb";
@NgModule({
  imports: [
    BreadcrumbModule
  ],
  declarations: [
    HotelsComponent
  ],
})
export class HotelsModule { }
