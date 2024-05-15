import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapHotelComponent } from './map-hotel.component';

describe('MapHotelComponent', () => {
  let component: MapHotelComponent;
  let fixture: ComponentFixture<MapHotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapHotelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
