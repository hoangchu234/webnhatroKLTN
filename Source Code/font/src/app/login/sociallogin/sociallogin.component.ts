import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { UserService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../model/User';
import { Account } from '../../model/Account';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import firebase from 'firebase';

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
  public checkmail;

  constructor(private authenticationService: AuthenticationService,private router: Router,private service: RegisterService,private userService:UserService,private serviceregister: RegisterService) {
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
    this.checkmail = await this.userService.getsearchemail(email) as Account[];
    if (this.checkmail) {
      this.createNewAccountSocial();
    }
    else {
      this.login();
    }
  }

  public createNewAccountSocial = async () => {
    try {
      let account = new Account();
      let user = new User();

      console.log(account.user);
      user.email = this.email;
      account.user = user;
      console.log(account);
      const resultaccount = await this.serviceregister.addAccount(account) as any;          
      this.router.navigateByUrl('home');
      alert('Đăng nhập thành công');
    }
    catch (e) {
      alert('Đăng nhập thất bại');
    }
  };

  public login = () => {
    this.authenticationService.loginSocial(this.email).subscribe(
      (data) => {
        console.log(data);
        console.log(data.isActive);
        if (data.isActive) {
          try{
            this.createNewAccountSocial();
            // localStorage.setItem('phone', data.phone);
            // localStorage.setItem('password', data.password);
            // console.log(this.authenticationService);
            alert('Đăng nhập thành công');
            this.router.navigateByUrl('home');
          }
          catch{
            alert('Đăng nhập thất bại');
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

  public async googleSignin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
      .then((confirmationResult) => {
         // This gives you a Google Access Token. You can use it to access the Google API.
        var token = confirmationResult.credential.signInMethod;
        // The signed-in user info.
        var user = confirmationResult.user;
        console.log(user.providerData);
        this.email = user.email;
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
