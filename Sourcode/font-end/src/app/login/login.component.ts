import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import firebase from 'firebase';
import { Account } from '../model/Account';
import { User } from '../model/User';
import { RegisterService } from '../services/register.service';
import { UserService } from '../services/user.service';
import { EmployeesService } from '../services/employees.service';
import { ToastService } from '../services/toast.service';
import { StorageService } from '../storage.service';

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
  constructor(private toast: ToastService,
    private employeeService:EmployeesService,
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

  forgetPasswordLink(){
    this.router.navigateByUrl('forgetPassword');
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
        
        if(result != "false"){
          var account = result as Account;
          if(account.isActive == false){
            // alert('Đăng nhập thất bại');
            this.toast.toastError("Đăng nhập thất bại");
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
              this.toast.toastError("Đăng nhập thất bại");

            }
          }
        }
        else{
          this.toast.toastError("Đăng nhập thất bại");

        }
      } 
      catch(e) 
      {
        // console.log(e);
        this.toast.toastInfo('Tài khoản không tồn tại!');
        // alert('Tài khoản không tồn tại!');
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
            if(result.id != undefined){
              this.router.navigateByUrl('home');
            }
            // alert('Success');
          }).catch(err =>{
            this.toast.toastInfo('Mã xác thực sai vui lòng nhập lại hay điền số điện thoại mới');
            // alert('Mã xác thực sai vui lòng nhập lại hay điền số điện thoại mới');
          })
        } else {
          this.toast.toastError("Không nhận được mã code");
          // alert('No verification code entered');
        }
      }
      catch (e) {
        this.toast.toastError("Không thục thi thành công");
        // alert('Add failed');
      }
    }
    else{

    }
  };

  async onSubmit() {    
    if(this.name == "" || this.password == "" || this.phone == "" || this.confirmPassword == ""){
      this.showError = false;
    }
    else{
      var check = this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*?[#?!@$%^&*-])/);
      if(check != null){
        if(this.validationPhone(this.phone) == -2){
          this.toast.toastError("Số điện thoại của bạn không đúng định dạng!");
          // alert('Số điện thoại của bạn không đúng định dạng!');
        }
        else if(this.validationPhone(this.phone) == -2){
          this.toast.toastError("Số điện thoại của bạn hợp lệ!");
          // alert('Số điện thoại của bạn hợp lệ!');
        }
        else if(this.validationPhone(this.phone) == -2){
          this.toast.toastError("Bạn chưa điền số điện thoại!");
          // alert('Bạn chưa điền số điện thoại!');
        }
        else{
          var checkPhone = await this.service.checkPhone(this.phone);
          if(checkPhone == "Số điện thoại chưa được dùng"){
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
                // console.log('sms not sent', err);
                this.toast.toastError("Đã xảy ra lỗi");
              });
          }
          else if(checkPhone == "Số điện thoại đã được dùng"){
            this.toast.toastInfo('Số điện thoại đã được dùng');
          }
         
        }
      }
      else{
        this.toast.toastInfo('Mật khẩu phải có các ký tự đặc biệt, có các số hay in hoa chữ cái đầu');
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
