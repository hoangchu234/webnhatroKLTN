import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Post } from '../../model/Post';

@Component({
  selector: 'app-dialog-post',
  templateUrl: './dialog-post.component.html',
  styleUrls: ['./dialog-post.component.css']
})
export class DialogPostComponent implements OnInit {

  check = true;
  image = "";
  constructor(public dialogRef: MatDialogRef<DialogPostComponent>, @Inject(MAT_DIALOG_DATA) public data: string,private authenticationService: AuthenticationService) {
    if(this.authenticationService.currentAccountValue){
      this.image = this.authenticationService.currentAccountValue.user.userImage;
    }
    else{
      this.image = "../../assets/forum/images1/resources/friend-avatar2.jpg";
    }
  }

  ngOnInit(): void {
    if(this.data == ""){
      this.check = false;
    }
  }
}
