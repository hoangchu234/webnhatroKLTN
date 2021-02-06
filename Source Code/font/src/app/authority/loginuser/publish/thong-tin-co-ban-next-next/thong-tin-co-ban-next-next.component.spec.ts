import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinCoBanNextNextComponent } from './thong-tin-co-ban-next-next.component';

describe('ThongTinCoBanNextNextComponent', () => {
  let component: ThongTinCoBanNextNextComponent;
  let fixture: ComponentFixture<ThongTinCoBanNextNextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThongTinCoBanNextNextComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinCoBanNextNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
