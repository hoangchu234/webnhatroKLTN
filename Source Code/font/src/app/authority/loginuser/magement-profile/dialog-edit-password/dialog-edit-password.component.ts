import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Account } from  '../../../../model/Account';
import { User } from  '../../../..//model/User';

@Component({
  selector: 'app-dialog-edit-password',
  templateUrl: './dialog-edit-password.component.html',
  styleUrls: ['./dialog-edit-password.component.css']
})
export class DialogEditPasswordComponent implements OnInit {

  passwordNew;
  constructor(
    public dialogRef: MatDialogRef<DialogEditPasswordComponent>,@Inject(MAT_DIALOG_DATA) public data: User) {
  }

  ngOnInit(): void {
  }

  public onChangePassword(): void {
    this.data.account.password = this.passwordNew;
  }

}
