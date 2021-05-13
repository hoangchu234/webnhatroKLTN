import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from 'src/app/model/Account';
import { Reply } from 'src/app/model/Reply';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MotelService } from 'src/app/services/motel.service';
import { ReplyService } from 'src/app/services/reply.service';

@Component({
  selector: 'app-magement-send-messeger',
  templateUrl: './magement-send-messeger.component.html',
  styleUrls: ['./magement-send-messeger.component.css']
})
export class MagementSendMessegerComponent implements OnInit {

  nametophead = "Quản lý tin nhắn"
  //pagination
  totalRecord: Number;
  page:Number = 1;

  reply:Reply[];
  countReply = 0;

  public username:string;
  //currentAccount: Account;

  constructor(private replyService:ReplyService,
    private router: Router,
    private motelService: MotelService,
    private authenticationService: AuthenticationService) { 
      //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
      this.getReply();
    }

  ngOnInit(): void {
  }

  public handlePageChange(event) {
    this.page = event;
  }

  public async getReply(){
    /*this.replyService.getReplyFromUserId(this.authenticationService.currentAccountValue.user.id).subscribe(data => {
      this.reply = data;
      console.log(this.reply)
      this.countReply = this.reply.length;
    })*/
    this.reply = await this.replyService.getReplyFromUserId(this.authenticationService.currentAccountValue.user.id) as Reply[];
    this.countReply = this.reply.length;
  }
}

