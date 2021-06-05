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
  public phone:string = "";
  public password:string = "";

  //Normal register
  public name:string;
  public confirmPassword:string;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  public phone_number:string;
  public user: any;
  public comfirm :firebase.auth.ConfirmationResult;

  resultaccount:Account[];
  remember: boolean = false;

  showError: boolean = true;
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
    try{
      this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    }
    catch(err){

    }
  }

  clickChange(){
    this.showError = true;
  }

  public login = async () => {  
    if(this.phone == "" || this.password == ""){
      this.showError = false;
    }
    else{
      try 
      {
        var accounta = new Account();
        accounta.phone = this.phone;
        accounta.password = this.password;
        const result = await this.authenticationService.loginPhone(accounta);
        if(result != false){
          var account = result as Account;
          if(account.isActive == false){
            alert('Đăng nhập thất bại');
          }
          else{
            if(account){
              this.authenticationService.saveAccount(account, this.remember);
              if(Number(account.roleId) == 1){
                var link = '/home'
                window.location.replace(link);
                //this.router.navigateByUrl('home');
              }
              else{
                var link = '/admin'
                window.location.replace(link);
                //this.router.navigateByUrl('admin');
              }
            }
            else{
              alert('Đăng nhập thất bại');

            }
          }
        }
        else{
          alert('Đăng nhập thất bại');

        }
      } 
      catch(e) 
      {
        console.log(e)
        alert('Tài khoản không tồn tại!');
      }
    }
   
   
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
            const result = await this.service.addAccount(account) as Account;
            this.resultaccount.push(result);
            this.router.navigateByUrl('home');
            alert('Success');
          }).catch(err =>{
            alert('Mã xác thực sai vui lòng nhập lại hay điền số điện thoại mới');
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
    if(this.name == "" || this.password == "" || this.phone == "" || this.confirmPassword == ""){
      this.showError = false;
    }
    else{
      const appVerifier = this.recaptchaVerifier;
      var p = this.phone;
      var phoneNumber = "+84" + p.substring(0, p.length);    
      if(this.validationPhone(phoneNumber) == -2){
        alert('Số điện thoại của bạn không đúng định dạng!');
      }
      else if(this.validationPhone(phoneNumber) == -2){
        alert('Số điện thoại của bạn hợp lệ!');
      }
      else if(this.validationPhone(phoneNumber) == -2){
        alert('Bạn chưa điền số điện thoại!');
      }
      else{
        var testVerificationCode = "123456";
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            this.user = "Xac Thuc";
            this.comfirm = confirmationResult;
          })
          .catch((err) => {
            console.log('sms not sent', err);
          });
      }
     
    }
   
  };

  validationPhone(mobile){
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if(mobile !==''){
        if (vnf_regex.test(mobile) == false) 
        {
          // alert('Số điện thoại của bạn không đúng định dạng!');
          return -2;
        }
        else{
          return -1;
          // alert('Số điện thoại của bạn hợp lệ!');
        }
    }
    else{
      // alert('Bạn chưa điền số điện thoại!');
      return 0;
    }
  }
}
