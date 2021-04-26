import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchMotelAreaComponent } from './dialog-search-motel-area.component';

describe('DialogSearchMotelAreaComponent', () => {
  let component: DialogSearchMotelAreaComponent;
  let fixture: ComponentFixture<DialogSearchMotelAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSearchMotelAreaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSearchMotelAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
