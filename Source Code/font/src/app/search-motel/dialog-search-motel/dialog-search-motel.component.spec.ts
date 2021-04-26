import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSearchMotelComponent } from './dialog-search-motel.component';

describe('DialogSearchMotelComponent', () => {
  let component: DialogSearchMotelComponent;
  let fixture: ComponentFixture<DialogSearchMotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogSearchMotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSearchMotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
