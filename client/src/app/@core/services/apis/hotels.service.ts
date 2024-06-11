import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { API_ENDPOINT } from 'app/@core/config/api-endpoint.config';
import { ApiService } from '../common';
import { HotelModel } from 'app/@core/model/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelsService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }

  getHotels(): Observable<any> {
    return this.get(API_ENDPOINT.hotels.base);
  }
  addHotel(hotel: HotelModel): Observable<any> {
    return this.post<any>(API_ENDPOINT.hotels.add, hotel).pipe(
      catchError((error) => {
        // Xử lý lỗi ở đây nếu cần
        console.error('Error adding hotel:', error);
        throw error;
      })
    );
  }
  editHotel(hotel: HotelModel): Observable<any> {
    const editUrl = `${API_ENDPOINT.hotels.edit}/${hotel.id}`;
    return this.put<any>(editUrl, hotel).pipe(
      catchError((error) => {
        // Xử lý lỗi ở đây nếu cần
        console.error('Error editing hotel:', error);
        throw error;
      })
    );
  }
  deleteHotel(hotelId: string): Observable<any> {
    const deleteUrl = `${API_ENDPOINT.hotels.delete}/${hotelId}`;
    return this.delete(deleteUrl).pipe(
      catchError((error) => {
        // Xử lý lỗi ở đây nếu cần
        console.error('Error deleting hotel:', error);
        throw error;
      })
    );
  }
}
