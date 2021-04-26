import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinCoBanNextComponent } from './thong-tin-co-ban-next.component';

describe('ThongTinCoBanNextComponent', () => {
  let component: ThongTinCoBanNextComponent;
  let fixture: ComponentFixture<ThongTinCoBanNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThongTinCoBanNextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinCoBanNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
