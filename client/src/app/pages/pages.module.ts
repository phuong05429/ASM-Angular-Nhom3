import {NgModule} from '@angular/core';
import {NbMenuModule} from "@nebular/theme";
import {ThemeModule} from '../@theme/theme.module';

import {PagesComponent} from './pages.component';
import {DashboardModule} from './dashboard/dashboard.module';
import {CheckindModule} from './checkIn/checkin.module';
import {CheckoutdModule} from './checkOut/checkout.module';
import {BillListModule} from './billList/bill-list.module';
import {ListRoomModule} from './listRoom/list-room.module';
import {HotelsModule} from './hotels/hotels.module';
import { DialogComponent } from './dialog/dialog.component';
import {ChartModule} from './chart/chart.module';
import {PagesRoutingModule} from './pages-routing.module';
import {PaginatorModule} from "../@theme/components/paginator/paginator.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelsComponent } from './hotels/hotels.component';
import { ListRoomComponent } from './listRoom/list-room.component';
import { SettingsComponent } from './settings/settings.component';
import { CheckinComponent } from './checkIn/checkin.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    CheckoutdModule,
    BillListModule,
    // ListRoomModule,
    // HotelsModule,
    ChartModule,
    NbMenuModule,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PagesComponent, HotelsComponent, DialogComponent,ListRoomComponent,SettingsComponent,CheckinComponent],
  providers: [],
})
export class PagesModule { }
