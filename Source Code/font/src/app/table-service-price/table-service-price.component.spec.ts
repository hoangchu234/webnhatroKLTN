import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableServicePriceComponent } from './table-service-price.component';

describe('TableServicePriceComponent', () => {
  let component: TableServicePriceComponent;
  let fixture: ComponentFixture<TableServicePriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableServicePriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableServicePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
