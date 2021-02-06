import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMotelComponent } from './detail-motel.component';

describe('DetailMotelComponent', () => {
  let component: DetailMotelComponent;
  let fixture: ComponentFixture<DetailMotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
