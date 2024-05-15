import {NgModule} from '@angular/core';
import {NbMenuModule} from "@nebular/theme";
import {ThemeModule} from '../@theme/theme.module';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {CheckindModule} from './checkIn/checkin.module';
import {CheckoutdModule} from './checkOut/checkout.module';
import {BillListModule} from './billList/bill-list.module';
import {ListRoomModule} from './listRoom/list-room.module';
import {ChartModule} from './chart/chart.module';
import {PagesRoutingModule} from './pages-routing.module';
import {PaginatorModule} from "../@theme/components/paginator/paginator.module";

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    CheckindModule,
    CheckoutdModule,
    BillListModule,
    ListRoomModule,
    ChartModule,
    NbMenuModule,
    PaginatorModule,
  ],
  declarations: [
    PagesComponent,
  ],
  providers: []
})
export class PagesModule { }
