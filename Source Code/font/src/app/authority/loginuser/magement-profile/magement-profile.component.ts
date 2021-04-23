import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from  '../../../model/Account';
import { User } from  '../../../model/User';
import { AuthenticationService } from '../../../services/authentication.service';
import { UserService } from '../../../services/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogEditUserComponent } from './dialog-edit-user/dialog-edit-user.component';
import { DialogEditPhoneComponent } from './dialog-edit-phone/dialog-edit-phone.component';
import { DialogEditPasswordComponent } from './dialog-edit-password/dialog-edit-password.component';
import { MotelService } from 'src/app/services/motel.service';
import { Motel } from 'src/app/model/Motel';
import { BehaviorSubjectClass } from 'src/app/services/behaviorsubject';

@Component({
  selector: 'app-magement-profile',
  templateUrl: './magement-profile.component.html',
  styleUrls: ['./magement-profile.component.css']
})
export class MagementProfileComponent implements OnInit {

 // Lấy data account từ localstogare
 //currentAccount: Account;
  
 dialogUser: User;

 //motel
 motels: Motel[];

 //pagination
 totalRecord: Number;
 page:Number = 1;

 // Kiểm tra data đã có chưa
 checkDataMotel;
 
 nametophead = "Thông tin cá nhân"
 checkFacebook = false;
 checkGmail = false;

 checkImage = false;
 account = this.authenticationService.currentAccountValue;

 constructor(private motelService: MotelService,public dialog: MatDialog,private router: Router,private behaviorSubjectClass:BehaviorSubjectClass,private authenticationService: AuthenticationService,private userService: UserService) {
   //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
   this.getUserById();
   this.getMotels();
  }

 
 ngOnInit(): void {
   this.checkDataMotel = "";

  
 }

 public handlePageChange(event) {
   this.page = event;
 }


 public async getMotels(){
   /*this.motelService.getmotelbyuser(this.authenticationService.currentAccountValue.user.id).subscribe(getmotel => {
     this.motels = getmotel
     if(this.motels.length){
       this.checkDataMotel = "Has data";
     }
     this.totalRecord = this.motels.length;
   })*/
    this.motels = await this.motelService.getmotelbyuser(this.authenticationService.currentAccountValue.user.id) as Motel[];
    if(this.motels.length){
      this.checkDataMotel = "Has data";
    }
    this.totalRecord = this.motels.length;
 }

 public async getUserById(){
   var id = Number(this.authenticationService.currentAccountValue.user.id);
   /*this.userService.getUserFromId(id).subscribe(getuser => {
     this.dialogUser = getuser
     if(this.dialogUser.facebook){
      this.checkFacebook = true;
     }
     if(this.dialogUser.email){
       this.checkGmail = true;
     }
     if(this.dialogUser.userImage != null)
     {
       this.checkImage = true;
     }
   });*/
    this.dialogUser = await this.userService.getUserFromId(id) as any;
      if(this.dialogUser.facebook){
        this.checkFacebook = true;
      }
      if(this.dialogUser.email){
        this.checkGmail = true;
      }
      if(this.dialogUser.userImage != null)
      {
        this.checkImage = true;
      }
 }

 get isUser() {
   try{
     var role = Number(this.authenticationService.currentAccountValue.roleId);
     if(role == 1){
         return true;
     }
     return false;
   }
   catch(error)
   {

   }

 }
 
 public openDialog(): void {
  console.log(this.dialogUser)
   const dialogRef = this.dialog.open(DialogEditUserComponent, {
     direction: "ltr",
     width: '400px',
     data: this.dialogUser
   });

   dialogRef.afterClosed().subscribe((result: User) => {
     if (result)
     {
       console.log('The dialog was closed');
       console.log(result);
       window.location.reload();
     }
   });
 }

 public openDialogEditPhone(): void {
   console.log(this.dialogUser)
    const dialogRef = this.dialog.open(DialogEditPhoneComponent, {
      direction: "ltr",
      width: '400px',
      data: this.dialogUser
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result)
      {
       console.log('The dialog was closed');
       console.log(result);

       var account = new Account();
       account.id = result.account.id;
       account.isActive = result.account.isActive;
       account.roleId = result.account.roleId;
       account.username = result.account.username;
       //Lưa dat mới
       account.password = result.account.password;
       account.phone = result.account.phone;

       this.userService.updateAccount(account).subscribe(update => {
        alert("Lưu thành công")
        window.location.reload();
        console.log(update)
      });
      
       

      }
        
    });
  }

 public openDialogEditPassword(): void {
   console.log(this.dialogUser)
    const dialogRef = this.dialog.open(DialogEditPasswordComponent, {
      direction: "ltr",
      width: '400px',
      data: this.dialogUser
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result)
      {
       console.log('The dialog was closed');
       console.log(result);
       var account = new Account();
       account.id = result.account.id;
       account.isActive = result.account.isActive;
       account.roleId = result.account.roleId;
       account.username = result.account.username;
       account.phone = result.account.phone;
       //Lưa dat mới
       
       account.password = result.account.password;
       console.log(account)
       this.userService.updateAccount(account).subscribe(update => {
         if(update){
           alert("Lưu thành công")
           window.location.reload();
         }
       });
      }
        
    });
  }

}
