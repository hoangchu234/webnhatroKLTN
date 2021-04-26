import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ReplyService } from '../../services/reply.service';
import { Reply } from '../../model/Reply';
import { Motel } from '../../model/Motel';

@Component({
  selector: 'app-dialog-detail-motel-send',
  templateUrl: './dialog-detail-motel-send.component.html',
  styleUrls: ['./dialog-detail-motel-send.component.css']
})
export class DialogDetailMotelSendComponent implements OnInit {

  name:string;
  phone:string;
  email:string;
  decription:string;

  constructor(
    public replyService:ReplyService,
    public dialogRef: MatDialogRef<DialogDetailMotelSendComponent>,@Inject(MAT_DIALOG_DATA) public data: Motel) {}

  ngOnInit(): void {

    
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public save(){
    var reply = new Reply();
    reply.name = this.name;
    reply.phone = this.phone;
    reply.decription = this.decription;
    reply.email = this.email;
    reply.userId = this.data.userId;
    this.replyService.addReply(reply).subscribe(data => {
      if(data){
        alert("Gửi thành công")
        this.onNoClick();
      }
    });
  }

}
