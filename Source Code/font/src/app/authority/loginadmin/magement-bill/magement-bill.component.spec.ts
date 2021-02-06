import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagementBillComponent } from './magement-bill.component';

describe('MagementBillComponent', () => {
  let component: MagementBillComponent;
  let fixture: ComponentFixture<MagementBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagementBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagementBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
