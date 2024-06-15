import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { API_BASE_URL, API_ENDPOINT } from 'app/@core/config/api-endpoint.config';
import { ApiService } from '../common';
import { CheckIntModel } from 'app/@core/model/checkin.model';

@Injectable({
  providedIn: 'root',
})
export class CheckInService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }

  getCheckIn(): Observable<any> {
    let url = API_ENDPOINT.checkin.base;

    return this.get(url);
  }


  addCheckIn(checkIn: CheckIntModel): Observable<any> {
    return this.post<any>(API_ENDPOINT.checkin.add, checkIn).pipe(
      catchError((error) => {
        // Xử lý lỗi ở đây nếu cần
        console.error('Error adding room:', error);
        throw error;
      })
    );
  }
  editCheckIn(checkIn: CheckIntModel): Observable<any> {
    const editUrl = `${API_ENDPOINT.checkin.edit}/${checkIn.id}`;
    return this.put<any>(editUrl, checkIn).pipe(
      catchError((error) => {
        // Xử lý lỗi ở đây nếu cần
        console.error('Error editing room:', error);
        throw error;
      })
    );
  }
  deleteCheckIn(checkInId: string): Observable<any> {
    const deleteUrl = `${API_ENDPOINT.checkin.delete}/${checkInId}`;
    return this.delete(deleteUrl).pipe(
      catchError((error) => {
        // Xử lý lỗi ở đây nếu cần
        console.error('Error deleting room:', error);
        throw error;
      })
    );
  }
  apiUrl = API_ENDPOINT.checkin.checkout
  getCheckedOutRooms(page: number, limit: number): Observable<any> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());
    return this.get<any>(`${API_ENDPOINT.checkin.checkout}?${params}`);
  }

  updateCheckOutDate(id: number, checkOutDate: Date): Observable<any> {
    return this.put<any>(`${API_ENDPOINT.checkin.base}/${id}/checkout`, { checkOutDate });
  }

  getStatistics(): Observable<any[]> {
    return this.get<any[]>(`${API_BASE_URL}/stats`);
  }
  getStatisticsByRoomType(): Observable<any[]> {
    return this.get<any[]>(`${API_BASE_URL}/stats/roomType`);
  }

  getStatisticsByRentalType(): Observable<any[]> {
    return this.get<any[]>(`${API_BASE_URL}/stats/rentalType`);
  }
}
