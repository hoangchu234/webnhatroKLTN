import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagementServiceComponent } from './magement-service.component';

describe('MagementServiceComponent', () => {
  let component: MagementServiceComponent;
  let fixture: ComponentFixture<MagementServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagementServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagementServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
