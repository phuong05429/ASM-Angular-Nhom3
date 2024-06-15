import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheckInService } from 'app/@core/services/apis/checkin.service';
import { DateUtil } from 'app/@core/utils/date.util';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./checkout.component.scss'],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  showData: any = {};
  isOpen: boolean = false;
  constructor(private router: Router, private checkinService: CheckInService) {}
  ngOnInit(): void {
    const customerData = sessionStorage.getItem('customer');
    const listRoomType = localStorage.getItem('listRoomType');
    const settingsFormObject = JSON.parse(listRoomType);

    if (customerData) {
      console.log(
        settingsFormObject.filter(
          (type) => type.value == JSON.parse(customerData).roomType
        )
      );
      const timeIn = new Date(JSON.parse(customerData).createdAt).getTime();
      const timeOut = new Date().getTime();

      this.showData = {
        ...JSON.parse(customerData),
        roomType: settingsFormObject.filter(
          (type) => type.value == JSON.parse(customerData).roomType
        )?.[0]?.type,
        checkInDate: DateUtil.convertFullTime(
          JSON.parse(customerData).createdAt
        ),
        checkOut: DateUtil.convertFullTime(new Date()),
        diffHrs:
          JSON.parse(customerData).times == 'hours'
            ? Math.ceil((timeOut - timeIn) / (1000 * 60 * 60))
            : 1,
        total:
          Number(
            JSON.parse(customerData).times == 'hours'
              ? Math.ceil((timeOut - timeIn) / (1000 * 60 * 60))
              : 1
          ) * Number(JSON.parse(customerData).price),
      };
      console.log(this.showData);
    }
  }

  thanhToan() {
    this.isOpen = true;
  }
  closeDialog() {
    this.isOpen = false;
  }
  handleConfirm() {
    this.checkinService
      .updateCheckOutDate(this.showData.id, new Date())
      .subscribe({
        next: () => {
          this.isOpen = false;
          this.router.navigate(['/pages/check-in']);
          sessionStorage.removeItem('customer');
        },
        error: (err) => {
          alert('Có lỗi xảy ra');
        },
      });
  }
}
