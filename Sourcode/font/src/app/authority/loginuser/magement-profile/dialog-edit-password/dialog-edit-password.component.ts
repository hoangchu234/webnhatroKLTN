import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Account } from  '../../../../model/Account';
import { User } from  '../../../..//model/User';
import { ToastService } from 'src/app/services/toast.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-dialog-edit-password',
  templateUrl: './dialog-edit-password.component.html',
  styleUrls: ['./dialog-edit-password.component.css']
})
export class DialogEditPasswordComponent implements OnInit {

  passwordNew = "";
  password = "";
  constructor(private toast: ToastService, private registerService: RegisterService,
    public dialogRef: MatDialogRef<DialogEditPasswordComponent>,@Inject(MAT_DIALOG_DATA) public data: User) {
  }

  ngOnInit(): void {
  }

  public async onChangePassword(): Promise<void> {
    var check = this.passwordNew.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*?[#?!@$%^&*-])/);
   
    var account: Account = {
      id:"",
      username:"", 
      password:"", 
      phone:"", 
      isActive: null,
      roleId: null,
      role: null, 
      user:null, 
      employee:null, 
      isHD:""
    }
    account.password = this.password;
    var data = await this.registerService.checkPassword(this.data.accountid,account)
    if(data == "Không tồn tại password này"){
      this.toast.toastError('Mật khẩu hoặc mật khẩu xác nhận không đúng');
    }
    else{
      if(check != null){
        this.data.account.password = this.passwordNew;
      }
      else{
        this.toast.toastInfo('Mật khẩu phải có các ký tự đặc biệt, có các số hay in hoa chữ cái đầu');
      }
    }
    
    
  }

  
}
