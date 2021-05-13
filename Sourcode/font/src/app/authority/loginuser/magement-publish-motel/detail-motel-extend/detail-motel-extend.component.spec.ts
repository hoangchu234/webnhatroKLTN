import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMotelExtendComponent } from './detail-motel-extend.component';

describe('DetailMotelExtendComponent', () => {
  let component: DetailMotelExtendComponent;
  let fixture: ComponentFixture<DetailMotelExtendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMotelExtendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMotelExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
