import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagementTransactionHistoryComponent } from './magement-transaction-history.component';

describe('MagementTransactionHistoryComponent', () => {
  let component: MagementTransactionHistoryComponent;
  let fixture: ComponentFixture<MagementTransactionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagementTransactionHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagementTransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
