import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagementSendMessegerComponent } from './magement-send-messeger.component';

describe('MagementSendMessegerComponent', () => {
  let component: MagementSendMessegerComponent;
  let fixture: ComponentFixture<MagementSendMessegerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagementSendMessegerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MagementSendMessegerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
