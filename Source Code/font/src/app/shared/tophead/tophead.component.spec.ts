import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopheadComponent } from './tophead.component';

describe('TopheadComponent', () => {
  let component: TopheadComponent;
  let fixture: ComponentFixture<TopheadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopheadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
