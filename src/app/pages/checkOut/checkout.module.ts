import { NgModule } from '@angular/core';
import {CheckoutComponent} from './checkout.component';
import {BreadcrumbModule} from "xng-breadcrumb";
@NgModule({
  imports: [
    BreadcrumbModule
  ],
  declarations: [
    CheckoutComponent
  ],
})
export class CheckoutdModule { }
