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
  selector: 'app-input-phone',
  templateUrl: './input-phone.component.html',
  styleUrls: ['./input-phone.component.css']
})
export class InputPhoneComponent implements OnInit {
  public phone:string = ""

  //Normal register
  public confirmPassword:string;
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  public user: any;

  public phone_number:string;
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

  public UpdatePhoneNumber = async () => {
    try {
      const verification = this.phone_number;
      if (verification != null) {
        this.comfirm.confirm(verification).then(async () =>{
          // this.name,this.phone,this.password.
          let account = new Account();
          account.phone = this.phone;
          account.id = this.authenticationService.currentAccountValue.user.accountId;
          this.authenticationService.updatePhoneNumber(account).subscribe(data => {
            if(data.id != undefined){
              this.router.navigateByUrl('home');
            }
          });
          
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
  };

  async onSubmit() {    
    if(this.phone == ""){
      this.showError = false;
    }
    else{
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
