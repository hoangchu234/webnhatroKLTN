import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataMotelComponent } from './data-motel.component';

describe('DataMotelComponent', () => {
  let component: DataMotelComponent;
  let fixture: ComponentFixture<DataMotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataMotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataMotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
