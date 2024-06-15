import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CheckIntModel } from 'app/@core/model/checkin.model';
import { RoomModel } from 'app/@core/model/room.model';
import { CheckInService } from 'app/@core/services/apis/checkin.service';
import { RoomService } from 'app/@core/services/apis/room.service';
import { DateUtil } from 'app/@core/utils/date.util';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./checkin.component.scss'],
  templateUrl: './checkin.component.html',
})
export class CheckinComponent implements OnInit {
  isDialogOpen: boolean = false;
  formData: FormGroup;
  roomTypes: any[] = [];
  rooms: any[] = [];
  checkinList: CheckIntModel[] = [];
  isEdit: boolean = false;
  selectedCheckin: any = null;
  selectedTypeRoom: any = null;

  constructor(
    private roomService: RoomService,
    private checkinService: CheckInService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const listRoomType = localStorage.getItem('listRoomType');
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      roomType: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required,this.phoneNumberValidator]), 
      cccd: new FormControl('', [Validators.required]),
      room: new FormControl('', [Validators.required]),
      times: new FormControl('', [Validators.required]),
    });

    if (listRoomType) {
      const settingsFormObject = JSON.parse(listRoomType);
      this.roomTypes = settingsFormObject;
    } else {
      console.log(
        'Không tìm thấy dữ liệu của settingsForm trong local storage.'
      );
    }
    this.load()
  }

   phoneNumberValidator = (control: FormControl): { [key: string]: any } | null => {
    const valid = /^0\d{9}$/.test(control.value);  // Kiểm tra số điện thoại bắt đầu bằng 0 và có tổng cộng 10 chữ số
    return valid ? null : { invalidPhoneNumber: true };
  };


  loadRooms(roomType?: string): void {
    this.roomService.getTypeRooms(roomType).subscribe({
      next: (res) => {
        const { data, status } = res;
        if (status == 'success') {
          this.rooms = data.rooms?.filter((room:RoomModel)=>room.status != "occupied");
        }
      },
      error: (err) => {
        console.error('Error loading hotels', err);
      },
    });
  }

  updatePrice() {
    const selectedType = this.formData.get('roomType')?.value;
    
    this.loadRooms(selectedType);
    
     this.selectedTypeRoom = this.roomTypes.find(
      (room) => room.value === selectedType
    );

  }
  updateTime(){
    const selectedType = this.formData.get('times')?.value;
    console.log(selectedType);
    console.log(this.selectedTypeRoom);
    
    if(this.selectedTypeRoom && selectedType == "hour"){
      this.formData.get('price')?.setValue(this.selectedTypeRoom.price);
    }
    if(this.selectedTypeRoom && selectedType == "overnight"){
      this.formData.get('price')?.setValue(this.selectedTypeRoom.overnight);
    }

  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  add(): void {
    this.markFormGroupTouched(this.formData);
    if (this.formData.valid) {    
      if (!this.isEdit) {
        // Thêm mới khách sạn
        const newCheckin: CheckIntModel = {
          name: this.formData.value.name,
          price: this.formData.value.price,
          roomType: this.formData.value.roomType,
          email: this.formData.value.email,
          phone: this.formData.value.phone,
          cccd: this.formData.value.cccd,
          room: this.formData.value.room,
          times: this.formData.value.times,
          roomName: this.rooms.filter(room=>room.id == this.formData.value.room)?.[0].name
        };
        this.checkinService.addCheckIn(newCheckin).subscribe({
          next: (res) => {
            console.log('Khách sạn đã được thêm:', res);
            // Đóng dialog sau khi thêm thành công
            this.isDialogOpen = false;
            // Lấy lại danh sách khách sạn sau khi thêm
            this.load();
          },
          error: (err) => {
            console.error('Lỗi khi thêm khách sạn:', err);
          },
        });
      } else {
        // Sửa khách sạn
        if (this.selectedCheckin) {
          const newCheckin: CheckIntModel = {
            id: this.selectedCheckin.id,
            name: this.formData.value.name,
            price: this.formData.value.price,
            roomType: this.formData.value.roomType,
            email: this.formData.value.email,
            phone: this.formData.value.phone,
            cccd: this.formData.value.cccd,
            room: this.formData.value.room,
            times: this.formData.value.times,
          };

          this.checkinService.editCheckIn(newCheckin).subscribe({
            next: (res) => {
              console.log('Khách sạn đã được sửa:', res);
              this.isDialogOpen = false;
              this.load();
            },
            error: (err) => {
              console.error('Lỗi khi sửa khách sạn:', err);
            },
          });
        }
      }
      this.closeDialog();
    }
  }

  load(): void {
    this.checkinService.getCheckIn().subscribe({
      next: (res) => {
        const { data, status } = res;
        if (status == 'success') {
          console.log(data.checkIns);
          
          this.checkinList = data.checkIns.filter(c=>c.checkOutDate == null).map((checkin:any)=>({...checkin,checkInDate:DateUtil.convertFullTime(checkin.checkInDate)}))
        }
      },
      error: (err) => {
        console.error('Error loading hotels', err);
      },
    });
  }

  checkout(data: any): void {
    this.router.navigate(['/pages/check-out']);
    sessionStorage.setItem("customer",JSON.stringify(data))
  }

  openDialog() {
    this.isDialogOpen = true;
  }
  closeDialog() {
    this.isDialogOpen = false;
    // this.isEdit = false;
    // this.selectedRoom = null;
    this.formData.reset();
  }
}
