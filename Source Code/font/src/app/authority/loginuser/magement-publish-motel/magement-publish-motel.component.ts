import { Component, OnInit } from '@angular/core';
import { TypeofnewService } from '../../../services/newstype.service'
import { NewType } from '../../../model/NewType';
import { Motel } from '../../../model/Motel';
import { MotelService } from '../../../services/motel.service'
import { AuthenticationService } from '../../../services/authentication.service';
import { Account } from  '../../../model/Account';
import { Subject} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PaypalComponent } from '../publish/paypal/paypal.component';
import { DialogEditMotelComponent } from './dialog-edit-motel/dialog-edit-motel.component';
import { DialogDetailMotelPublishComponent } from '../../loginadmin/dialog-detail-motel-publish/dialog-detail-motel-publish.component';
import { DialogExtendMotelsComponent } from './dialog-extend-motels/dialog-extend-motels.component';

export interface Type{
  id:number;
  text:string;
}

@Component({
  selector: 'app-magement-publish-motel',
  templateUrl: './magement-publish-motel.component.html',
  styleUrls: ['./magement-publish-motel.component.css']
})
export class MagementPublishMotelComponent implements OnInit {

  nametophead = "Quản lý đăng tin"
  // Danh sách loại motel
  newTypes: NewType [];
  newType = "";
  // Danh sách trạng thái motel
  statuss:Array<Type> = [
    {id: 0, text:'Tất cả'},
    {id: 1, text:'Tin đang hiển thị'}, 
    {id: 2, text:'Tin hết hạn'}, 
    {id: 3, text:'Tin đang ẩn'},
  ];
  status: string= "";
  // Danh sách motel user đã đăng
  motels: Motel[];
  searchmotels: Motel[];

  //pagination
  totalRecord: Number;
  page:Number = 1;

  // Lấy data account từ localstogare
  //currentAccount: Account;

  checkStatus : Array<boolean> = [];
  checkStatusExtend : Array<boolean> = [];
  constructor(public dialog: MatDialog,private authenticationService: AuthenticationService,private motelService: MotelService,private typeservice:TypeofnewService) { 
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
    this.getMotels();
    this.getNewTypes();
  }

  ngOnInit(): void {
    this.newType = "Tất cả";
    this.status = "Tất cả"
    
  }

  public handlePageChange(event) {
    this.page = event;
  }

  public onClickSearchNewType(event: any){
    let value = event.target.value;
    var type = this.newTypes.find(a => a.id == value);
    this.newType = type.name;
    console.log(this.status + " "+ this.newType);
    if((this.status == "Tất cả" && this.newType != "Tất cả") || this.status == "Tất cả" && this.newType != "Tất cả"){
      this.motels = this.searchmotels.filter(motel => motel.detail.typeofnew.name == this.newType);
    }
    else if(this.newType == "Tất cả" && this.status == "Tất cả"){
      this.motels = this.searchmotels;
    }
    else if(this.status != "Tất cả" && this.newType == "Tất cả"){
      this.motels = this.searchmotels.filter(motel => motel.status == this.status);
    }
    else{
      this.motels = this.searchmotels.filter(motel => motel.status == this.status && motel.detail.typeofnew.name == this.newType);
    }
  }

  public async getNewTypes(){
    /*this.typeservice.getTypes().subscribe(gettypes => {
      this.newTypes = gettypes;
    })*/
    this.newTypes = await this.typeservice.getTypes() as NewType [];


  }

  public async getMotels(){
    this.motels = await this.motelService.getmotelbyuser(this.authenticationService.currentAccountValue.user.id) as any;
      for(let i=0;i<this.motels.length;i++){
        if(this.motels[i].status == "Tin đã hết hạn"){
          this.checkStatus.push(false);

        }
        else{
          this.checkStatus.push(true);
        }
      }
      this.searchmotels = this.motels
      this.totalRecord = this.motels.length;
    /*this.motelService.getmotelbyuser(this.authenticationService.currentAccountValue.user.id).subscribe(getmotel => {
      this.motels = getmotel
      for(let i=0;i<getmotel.length;i++){
        if(getmotel[i].status == "Tin đã hết hạn"){
          this.checkStatus.push(false);

        }
        else{
          this.checkStatus.push(true);
        }
      }
      this.searchmotels = getmotel
      this.totalRecord = this.motels.length;
    })*/
  }

  public onChangeStatus(event: any)
  {
    let value = event.target.value;
    var name = this.statuss[value].text.toString();
    this.status = name;
    console.log(this.status + " "+ this.newType);
    if((this.newType == "Tất cả" && this.status != "Tất cả") || (this.status != "Tất cả" && this.newType == "Tất cả")){
      this.motels = this.searchmotels.filter(motel => motel.status == this.status);
    }
    else if(this.status == "Tất cả" && this.newType == "Tất cả"){
      this.motels = this.searchmotels;
    }
    else if(this.status == "Tất cả" && this.newType != "Tất cả"){
      this.motels = this.searchmotels.filter(motel => motel.detail.typeofnew.name == this.newType);
    }
    else{
      this.motels = this.searchmotels.filter(motel => motel.status == this.status && motel.detail.typeofnew.name == this.newType);
    }
  }



  public openDialogUser(motel:Motel): void {
    const dialogRef = this.dialog.open(DialogEditMotelComponent, {
      width: '1000px',
      height:'1000px',
      data: motel
     });
 
     dialogRef.afterClosed().subscribe((result: Motel) => {
      
         
     });  
   }

  public openDialogExtend(motel:Motel): void {
    const dialogRef = this.dialog.open(DialogExtendMotelsComponent, {
     width: '1000px',
     height:'1000px',
     data: motel
    });

    dialogRef.afterClosed().subscribe((result: Motel) => {
  
        
    });
  }
}
