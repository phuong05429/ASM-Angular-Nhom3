import { Component, OnInit } from '@angular/core';
import { CheckInService } from 'app/@core/services/apis/checkin.service';
import { DateUtil } from 'app/@core/utils/date.util';

@Component({
  selector: 'ngx-bill',
  styleUrls: ['./bill-list.component.scss'],
  templateUrl: './bill-list.component.html',
})
export class BillListComponent implements OnInit {
  checkedOutRooms: any[] = [];
  settingsFormObject: any = {};
  totalItems: number;
  totalPages: number;
  currentPage: number = 1;
  limit: number = 5;
  apiUrl: string = ''
  lastPage: number = 0;

  constructor(private checkinService: CheckInService) { }

  ngOnInit(): void {
    this.loadCheckedOutRooms();
    const listRoomType = localStorage.getItem('listRoomType');
    this.settingsFormObject = JSON.parse(listRoomType);
    this.apiUrl = this.checkinService.apiUrl
  }

  loadCheckedOutRooms(): void {
    this.checkinService.getCheckedOutRooms(this.currentPage, this.limit).subscribe({
      next: (response) => {
        
        this.lastPage = response ? response.totalPages : 1;
        this.currentPage = response.currentPage;
        this.checkedOutRooms = response.data.map((room) => {
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
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
      },
      error: (err) => {
        console.error('Có lỗi xảy ra khi tải danh sách phòng đã trả', err);
      },
    });
  }

  getPage(current_page: any) {
    this.currentPage = current_page
    this.loadCheckedOutRooms()
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadCheckedOutRooms();
  }
}
