import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import { MapHotelComponent } from './map-hotel/map-hotel.component';
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
      path: 'map-hotel',
      component: MapHotelComponent,
      data: {breadcrumb: 'Map-hotel'},
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
