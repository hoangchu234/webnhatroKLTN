import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagementProfileComponent } from './magement-profile.component';

describe('MagementProfileComponent', () => {
  let component: MagementProfileComponent;
  let fixture: ComponentFixture<MagementProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagementProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagementProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
