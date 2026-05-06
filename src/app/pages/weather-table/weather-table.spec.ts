import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTable } from './weather-table';

describe('WeatherTable', () => {
  let component: WeatherTable;
  let fixture: ComponentFixture<WeatherTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherTable],
    }).compileComponents();

    fixture = TestBed.createComponent(WeatherTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
