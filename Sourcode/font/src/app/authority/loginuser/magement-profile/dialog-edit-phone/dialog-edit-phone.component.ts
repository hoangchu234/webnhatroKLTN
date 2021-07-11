import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Account } from  '../../../../model/Account';
import { User } from  '../../../..//model/User';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/services/register.service';
import firebase from 'firebase';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dialog-edit-phone',
  templateUrl: './dialog-edit-phone.component.html',
  styleUrls: ['./dialog-edit-phone.component.css']
})
export class DialogEditPhoneComponent implements OnInit {

  // Truyền data
  phone;
  phone_number:string; //xác thực mã code

  // Xác thực robot
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;

  // Lưu xác thực xác định khi xend code
  comfirm :firebase.auth.ConfirmationResult;
  checkRecapt = true;
  constructor(private toast: ToastService,private userService: UserService,public dialogRef: MatDialogRef<DialogEditPhoneComponent>,@Inject(MAT_DIALOG_DATA) public data: User,private authenticationService: AuthenticationService,
      private router: Router,
      private service: RegisterService) {
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

  public async onSubmit() {
    if(this.validationPhone(this.phone) == -2){
      this.toast.toastInfo('Số điện thoại của bạn không đúng định dạng!');
      // alert('Số điện thoại của bạn không đúng định dạng!');
    }
    else if(this.validationPhone(this.phone) == -2){
      // alert('Số điện thoại của bạn hợp lệ!');
      this.toast.toastInfo('Số điện thoại của bạn hợp lệ!');

    }
    else if(this.validationPhone(this.phone) == -2){
      // alert('Bạn chưa điền số điện thoại!');
      this.toast.toastInfo('Bạn chưa điền số điện thoại!');

    }
    else{
      var checkPhone = await this.service.checkPhone(this.phone);
      if(checkPhone == "Số điện thoại chưa được dùng"){
        var p = this.phone;
        var phoneNumber = "+84" + p.substring(0, p.length);
        const appVerifier = this.recaptchaVerifier;
        var testVerificationCode = "123456";
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            this.comfirm = confirmationResult;
            this.checkRecapt = false;

           
          })
          .catch((err) => {
            this.toast.toastError('Tin nhắn chưa được gửi');
          });
      }
      else if(checkPhone == "Số điện thoại đã được dùng"){
        this.toast.toastInfo('Số điện thoại đã được dùng');
      }
          
     
    }

  }


  getData(){
    this.data.account.phone = this.phone;
  }

  public Xacthuc = async () => {
    try {
      const verification = this.phone_number;
      // console.log(this.phone_number);
      
      if (verification != null) {
        // console.log(verification);
        this.comfirm.confirm(verification).then(async () =>{
          await this.getData();

          var account = new Account();
          account.id = this.data.account.id;
          account.isActive = this.data.account.isActive;
          account.roleId = this.data.account.roleId;
          account.username = this.data.account.username;
          //Lưa dat mới
          account.password = this.data.account.password;
          account.phone = this.phone;

          this.userService.updateAccountPhone(account).subscribe(update => {
            this.toast.toastSuccess('Lưu thành công');
              // alert("Lưu thành công")
            this.dialogRef.close();
          });
        }).catch(err =>{
          // alert(err);
          this.toast.toastError("Mã xác thực sai vui lòng nhập lại hay điền số điện thoại mới");
          // alert('Mã xác thực sai vui lòng nhập lại hay điền số điện thoại mới');
        })
      } else {
        this.toast.toastError("Mã code không đúng");

        // alert('No verification code entered');
      }
    }
    catch (e) {
      this.toast.toastError("Lỗi");

      // alert('Add failed');
    }
  };

  public async onChangePhone(): Promise<void> {
    await this.Xacthuc();
  }
}
