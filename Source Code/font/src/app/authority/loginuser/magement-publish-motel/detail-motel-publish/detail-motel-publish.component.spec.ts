import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMotelPublishComponent } from './detail-motel-publish.component';

describe('DetailMotelPublishComponent', () => {
  let component: DetailMotelPublishComponent;
  let fixture: ComponentFixture<DetailMotelPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMotelPublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMotelPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
