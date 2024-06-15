import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule } from "@nebular/theme";
import { ThemeModule } from '../@theme/theme.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorModule } from "../@theme/components/paginator/paginator.module";
import { BillListModule } from './billList/bill-list.module';
import { ChartModule } from './chart/chart.module';
import { CheckinComponent } from './checkIn/checkin.component';
import { CheckoutComponent } from './checkOut/checkout.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { DialogComponent } from './dialog/dialog.component';
import { HotelsComponent } from './hotels/hotels.component';
import { ListRoomComponent } from './listRoom/list-room.component';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { SettingsComponent } from './settings/settings.component';
import { FoodComponent } from './food/food.component';
import { BillListComponent } from './billList/bill-list.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    BillListModule,
    ChartModule,
    NbMenuModule,
    PaginatorModule,
    FormsModule,
    ReactiveFormsModule, NbCardModule
  ],
  declarations: [PagesComponent, HotelsComponent,
    DialogComponent,
    ListRoomComponent,
    SettingsComponent,
    CheckinComponent,
    CheckoutComponent,
    FoodComponent,
    BillListComponent],
  providers: [],
})
export class PagesModule { }
