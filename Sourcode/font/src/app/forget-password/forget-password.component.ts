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
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  public phone:string = "";
  public password:string = "";
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  showError: boolean = true;
  public phone_number:string;
  public user: any;
  public comfirm :firebase.auth.ConfirmationResult;

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

    public createNewAccount = async () => {
      try {
        const verification = this.phone_number;
        if (verification != null) {
          this.comfirm.confirm(verification).then(async () =>{
            // this.name,this.phone,this.password.
            var accountPhone = await this.authenticationService.getAccountByPhone(this.phone) as Account;
            var account = new Account();
            account.id = accountPhone.id;
            account.isActive = accountPhone.isActive;
            account.roleId = accountPhone.roleId;
            account.username =accountPhone.username;
            account.phone = accountPhone.phone;
            //Lưa dat mới
            
            account.password = this.password;
            this.authenticationService.updateForgetPassword(account).subscribe(update => {
              if(update){
                //  alert("Lưu thành công")
                this.router.navigateByUrl('home');
              }
            });
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
    };
  
    clickChange(){
      this.showError = true;
    }

  
    async onSubmit() {    

      if( this.password == "" || this.phone == ""){
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
              this.toast.toastInfo('Số điện thoại chưa đăng ký');
            }
            else if(checkPhone == "Số điện thoại đã được dùng"){
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
