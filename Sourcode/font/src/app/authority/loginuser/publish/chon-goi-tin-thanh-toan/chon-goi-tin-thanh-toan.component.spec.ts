import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonGoiTinThanhToanComponent } from './chon-goi-tin-thanh-toan.component';

describe('ChonGoiTinThanhToanComponent', () => {
  let component: ChonGoiTinThanhToanComponent;
  let fixture: ComponentFixture<ChonGoiTinThanhToanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChonGoiTinThanhToanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonGoiTinThanhToanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
