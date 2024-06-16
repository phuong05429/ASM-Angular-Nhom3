import { Component, OnInit } from '@angular/core';
import { CheckInService } from 'app/@core/services/apis/checkin.service';
import { DateUtil } from 'app/@core/utils/date.util';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./bill-list.component.scss'],
  templateUrl: './bill-list.component.html',
})
export class BillListComponent implements OnInit {
  checkedOutRooms: any[] = [];
  settingsFormObject: any = {};

  constructor(private checkinService: CheckInService) {}

  ngOnInit(): void {
    this.loadCheckedOutRooms();
    const listRoomType = localStorage.getItem('listRoomType');
    this.settingsFormObject = JSON.parse(listRoomType);
  }

  loadCheckedOutRooms(): void {
    this.checkinService.getCheckedOutRooms().subscribe({
      next: (rooms) => {
        this.checkedOutRooms = rooms.map((room) => {
          return {
            ...room,
            roomType: this.settingsFormObject.filter(
              (type: any) => type.value == room.roomType
            )?.[0]?.type,
            checkInDate: DateUtil.convertFullTime(room.createdAt),
            checkOutDate: DateUtil.convertFullTime(room.checkOutDate),
            diffHrs:
              room.times == 'hour'
                ? Math.ceil(
                    (new Date(room.checkOutDate).getTime() -
                      new Date(room.checkInDate).getTime()) /
                      (1000 * 60 * 60)
                  )
                : 1,
            total:
              Number(
                room.times == 'hour'
                  ? Math.ceil(
                      (new Date(room.checkOutDate).getTime() -
                        new Date(room.checkInDate).getTime()) /
                        (1000 * 60 * 60)
                    )
                  : 1
              ) * Number(room.price),
          };
        });
        console.log(this.checkedOutRooms);
      },
      error: (err) => {
        console.error('Có lỗi xảy ra khi tải danh sách phòng đã trả', err);
      },
    });
  }
}


