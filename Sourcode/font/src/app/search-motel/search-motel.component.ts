import { Component, Input, OnInit, Output } from '@angular/core';
import { MotelService } from '../services/motel.service';
import { Motel } from '../model/Motel';
import { User } from '../model/User';
import { Router, ActivatedRoute } from '@angular/router'
import { NewType } from '../model/NewType';
import { TypeofnewService } from '../services/newstype.service'
import { MatDialog } from '@angular/material/dialog';
import { CountNewTypeViewModel } from '../model/CountNewTypeViewModel';
import { AuthenticationService } from '../services/authentication.service';
import { Account } from  '../model/Account';
import { UserService } from '../services/user.service'
import { data } from 'jquery';
import { City } from '../model/City';

declare var jQuery: any;

@Component({
  selector: 'app-search-motel',
  templateUrl: './search-motel.component.html',
  styleUrls: ['./search-motel.component.css']
})
export class SearchMotelComponent implements OnInit {

  counttypes: CountNewTypeViewModel[] = []; // mảng các loại nhà trọ

  //Phân trang tổng số trang
  totalRecord: Number;
  page:Number = 1;

  //load tên trên thanh tophead
  nametophead;

  //user
  //currentAccount: Account;
  users:User[];

  @Output() seach:string = "Mặc định";

  xetvalue = false;

  datasearch;
  constructor(
    private userService:UserService,
    private authenticationService: AuthenticationService,
    public dialog: MatDialog,
    private typeservice:TypeofnewService,
    private route: Router,
    private router: ActivatedRoute,
    private motelService:MotelService) {
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
   
    this.getCountTypes();
    
   }


   async ngOnInit(): Promise<void> {

  }

  public onNewType(message:string){
    this.datasearch = message;
  }

  /*
  public getMotelDecreasePrice(){
    this.motels = this.motels.sort((a,b) => Number(b.price) - Number(a.price))
    this.seach = "Gía giảm dần"
  }

  public getMotelIncreasePrice(){
    this.motels = this.motels.sort((a,b) => Number(a.price) - Number(b.price))
    this.seach = "Gía tăng dần"
  }

  public getMotelIncreaseArea(){
    this.motels = this.motels.sort((a,b) => Number(a.areaZone) - Number(b.areaZone))
    this.seach = "Diện tích tăng dần"
  }

  public getMotelDecreaseArea(){
    this.motels = this.motels.sort((a,b) => Number(b.areaZone) - Number(a.areaZone))
    this.seach = "Diện tích giảm dần"
  }*/

 public async getCountTypes(){
    /*this.typeservice.getCountTypes().subscribe(gettypes => {
      for(let i = 1;i< gettypes.length; i++){
        this.counttypes.push(gettypes[i])
      }
    })*/
    const result = await this.typeservice.getCountTypes() as any;
    for(let i = 1;i< result.length; i++){
      this.counttypes.push(result[i])
    }
  }

/*
  public isUser() {
    try{
      var role = Number(this.currentAccount.roleId);
    }
    catch(error){    
      if(role == 1){
        this.xetvalue = true;
        console.log(this.xetvalue)
      }
      this.xetvalue = false;
      console.log(this.xetvalue)
    }
    
  }

  */
  
}
