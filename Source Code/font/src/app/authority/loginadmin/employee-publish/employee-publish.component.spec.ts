import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePublishComponent } from './employee-publish.component';

describe('EmployeePublishComponent', () => {
  let component: EmployeePublishComponent;
  let fixture: ComponentFixture<EmployeePublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeePublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
