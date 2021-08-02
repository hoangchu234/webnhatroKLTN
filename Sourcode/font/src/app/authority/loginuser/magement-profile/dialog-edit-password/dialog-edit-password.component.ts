import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Account } from  '../../../../model/Account';
import { User } from  '../../../..//model/User';
import { ToastService } from 'src/app/services/toast.service';
import { RegisterService } from 'src/app/services/register.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dialog-edit-password',
  templateUrl: './dialog-edit-password.component.html',
  styleUrls: ['./dialog-edit-password.component.css']
})
export class DialogEditPasswordComponent implements OnInit {

  passwordNew = "";
  password = "";
  constructor(private userService: UserService,private toast: ToastService, private registerService: RegisterService,
    public dialogRef: MatDialogRef<DialogEditPasswordComponent>,@Inject(MAT_DIALOG_DATA) public data: User) {
  }

  ngOnInit(): void {
  }

  public async onChangePassword(): Promise<void> {
    if(this.password == "" || this.passwordNew == ""){
      this.toast.toastInfo('Vui lòng nhập mật khẩu của bạn');
    }
    else{
      var check = this.passwordNew.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*?[#?!@$%^&*-])/);
   
      var account: Account = {
        id:this.data.accountId,
        username:"", 
        password:"", 
        phone:"", 
        isActive: true,
        roleId: "1",
        role: null, 
        user:null, 
        employee:null, 
        isHD:true
      }
      account.password = this.password;

      var data = await this.registerService.checkPassword(this.data.accountId,account);
      if(data == "Không tồn tại password này"){
        this.toast.toastError('Mật khẩu hoặc mật khẩu xác nhận không đúng');
      }
      else{
        if(check != null){
          // this.data.account.password = this.passwordNew;
          var account = new Account();
          account.id = this.data.account.id;
          account.isActive = this.data.account.isActive;
          account.roleId = this.data.account.roleId;
          account.username = this.data.account.username;
          account.phone = this.data.account.phone;
          //Lưa dat mới
          
          account.password = this.passwordNew;
          // console.log(account)
          this.userService.updateAccount(account).subscribe(update => {
            if(update){
              // console.log(update)
              this.toast.toastSuccess('Lưu thành công');
            }
          });
          this.dialogRef.close();
        }
        else{
          this.toast.toastInfo('Mật khẩu phải có các ký tự đặc biệt, có các số hay in hoa chữ cái đầu');
        }
      }
    } 
  }

  
}
