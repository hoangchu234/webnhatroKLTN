import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailMotelPublishComponent } from './dialog-detail-motel-publish.component';

describe('DialogDetailMotelPublishComponent', () => {
  let component: DialogDetailMotelPublishComponent;
  let fixture: ComponentFixture<DialogDetailMotelPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDetailMotelPublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDetailMotelPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
