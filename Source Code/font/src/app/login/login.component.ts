import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Account } from '../model/Account';
import { User } from '../model/User';
import { RegisterService } from '../services/register.service';
import { UserService } from '../services/user.service';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public phone:string;
  public password:string;

  //Normal register
  public name:string;
  public confirmPassword:string;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  public phone_number:string;
  public user: any;
  public comfirm :firebase.auth.ConfirmationResult;

  resultaccount:Account[];
  remember: boolean = false;

  constructor(private employeeService:EmployeesService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private service: RegisterService,private userService:UserService) {
      const firebaseConfig = {
        apiKey: "AIzaSyAA7gAsuYi-IeYgqUEcl6bojuu4wtjjmh8",
        authDomain: "nhatrofirebase-f21b1.firebaseapp.com",
        databaseURL: "https://nhatrofirebase-f21b1.firebaseio.com",
        projectId: "nhatrofirebase-f21b1",
        storageBucket: "nhatrofirebase-f21b1.appspot.com",
        messagingSenderId: "1075985834413",
        appId: "1:1075985834413:web:ab82dcc8e62bec7fdf0124",
        measurementId: "G-N91ZYC8X9M"
      };
      if (!firebase.apps.length) {

        firebase.initializeApp(firebaseConfig);
      }
     }

  ngOnInit(): void {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
  }

  public login = () => {  
    try 
    {
      var account = new Account();
      account.phone = this.phone;
      account.password = this.password;
      this.authenticationService.loginPhone(account).subscribe(account => {

        if(!account.isActive){
          alert('Đăng nhập thất bại');
        }
        else{
          this.authenticationService.saveAccount(account, this.remember);
          if(Number(account.roleId) == 1){
            // window.location.replace(link);
            this.router.navigateByUrl('home');
          }
          else{
            this.router.navigateByUrl('admin');
          }
    
        }
      })
    } 
    catch(e) 
    {
      console.log(e)
      alert('Tài khoản không tồn tại!');
    }
    /*this.authenticationService.login(this.password, this.phone).subscribe(
      (data) => {
        console.log(data);
        console.log(data.isActive);
        if (data.isActive) {
          if (data != null && data.phone) {
            localStorage.setItem('phone', data.phone);
            localStorage.setItem('password', data.password);
            alert('Đăng nhập thành công');
            var role = Number(data.roleId);
            console.log(role);
            if(role == 1){
              this.router.navigateByUrl('home');
            }
            else{
              this.authenticationService.updateAccountisHD(data.id).subscribe(updateaccount => {
                console.log(updateaccount);
              })
              this.router.navigateByUrl('admin');
            }
          }
          else {
            alert('Đăng nhập thất bại');
          }
        }
        else {

          this.authenticationService.logout();
          alert('Bị lock tài khoản');
        }

      },
      (error) => alert("Sai mật khẩu")//console.error(error)
    )*/
  }

  public createNewAccount = async () => {
    if(this.confirmPassword == this.password){
      try {
        const verification = this.phone_number;
        if (verification != null) {
          this.comfirm.confirm(verification).then(async () =>{
            // this.name,this.phone,this.password.
            let account = new Account();
            let user = new User();
            account.password = this.password;
            account.phone = this.phone;
            user.hovaTen = this.name;
            account.user = user;
            this.service.addAccount(account).subscribe(newAccount => {
              this.resultaccount.push(newAccount);
            });
            this.router.navigateByUrl('home');
            alert('Success');
          }).catch(err =>{
            alert(err);
          })
        } else {
          alert('No verification code entered');
        }
      }
      catch (e) {
        alert('Add failed');
      }
    }
    else{

    }
  };

  onSubmit() {
    const appVerifier = this.recaptchaVerifier;
    var p = this.phone;
    var phoneNumber = "+84" + p.substring(0, p.length);    
    var testVerificationCode = "123456";
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        this.user = "Xac Thuc";
        this.comfirm = confirmationResult;
      })
      .catch((err) => {
        console.log('sms not sent', err);
      });
  };

}
