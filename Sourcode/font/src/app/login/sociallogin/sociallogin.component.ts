import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/User';
import { Account } from '../../model/Account';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import firebase from 'firebase';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-sociallogin',
  templateUrl: './sociallogin.component.html',
  styleUrls: ['./sociallogin.component.css']
})
export class SocialloginComponent implements OnInit {
  /*//Social register
  public email:string;
  public check;

  constructor( private authenticationService: AuthenticationService,private serviceregister: RegisterService,private service:UserService,private httpClient: HttpClient) { }

  ngOnInit(): void {
   
  }

  public search(email) {
    this.check = this.service.getsearchcertificate(email).subscribe(
      (data) => {
        if (data == true) {
          console.log("Chay cai")
          this.createNewAccountSocial();
        }
        else {
          //this.login();
        }
      }
    )
  }

  signInWithGoogle(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.search()
  }

  signInWithFB(): void {
    
  }

  public createNewAccountSocial = async () => {
    try {
      let account = new Account();
      let user = new User();

      console.log(account.user);
      
      account.user = user;
      console.log(account);
      const resultaccount = await this.serviceregister.addAccount(account) as any;          

      alert('Add sucessfully');
    }
    catch (e) {
      alert('Add failed');
    }
  };

  /*
  public login = () => {
    this.authenticationService.loginsocial().subscribe(
      (data) => {
        console.log(data);
        console.log(data.isActive);
        if (data.isActive) {
          if (data != null && data.username) {
            localStorage.setItem('username', data.username);
            localStorage.setItem('password', data.password);
            console.log(this.authenticationService);
            console.log('Login Success');
          }
          else {
            console.log('Login fail');
          }
        }
        else {
          
          this.authenticationService.logout();
            alert('Lock data');
        }
        
      },
      (error) => console.error(error)
    )
  }
*/
  
 
  public email:string;
  userName = "";
  public checkmail;
  remember: boolean = false;

  constructor(private toast: ToastService,private authenticationService: AuthenticationService,private router: Router,private service: RegisterService,private userService:UserService,private serviceregister: RegisterService) {
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
    
  }

  public async search(email) {
    this.checkmail = await this.userService.getsearchemail(email);
    console.log(this.checkmail)
    if (this.checkmail.length == 0) {
      this.createNewAccountSocial();
    }
    else {
      this.login();
    }
  }

  public createNewAccountSocial = async () => {
    try {
      let user = new User();
      user.email = this.email;
      user.hovaTen = this.userName;
      let account = new Account();
      account.user = user;
      account.username = this.userName;
      const resultaccount = await this.serviceregister.addAccount(account) as any;   
      if(resultaccount != false){
        var accountLogin = resultaccount as Account;
        if(accountLogin.isActive == false){
          this.toast.toastError('Đăng nhập thất bại');
          // alert('Đăng nhập thất bại');
        }
        else{
          if(accountLogin){
            this.authenticationService.saveAccount(accountLogin, this.remember);
            if(Number(accountLogin.roleId) == 1){
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
            this.toast.toastError('Đăng nhập thất bại');

            // alert('Đăng nhập thất bại');

          }
        }
      }
      else{
        // alert('Đăng nhập thất bại');
        this.toast.toastError('Đăng nhập thất bại');

      }
    }
    catch (e) {
      // alert('Đăng nhập thất bại');
      this.toast.toastError('Đăng nhập thất bại');

    }
  };

  public login = async () => {
    try 
    {
      var user = new User();
      user.email = this.email;
      const result = await this.authenticationService.loginSocial(user);
      if(result != false){
        var account = result as Account;
        if(account.isActive == false){
          // alert('Đăng nhập thất bại');
          this.toast.toastError('Đăng nhập thất bại');

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
            // alert('Đăng nhập thất bại');
            this.toast.toastError('Đăng nhập thất bại');

          }
        }
      }
      else{
        // alert('Đăng nhập thất bại');
        this.toast.toastError('Đăng nhập thất bại');

      }
    } 
    catch(e) 
    {
      console.log(e)
      this.toast.toastError('Tài khoản không tồn tại!');

      // alert('Tài khoản không tồn tại!');
    }
  }

  public async googleSignin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((confirmationResult) => {
         // This gives you a Google Access Token. You can use it to access the Google API.
        var token = confirmationResult.credential.signInMethod;
        // The signed-in user info.
        var user = confirmationResult.user;
        this.email = user.email;
        this.userName = user.displayName;
        //this.createNewAccountSocial();
        this.search(this.email)
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log('Can not login', error);
      });
  }

  public async facebookSignin(){
    const provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((confirmationResult) => {
         // This gives you a Google Access Token. You can use it to access the Google API.
        var token = confirmationResult.credential.signInMethod;
        // The signed-in user info.
        var user = confirmationResult.user;
        console.log(user.providerData);
        //this.createNewAccountSocial();
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        console.log('Can not login', error);
      });
  }

  
 /*/ 
 firebase.auth().signOut().then(function() {
  // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });*/

}
