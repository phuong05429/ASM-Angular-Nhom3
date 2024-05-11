import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {CheckoutComponent} from "./checkOut/checkout.component";
import {BillListComponent} from "./billList/bill-list.component";
import {CheckinComponent} from "./checkIn/checkin.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
      data: {breadcrumb: 'Dashboard'},
    },
    {
      path: 'check-in',
      component: CheckinComponent,
      data: {breadcrumb: 'Đặt phòng'},
    },
    {
      path: 'check-out',
      component: CheckoutComponent,
      data: {breadcrumb: 'Hóa đơn'},
    },
    {
      path: 'bill-list',
      component: BillListComponent,
      data: {breadcrumb: 'Danh sách hóa đơn'},
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
