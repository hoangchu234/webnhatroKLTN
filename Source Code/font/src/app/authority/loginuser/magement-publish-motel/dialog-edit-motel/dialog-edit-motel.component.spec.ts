import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditMotelComponent } from './dialog-edit-motel.component';

describe('DialogEditMotelComponent', () => {
  let component: DialogEditMotelComponent;
  let fixture: ComponentFixture<DialogEditMotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditMotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditMotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
