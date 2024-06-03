import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomModel } from 'app/@core/model/room.model';
import { HotelsService } from 'app/@core/services/apis/hotels.service';
import { RoomService } from 'app/@core/services/apis/room.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./list-room.component.scss'],
  templateUrl: './list-room.component.html',
})
export class ListRoomComponent implements OnInit {
  isDialogOpen: boolean = false;
  formData: FormGroup;
  roomTypes: any[] = [];
  floors: number[] = [];
  rooms: RoomModel[] = [];
  isEdit: boolean = false;
  selectedRoom: any = null;
  isOpenDelete: boolean = false;

  constructor(private roomService: RoomService) {}

  ngOnInit(): void {
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      overnight: new FormControl('', [Validators.required]),
      roomType: new FormControl('', [Validators.required]),
      floor: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
    const listRoomType = localStorage.getItem('listRoomType');
    const totalFloor = localStorage.getItem('totalFloor');

    if (listRoomType) {
      const settingsFormObject = JSON.parse(listRoomType);
      this.roomTypes = settingsFormObject;
      // this.settingsForm.setValue(settingsFormObject);
    } else {
      console.log(
        'Không tìm thấy dữ liệu của settingsForm trong local storage.'
      );
    }
    if (totalFloor) {
      this.floors = new Array(Number(totalFloor))
        .fill(null)
        .map((_, index) => index + 1);
    }

    this.loadRooms();
  }

  loadRooms(status?:string): void {
    this.roomService.getRooms(status).subscribe({
      next: (res) => {
        const { data, status } = res;
        if (status == 'success') {
          this.rooms = data.rooms;
        }
      },
      error: (err) => {
        console.error('Error loading hotels', err);
      },
    });
  }

  get roomsByFloor(): { floor: number; rooms: RoomModel[] }[] {
    const roomsByFloor: { floor: number; rooms: RoomModel[] }[] = [];
    // Group rooms by floor
    this.rooms.forEach((room) => {
      const existingFloor = roomsByFloor.find(
        (item) => item.floor === room.floor
      );
      if (existingFloor) {
        existingFloor.rooms.push(room);
      } else {
        roomsByFloor.push({ floor: room.floor, rooms: [room] });
      }
    });

    return roomsByFloor.sort((a, b) => a.floor - b.floor);
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  editRoom(room: RoomModel): void {
    // Mở dialog ở chế độ sửa và điền dữ liệu của khách sạn vào form
    this.isEdit = true;
    this.selectedRoom = room;
    this.openDialog();
    this.formData.patchValue({
      name: room.name,
      price: room.price,
      overnight: room.overnight,
      roomType: room.roomType,
      floor: room.floor,
      description: room.description,
    });
  }

  addRoom(): void {
    this.markFormGroupTouched(this.formData);
    
    if (this.formData.valid) {
      if (!this.isEdit) {
        // Thêm mới khách sạn
        const newRoom: RoomModel = {
          name: this.formData.value.name,
          price: this.formData.value.price,
          overnight: this.formData.value.overnight,
          roomType: this.formData.value.roomType,
          floor: this.formData.value.floor,
          description: this.formData.value.description,
        };
        this.roomService.addRoom(newRoom).subscribe({
          next: (res) => {
            console.log('Khách sạn đã được thêm:', res);
            // Đóng dialog sau khi thêm thành công
            this.isDialogOpen = false;
            // Lấy lại danh sách khách sạn sau khi thêm
            this.loadRooms();
          },
          error: (err) => {
            console.error('Lỗi khi thêm khách sạn:', err);
          },
        });
      } else {
        // Sửa khách sạn
        console.log(this.selectedRoom);
        if (this.selectedRoom) {

          const newRoom: RoomModel = {
            id: this.selectedRoom.id,
            name: this.formData.value.name,
            price: this.formData.value.price,
            overnight: this.formData.value.overnight,
            roomType: this.formData.value.roomType,
            floor: this.formData.value.floor,
            description: this.formData.value.description,
          };

          this.roomService.editRoom(newRoom).subscribe({
            next: (res) => {
              console.log('Khách sạn đã được sửa:', res);
              this.isDialogOpen = false;
              this.loadRooms();
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

  updatePrice() {
    const selectedType = this.formData.get('roomType')?.value;

    const selectedRoom1 = this.roomTypes.find(
      (room) => room.value === selectedType
    );
    console.log(selectedRoom1);

    if (selectedRoom1) {
      this.formData.get('price')?.setValue(selectedRoom1.price);
      this.formData.get('overnight')?.setValue(selectedRoom1.overnight);
    }
  }

  deleteRoom(room: RoomModel) {
    this.isOpenDelete = true;
    this.selectedRoom = room;
  }

  deleteHotel(): void {
    this.roomService.deleteRoom(this.selectedRoom.id).subscribe({
      next: () => {
        this.loadRooms();
        this.closeDialogDelete();
      },
      error: (err) => {
        console.error('Lỗi khi xóa khách sạn:', err);
      },
    });
  }

  closeDialogDelete() {
    this.isOpenDelete = false;
    this.selectedRoom = null;
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.isEdit = false;
    this.selectedRoom = null;
    this.formData.reset();
  }
}
