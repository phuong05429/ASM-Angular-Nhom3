import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  successMessage: string = '';

  roomTypes = [
    { value:'1',type: 'Phòng đơn', price: 100000, overnight: 200000 },
    { value:'2',type: 'Phòng đôi', price: 200000, overnight: 500000 },
    { value:'3',type: 'Phòng vip', price: 300000, overnight: 800000 },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.settingsForm = this.fb.group({
      roomType: ['', Validators.required],
      price: [{ value: '' }, Validators.required],
      overnight: [{ value: '' }, Validators.required],
      floor: ['', Validators.required],
    });
  }

  updatePrice() {
    const selectedType = this.settingsForm.get('roomType')?.value;
    const selectedRoom = this.roomTypes.find(
      (room) => room.value === selectedType
    );
    if (selectedRoom) {
      this.settingsForm.get('price')?.setValue(selectedRoom.price);
      this.settingsForm.get('overnight')?.setValue(selectedRoom.overnight);
    }
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      const settings = this.settingsForm.value;
      
      this.roomTypes = this.roomTypes.map((room: any) => {
        if (room.value == settings.roomType) {
          return { ...room, price: settings.price, overnight: settings.overnight };
        } else {
          return { ...room };
        }
      });
      
      const listRoomType = JSON.stringify(this.roomTypes);
      const totalFloor = JSON.stringify(this.settingsForm.value.floor);
      localStorage.setItem('listRoomType', listRoomType);
      localStorage.setItem('totalFloor', totalFloor);

      // Add your save logic here
    }
  }
}
