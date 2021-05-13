import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendPaypalComponent } from './extend-paypal.component';

describe('ExtendPaypalComponent', () => {
  let component: ExtendPaypalComponent;
  let fixture: ComponentFixture<ExtendPaypalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtendPaypalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendPaypalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
