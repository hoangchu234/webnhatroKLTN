import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagementEmployeeComponent } from './magement-employee.component';

describe('MagementEmployeeComponent', () => {
  let component: MagementEmployeeComponent;
  let fixture: ComponentFixture<MagementEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagementEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagementEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
