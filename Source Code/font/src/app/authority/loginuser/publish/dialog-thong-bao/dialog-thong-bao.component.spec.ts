import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogThongBaoComponent } from './dialog-thong-bao.component';

describe('DialogThongBaoComponent', () => {
  let component: DialogThongBaoComponent;
  let fixture: ComponentFixture<DialogThongBaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogThongBaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogThongBaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
