import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from "./dashboard/dashboard.component";

import {CheckoutComponent} from "./checkOut/checkout.component";
import {BillListComponent} from "./billList/bill-list.component";
import {CheckinComponent} from "./checkIn/checkin.component";
import {ListRoomComponent} from "./listRoom/list-room.component";
import {HotelsComponent} from "./hotels/hotels.component";
import {ChartComponent} from "./chart/chart.component";

import { UserComponent } from './user/user.component';
import { MenuComponent } from './menu/menu.component';
import { OutfitComponent } from './outfit/outfit.component';


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
    {
      path: 'list-room',
      component: ListRoomComponent,
      data: {breadcrumb: 'Danh sách phòng'},
    },
    {
      path: 'chart',
      component: ChartComponent,
      data: {breadcrumb: 'Biểu đồ lượt khách'},
    },
    {
      path: 'hotels',
      component: HotelsComponent,
      data: {breadcrumb: 'Khách Sạn'},
    },
    {
      path: 'user',
      component: UserComponent,
      data: {breadcrumb: 'user'},
    },
    {
      path: 'menu',
      component: MenuComponent,
      data: {breadcrumb: 'menu'},
    },
    {
      path: 'outfit',
      component: OutfitComponent,
      data: {breadcrumb: 'outfit'},
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
