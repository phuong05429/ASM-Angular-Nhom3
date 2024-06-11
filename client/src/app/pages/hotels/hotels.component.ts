import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotelModel } from 'app/@core/model/hotel.model';
import { HotelsService } from 'app/@core/services/apis/hotels.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./hotels.component.scss'],
  templateUrl: './hotels.component.html',
})
export class HotelsComponent implements OnInit {
  isDialogOpen: boolean = false;
  formData: FormGroup;
  hotels: HotelModel[] = [];
  isEdit = false;
  editHotelId: string | null = null;
  title: string;
  dataHotels: HotelModel[];
  constructor(private hotelsService: HotelsService) { }
  ngOnInit(): void {
    this.loadHotels();
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    })
  }

  loadHotels(): void {
    this.hotelsService.getHotels().subscribe({
      next: (res) => {
        const { data, status } = res
        if (status == 'success') {
          this.hotels = data.hotels;
        }
      },
      error: (err) => {
        console.error('Error loading hotels', err);
      }
    });
  }
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
  addHotel(): void {
    this.markFormGroupTouched(this.formData);
    if (this.formData.valid) {
    if (!this.isEdit) {
      // Thêm mới khách sạn
      const newHotel: HotelModel = {
        name: this.formData.value.name,
        price: this.formData.value.price,
        image: this.formData.value.image,
        description: this.formData.value.description,
      };
      this.hotelsService.addHotel(newHotel).subscribe({
        next: (res) => {
          console.log('Khách sạn đã được thêm:', res);
          // Đóng dialog sau khi thêm thành công
          this.isDialogOpen = false;
          // Lấy lại danh sách khách sạn sau khi thêm
          this.loadHotels();
        },
        error: (err) => {
          console.error('Lỗi khi thêm khách sạn:', err);
        },
      });
    } else {
      // Sửa khách sạn
      if (this.editHotelId) {
        const editedHotel: HotelModel = {
          id: this.editHotelId,
          name: this.formData.value.name,
          price: this.formData.value.price,
          image: this.formData.value.image,
          description: this.formData.value.description,
        };

        this.hotelsService.editHotel(editedHotel).subscribe({
          next: (res) => {
            console.log('Khách sạn đã được sửa:', res);
            this.isDialogOpen = false;
            this.loadHotels();
          },
          error: (err) => {
            console.error('Lỗi khi sửa khách sạn:', err);
          },
        });
      }
    }
    this.closeDialog()
  }
  }

  editHotel(hotel: HotelModel): void {
    // Mở dialog ở chế độ sửa và điền dữ liệu của khách sạn vào form
    this.isEdit = true;
    this.editHotelId = hotel.id;
    this.openDialog();
    this.formData.patchValue({
      name: hotel.name,
      price: hotel.price,
      image: hotel.image,
      description: hotel.description,
    });
  }

  deleteHotel(id: string): void {
    this.hotelsService.deleteHotel(id).subscribe({
      next: () => {
        this.loadHotels();
      },
      error: (err) => {
        console.error('Lỗi khi xóa khách sạn:', err);
      },
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editHotelId = null;
    this.formData.reset();
  }
}
