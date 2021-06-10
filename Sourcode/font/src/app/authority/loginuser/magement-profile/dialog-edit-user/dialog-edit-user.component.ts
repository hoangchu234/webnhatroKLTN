import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Account } from  '../../../../model/Account';
import { User } from  '../../../..//model/User';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.css']
})
export class DialogEditUserComponent implements OnInit {

 // Load hình và đổi hình
 public image: File;

 imageUser: string = "";
 constructor(
  private toast: ToastService,
   private userService:UserService,
   private storage: AngularFireStorage,
   public dialogRef: MatDialogRef<DialogEditUserComponent>,@Inject(MAT_DIALOG_DATA) public data: User) {
   }

 ngOnInit(): void {
   this.imageUser = this.data.userImage;
 }

 public handleFileInput(event) {

   var files: FileList;
   files = event.target.files;
   const reader = new FileReader();
   reader.readAsDataURL(event.target.files.item(0));
   reader.onload = (event: any) => {
     this.imageUser = event.target.result
   }   
   this.image = files.item(0);
   
 }


 public saveImage = async () => {
   if(this.image){
    var nameUserImage = "userimages"
    var filePath = `${nameUserImage}/${this.image.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.image).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          var user = new User();
          user.id = this.data.id;
           // Lưu mới
          user.hovaTen = this.data.hovaTen;
          user.createdDate = this.data.createdDate;
          user.lastLogOnDate = this.data.lastLogOnDate;
          user.gender = this.data.gender;
          user.email = this.data.email;
          user.facebook = this.data.facebook;
          user.userImage = url;
          user.accountid = this.data.account.id;
  
          this.userService.updateUser(user).subscribe(update => {
            // alert("Lưu thành công")
            this.toast.toastSuccess('Lưu thành công');
          });
        })
      })
    ) .subscribe();
   }
   else{
    var user = new User();
    user.id = this.data.id;
     // Lưu mới
    user.hovaTen = this.data.hovaTen;
    user.createdDate = this.data.createdDate;
    user.lastLogOnDate = this.data.lastLogOnDate;
    user.gender = this.data.gender;
    user.email = this.data.email;
    user.facebook = this.data.facebook;
    user.userImage = this.data.userImage;
    user.accountid = this.data.account.id;

    this.userService.updateUser(user).subscribe(update => {
      // alert("Lưu thành công")
      this.toast.toastSuccess('Lưu thành công');
    });
   }
   
 }

}
