import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCityHomeComponent } from './area-city-home.component';

describe('AreaCityHomeComponent', () => {
  let component: AreaCityHomeComponent;
  let fixture: ComponentFixture<AreaCityHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaCityHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaCityHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
