import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatIndex } from './heat-index';

describe('HeatIndex', () => {
  let component: HeatIndex;
  let fixture: ComponentFixture<HeatIndex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeatIndex],
    }).compileComponents();

    fixture = TestBed.createComponent(HeatIndex);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
