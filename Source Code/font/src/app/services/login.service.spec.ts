import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthenticationService } from './authentication.service';
import { LoginComponent } from '../login/login.component'
import { HttpClientModule } from '@angular/common/http';

describe('Component: Login', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
      TestBed.configureTestingModule({
          imports: [FormsModule, HttpClientModule, RouterTestingModule],
          declarations: [LoginComponent],
          providers: [AuthenticationService],
      });
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;
      component.ngOnInit();
  });
  it('should call auth login method', async(() => {
    let loginElement: DebugElement;
    const debugElement = fixture.debugElement;
    let authService = debugElement.injector.get(AuthenticationService);
    //let loginSpy = spyOn(authService , 'login').and.callThrough();
    loginElement = fixture.debugElement.query(By.css('form'));

    // to set values
    //component.loginForm.controls['password'].setValue('user');
    //component.loginForm.controls['phone'].setValue('123');
    loginElement.triggerEventHandler('ngSubmit', null);
    //expect(loginSpy).toHaveBeenCalledTimes(1); // check that service is called once
   }));
});
