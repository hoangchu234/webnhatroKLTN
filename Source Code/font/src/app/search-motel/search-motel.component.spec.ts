import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchMotelComponent } from './search-motel.component';

describe('SearchMotelComponent', () => {
  let component: SearchMotelComponent;
  let fixture: ComponentFixture<SearchMotelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchMotelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchMotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
