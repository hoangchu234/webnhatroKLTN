import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongTinHinhAnhComponent } from './thong-tin-hinh-anh.component';

describe('ThongTinHinhAnhComponent', () => {
  let component: ThongTinHinhAnhComponent;
  let fixture: ComponentFixture<ThongTinHinhAnhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThongTinHinhAnhComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongTinHinhAnhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
