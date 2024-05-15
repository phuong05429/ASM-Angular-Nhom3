import { NgModule } from '@angular/core';
import {ListRoomComponent} from './list-room.component';
import {BreadcrumbModule} from "xng-breadcrumb";
@NgModule({
  imports: [
    BreadcrumbModule
  ],
  declarations: [
    ListRoomComponent
  ],
})
export class ListRoomModule { }
