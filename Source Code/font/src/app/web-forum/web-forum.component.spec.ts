import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebForumComponent } from './web-forum.component';

describe('WebForumComponent', () => {
  let component: WebForumComponent;
  let fixture: ComponentFixture<WebForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WebForumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WebForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
