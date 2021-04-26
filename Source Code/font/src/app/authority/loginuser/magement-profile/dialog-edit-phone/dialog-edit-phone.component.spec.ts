import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPhoneComponent } from './dialog-edit-phone.component';

describe('DialogEditPhoneComponent', () => {
  let component: DialogEditPhoneComponent;
  let fixture: ComponentFixture<DialogEditPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
