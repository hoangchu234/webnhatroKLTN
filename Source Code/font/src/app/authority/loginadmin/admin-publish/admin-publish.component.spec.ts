import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPublishComponent } from './admin-publish.component';

describe('AdminPublishComponent', () => {
  let component: AdminPublishComponent;
  let fixture: ComponentFixture<AdminPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
