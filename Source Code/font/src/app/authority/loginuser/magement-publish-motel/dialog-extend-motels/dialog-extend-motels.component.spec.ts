import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExtendMotelsComponent } from './dialog-extend-motels.component';

describe('DialogExtendMotelsComponent', () => {
  let component: DialogExtendMotelsComponent;
  let fixture: ComponentFixture<DialogExtendMotelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogExtendMotelsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExtendMotelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
