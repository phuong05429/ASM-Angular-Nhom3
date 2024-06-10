import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  isAlertVisible = false;
  settingsForm: FormGroup;
  roomTypes = [
    { value:'1',type: 'Phòng đơn', price: 100000, overnight: 200000 },
    { value:'2',type: 'Phòng đôi', price: 200000, overnight: 500000 },
    { value:'3',type: 'Phòng VIP', price: 300000, overnight: 800000 },
  ];

  constructor(private fb: FormBuilder) {
    this.settingsForm = this.fb.group({
      roomType: ['', Validators.required],
      price: ['', Validators.required],
      overnight: ['', Validators.required],
      floor: ['', Validators.required]
    });
  }

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

  onSubmit(): void {
    if (this.settingsForm.valid) {
      // Simulate saving data to server
      // After saving data, show the success alert
      this.isAlertVisible = true;

      // Reset the form after successful submission
      this.settingsForm.reset();

      // Hide the alert after 3 seconds
      setTimeout(() => {
        this.isAlertVisible = false;
      }, 3000);
    } else {
      // Handle invalid form submission
      // Show validation errors
      this.settingsForm.markAllAsTouched();
    }
  }

 
}
