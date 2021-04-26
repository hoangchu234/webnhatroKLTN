import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarsearchandbarComponent } from './barsearchandbar.component';

describe('BarsearchandbarComponent', () => {
  let component: BarsearchandbarComponent;
  let fixture: ComponentFixture<BarsearchandbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarsearchandbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarsearchandbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
