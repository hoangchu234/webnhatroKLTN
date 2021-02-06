import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPasswordComponent } from './dialog-edit-password.component';

describe('DialogEditPasswordComponent', () => {
  let component: DialogEditPasswordComponent;
  let fixture: ComponentFixture<DialogEditPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
