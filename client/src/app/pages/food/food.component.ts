import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FoodItem } from 'app/@core/model/food.model';
import { FoodService } from 'app/@core/services/apis/food.service';

@Component({
  selector: 'ngx-food',
  styleUrls: ['./food.component.scss'],
  templateUrl: './food.component.html',
})
export class FoodComponent implements OnInit {
  isDialogOpen: boolean = false;
  formData: FormGroup;
  foods: FoodItem[] = [];
  isEdit = false;
  editFoodId: string | null = null;
  title: string;
  dataFoods: FoodItem[];

  constructor(private foodService: FoodService) { }

  ngOnInit(): void {
    this.loadFoods();
    this.formData = new FormGroup({
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  loadFoods(): void {
    this.foodService.getFoods().subscribe({
      next: (res) => {
        // const { data, status } = res;
        
        if (res) {
          this.foods = res
        }
      },
      error: (err) => {
        console.error('Error loading foods', err);
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

  addFood(): void {
    this.markFormGroupTouched(this.formData);
    if (this.formData.valid) {
      if (!this.isEdit) {
        // Thêm mới thực phẩm
        const newFood: FoodItem = {
          name: this.formData.value.name,
          price: this.formData.value.price,
          image: this.formData.value.image,
          description: this.formData.value.description,
        };
        this.foodService.addFood(newFood).subscribe({
          next: (res) => {
            console.log('Thực phẩm đã được thêm:', res);
            // Đóng dialog sau khi thêm thành công
            this.isDialogOpen = false;
            // Lấy lại danh sách thực phẩm sau khi thêm
            this.loadFoods();
          },
          error: (err) => {
            console.error('Lỗi khi thêm thực phẩm:', err);
          },
        });
      } else {
        // Sửa thực phẩm
        if (this.editFoodId) {
          const editedFood: FoodItem = {
            id: this.editFoodId,
            name: this.formData.value.name,
            price: this.formData.value.price,
            image: this.formData.value.image,
            description: this.formData.value.description,
          };

          this.foodService.editFood(editedFood).subscribe({
            next: (res) => {
              console.log('Thực phẩm đã được sửa:', res);
              this.isDialogOpen = false;
              this.loadFoods();
            },
            error: (err) => {
              console.error('Lỗi khi sửa thực phẩm:', err);
            },
          });
        }
      }
      this.closeDialog();
    }
  }

  editFood(food: FoodItem): void {
    // Mở dialog ở chế độ sửa và điền dữ liệu của thực phẩm vào form
    this.isEdit = true;
    this.editFoodId = food.id;
    this.openDialog();
    this.formData.patchValue({
      name: food.name,
      price: food.price,
      image: food.image,
      description: food.description,
    });
  }

  deleteFood(id: string): void {
    this.foodService.deleteFood(id).subscribe({
      next: () => {
        this.loadFoods();
      },
      error: (err) => {
        console.error('Lỗi khi xóa thực phẩm:', err);
      },
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
    this.isEdit = false;
    this.editFoodId = null;
    this.formData.reset();
  }
}
