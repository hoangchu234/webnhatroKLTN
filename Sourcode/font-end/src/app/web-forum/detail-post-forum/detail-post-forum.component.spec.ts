import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPostForumComponent } from './detail-post-forum.component';

describe('DetailPostForumComponent', () => {
  let component: DetailPostForumComponent;
  let fixture: ComponentFixture<DetailPostForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailPostForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailPostForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
