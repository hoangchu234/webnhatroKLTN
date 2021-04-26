import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhToanDongComponent } from './thanh-toan-dong.component';

describe('ThanhToanDongComponent', () => {
  let component: ThanhToanDongComponent;
  let fixture: ComponentFixture<ThanhToanDongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanhToanDongComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhToanDongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
