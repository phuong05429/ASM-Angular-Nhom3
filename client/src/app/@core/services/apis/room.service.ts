import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';

import { API_ENDPOINT } from 'app/@core/config/api-endpoint.config';
import { ApiService } from '../common';
import { RoomModel } from 'app/@core/model/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService extends ApiService {
  constructor(private _http: HttpClient) {
    super(_http);
  }

  getRooms(status?: string): Observable<any> {
    let url = API_ENDPOINT.rooms.base;
    if (status) {
      url += `?status=${status}`;
    }
    return this.get(url);
  }
  getTypeRooms(roomType?: string): Observable<any> {
    let url = API_ENDPOINT.rooms.base;
    if (roomType) {
      url += `?roomType=${roomType}`;
    }
    return this.get(url);
  }

  addRoom(room: RoomModel): Observable<any> {
    return this.post<any>(API_ENDPOINT.rooms.add, room).pipe(
      catchError((error) => {
        // Xử lý lỗi ở đây nếu cần
        console.error('Error adding room:', error);
        throw error;
      })
    );
  }
  editRoom(room: RoomModel): Observable<any> {
    const editUrl = `${API_ENDPOINT.rooms.edit}/${room.id}`;
    return this.put<any>(editUrl, room).pipe(
      catchError((error) => {
        // Xử lý lỗi ở đây nếu cần
        console.error('Error editing room:', error);
        throw error;
      })
    );
  }
  deleteRoom(roomId: string): Observable<any> {
    const deleteUrl = `${API_ENDPOINT.rooms.delete}/${roomId}`;
    return this.delete(deleteUrl).pipe(
      catchError((error) => {
        // Xử lý lỗi ở đây nếu cần
        console.error('Error deleting room:', error);
        throw error;
      })
    );
  }
}
