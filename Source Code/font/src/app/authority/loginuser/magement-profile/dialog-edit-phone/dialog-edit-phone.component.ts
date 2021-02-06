import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Account } from  '../../../../model/Account';
import { User } from  '../../../..//model/User';
import { Router } from '@angular/router';
import { BehaviorSubjectClass } from 'src/app/services/behaviorsubject';
import { RegisterService } from 'src/app/services/register.service';
import firebase from 'firebase';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private userService: UserService,public dialogRef: MatDialogRef<DialogEditPhoneComponent>,@Inject(MAT_DIALOG_DATA) public data: User,private authenticationService: AuthenticationService,
      private router: Router,
      private behaviorSubjectClass:BehaviorSubjectClass,
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

  public onSubmit() {
    const appVerifier = this.recaptchaVerifier;
    var p = this.phone;
    var phoneNumber = "+84" + p.substring(0, p.length);    
    console.log(phoneNumber);
    var testVerificationCode = "123456";
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        this.comfirm = confirmationResult;
      })
      .catch((err) => {
        console.log('sms not sent', err);
      });
  };


  public Xacthuc = async () => {
    try {
      const verification = this.phone_number;
      console.log(this.phone_number);
      if (verification != null) {
        console.log(verification);
        this.comfirm.confirm(verification).then(async () =>{
        
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
  };

  public onChangePhone(): void {
    this.data.account.phone = this.phone;
  }
}
