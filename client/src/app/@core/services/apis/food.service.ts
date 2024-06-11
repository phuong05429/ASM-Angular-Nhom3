import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { API_ENDPOINT } from 'app/@core/config/api-endpoint.config';
import { ApiService } from '../common';
import { FoodItem } from 'app/@core/model/food.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }

  getFoods(): Observable<any> {
    let url = API_ENDPOINT.food.base;
    return this.get(url);
  }

  addFood(food: FoodItem): Observable<any> {
    return this.post<any>(API_ENDPOINT.food.add, food).pipe(
      catchError((error) => {
        console.error('Error adding food:', error);
        throw error;
      })
    );
  }

  editFood(food: FoodItem): Observable<any> {
    const editUrl = `${API_ENDPOINT.food.edit}/${food.id}`;
    return this.put<any>(editUrl, food).pipe(
      catchError((error) => {
        console.error('Error editing food:', error);
        throw error;
      })
    );
  }

  deleteFood(foodId: string): Observable<any> {
    const deleteUrl = `${API_ENDPOINT.food.delete}/${foodId}`;
    return this.delete(deleteUrl).pipe(
      catchError((error) => {
        console.error('Error deleting food:', error);
        throw error;
      })
    );
  }
}
