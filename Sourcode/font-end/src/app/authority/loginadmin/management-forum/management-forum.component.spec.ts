import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementForumComponent } from './management-forum.component';

describe('ManagementForumComponent', () => {
  let component: ManagementForumComponent;
  let fixture: ComponentFixture<ManagementForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagementForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
