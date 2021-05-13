import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailMotelPublishMagementComponent } from './detail-motel-publish-magement.component';

describe('DetailMotelPublishMagementComponent', () => {
  let component: DetailMotelPublishMagementComponent;
  let fixture: ComponentFixture<DetailMotelPublishMagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailMotelPublishMagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailMotelPublishMagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
