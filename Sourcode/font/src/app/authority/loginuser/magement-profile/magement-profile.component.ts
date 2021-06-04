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

 user: User;
 image = "../../../assets/images/blog_3.jpg";
//  account = this.authenticationService.currentAccountValue;

 constructor(private motelService: MotelService,public dialog: MatDialog,private router: Router,private authenticationService: AuthenticationService,private userService: UserService) {
   //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
   
  }

 
 async ngOnInit(): Promise<void> {
    this.init();
    await this.getUserById();
    this.getMotels();
    this.checkDataMotel = "";
 }

 init(){
   this.user = {
    id: null,
    hovaTen: "", 
    gender: "",
    doB: null,
    email: "",
    facebook: "",
    userImage: "",
    createdDate:null,
    lastLogOnDate:null,
    account:{
      id:"",
      username: "",
      password: "",
      phone: "",
      isActive: null,
      roleId: "",
      role:null,
      user:null,
      employee:null,
      isHD:"",
    },
    accountid:"",
    pubishFree:null
   }
 }

 public linkRouterChiTiet(name, id) {
  //this.router.navigate( [{name: name, id: id}]);
  this.router.navigate( ['/home/chi-tiet',name,id]);
}

 public handlePageChange(event) {
   this.page = event;
 }


 public async getMotels(){
    this.motels = await this.motelService.getmotelbyuser(this.authenticationService.currentAccountValue.user.id) as Motel[];
    if(this.motels.length){
      this.checkDataMotel = "Has data";
    }
    this.totalRecord = this.motels.length;
 }

 public async getUserById(){
    var id = Number(this.authenticationService.currentAccountValue.user.id);
    this.user = await this.userService.getUserFromId(id) as User;
    if(this.user.userImage != null){
      this.image = this.user.userImage;
    }
 }

  async getDataDialog(){
      var id = Number(this.authenticationService.currentAccountValue.user.id);
      this.dialogUser = await this.userService.getUserFromId(id) as any;
      if(this.dialogUser.facebook){
        this.checkFacebook = true;
      }
      if(this.dialogUser.email){
        this.checkGmail = true;
      }
      if(this.dialogUser.userImage == null){
        this.user.userImage = "../../../assets/images/blog_3.jpg";
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
 
 async information(){
   await this.getDataDialog();
   this.openDialog();
 };

 public openDialog(): void {
   const dialogRef = this.dialog.open(DialogEditUserComponent, {
     direction: "ltr",
     width: '400px',
     data: this.dialogUser
   });

   dialogRef.afterClosed().subscribe(async (result: User) => {
     if (result)
     {
       var id = Number(this.authenticationService.currentAccountValue.user.id);
       this.user = await this.userService.getUserFromId(id) as User;
       if(this.user.userImage != null){
        this.image = this.user.userImage;
       }
       else{
        this.image = "../../../assets/images/blog_3.jpg";
       }
     }
   });
 }

 async phoneInfo(){
  await this.getDataDialog();
  this.openDialogEditPhone();
};

 public openDialogEditPhone(): void {
    const dialogRef = this.dialog.open(DialogEditPhoneComponent, {
      direction: "ltr",
      width: '400px',
      data: this.dialogUser
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result)
      {
      //  console.log('The dialog was closed');
      //  console.log(result);

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
        
      });
      
       

      }
        
    });
  }

  async passwordInfo(){
    await this.getDataDialog();
    this.openDialogEditPassword();
  };
  public openDialogEditPassword(): void {
    const dialogRef = this.dialog.open(DialogEditPasswordComponent, {
      direction: "ltr",
      width: '400px',
      data: this.dialogUser
    });

    dialogRef.afterClosed().subscribe((result: User) => {
      if (result)
      {
       var account = new Account();
       account.id = result.account.id;
       account.isActive = result.account.isActive;
       account.roleId = result.account.roleId;
       account.username = result.account.username;
       account.phone = result.account.phone;
       //Lưa dat mới
       
       account.password = result.account.password;
       this.userService.updateAccount(account).subscribe(update => {
         if(update){
           alert("Lưu thành công")
         }
       });
      }
        
    });
  }

}
