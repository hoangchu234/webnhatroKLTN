import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangementChartComponent } from './mangement-chart.component';

describe('MangementChartComponent', () => {
  let component: MangementChartComponent;
  let fixture: ComponentFixture<MangementChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MangementChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MangementChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
