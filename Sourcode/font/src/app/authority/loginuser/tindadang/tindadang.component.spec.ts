import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TindadangComponent } from './tindadang.component';

describe('TindadangComponent', () => {
  let component: TindadangComponent;
  let fixture: ComponentFixture<TindadangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TindadangComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TindadangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
