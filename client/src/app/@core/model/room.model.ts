export interface RoomModel {
  id?: number;
  name: string;
  roomType: string;
  price: number;
  overnight: number;
  floor: number;
  description: string;
  status?: 'available' | 'occupied' | 'cleaning';
}