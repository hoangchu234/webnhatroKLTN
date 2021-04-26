import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagementPublishMotelComponent } from './magement-publish-motel.component';

describe('MagementPublishMotelComponent', () => {
  let component: MagementPublishMotelComponent;
  let fixture: ComponentFixture<MagementPublishMotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagementPublishMotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagementPublishMotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
