import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchMotelDirectComponent } from './dialog-search-motel-direct.component';

describe('DialogSearchMotelDirectComponent', () => {
  let component: DialogSearchMotelDirectComponent;
  let fixture: ComponentFixture<DialogSearchMotelDirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSearchMotelDirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSearchMotelDirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
