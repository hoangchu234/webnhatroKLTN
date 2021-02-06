import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailMotelSendComponent } from './dialog-detail-motel-send.component';

describe('DialogDetailMotelSendComponent', () => {
  let component: DialogDetailMotelSendComponent;
  let fixture: ComponentFixture<DialogDetailMotelSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDetailMotelSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetailMotelSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
