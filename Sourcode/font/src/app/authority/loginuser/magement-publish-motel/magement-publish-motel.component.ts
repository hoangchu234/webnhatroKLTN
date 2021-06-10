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
import { ActivatedRoute, Router } from '@angular/router';
import { Status } from 'src/app/model/Status';

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
  newType: NewType = {id: "", name: "", details: null};
  // Danh sách trạng thái motel
  statuss:Array<Status> = []
  // statuss:Array<Type> = [
  //   {id: 0, text:'Tất cả'},
  //   {id: 1, text:'Tin đang hiển thị'}, 
  //   {id: 2, text:'Tin hết hạn'}, 
  //   {id: 3, text:'Tin đang ẩn'},
  // ];
  status: Status = {id: "", name:""};
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
  constructor(private router: Router,private authenticationService: AuthenticationService,private motelService: MotelService,private typeservice:TypeofnewService) { 
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
    
    
  }

  async ngOnInit(): Promise<void> {
    await this.getData();
    await this.getNewTypes();
    await this.getMotels();
  }

  async getData(){
    var data = await this.motelService.getStatus() as Status[];
    var fisrtData = new Status();
    fisrtData.id = "0";
    fisrtData.name = "Tất cả"
    this.statuss.push(fisrtData);
    for(let i=0;i<data.length;i++){
      this.statuss.push(data[i]);
    }
    this.status = this.statuss[0];
  }

  public linkRouterChiTiet(name, id) {
    //this.router.navigate( [{name: name, id: id}]);
    this.router.navigate( ['/user/chi-tiet',name,id]);
  }

  public linkRouterGiaHan(name, id) {
    //this.router.navigate( [{name: name, id: id}]);
    this.router.navigate( ['/user/gia-han-tin',name,id]);
  }
  

  public handlePageChange(event) {
    this.page = event;
  }

  public onClickSearchNewType(event: any){
    let value = event.target.value;
    var type = this.newTypes.find(a => a.id == value);
    this.newType = type;
    if((this.status.name == "Tất cả" && this.newType.name != "Tất cả") || this.status.name == "Tất cả" && this.newType.name != "Tất cả"){
      this.motels = this.searchmotels.filter(motel => motel.detail.typeofnew.name == this.newType.name);
    }
    else if(this.newType.name == "Tất cả" && this.status.name == "Tất cả"){
      this.motels = this.searchmotels;
    }
    else if(this.status.name != "Tất cả" && this.newType.name == "Tất cả"){
      this.motels = this.searchmotels.filter(motel => motel.status == this.status.id);
    }
    else{
      this.motels = this.searchmotels.filter(motel => motel.status == this.status.id && motel.detail.typeofnew.name == this.newType.name);
    }
  }

  async getNewTypes(){
    this.newTypes = await this.typeservice.getTypes() as NewType [];
    this.newType = this.newTypes[0];
  }

  public async getMotels(){
    this.motels = await this.motelService.getmotelbyuser(this.authenticationService.currentAccountValue.user.id) as any;
      for(let i=0;i<this.motels.length;i++){
        if(this.motels[i].status == "3"){
          this.checkStatus.push(false);

        }
        else{
          this.checkStatus.push(true);
        }
      }
      this.searchmotels = this.motels
      this.totalRecord = this.motels.length;
  }

  public onChangeStatus(event: any)
  {
    let value = event.target.value;
    var index = this.statuss.findIndex(a => a.id === value);
    var name = this.statuss[index];
    this.status = name;
    if((this.newType.name == "Tất cả" && this.status.name != "Tất cả") || (this.status.name != "Tất cả" && this.newType.name == "Tất cả")){
      this.motels = this.searchmotels.filter(motel => motel.status == name.id);
    }
    else if(this.status.name == "Tất cả" && this.newType.name == "Tất cả"){
      this.motels = this.searchmotels;
    }
    else if(this.status.name == "Tất cả" && this.newType.name != "Tất cả"){
      this.motels = this.searchmotels.filter(motel => motel.detail.typeofnew.name == this.newType.name);
    }
    else{
      this.motels = this.searchmotels.filter(motel => motel.status == name.id && motel.detail.typeofnew.name == this.newType.name);
    }
  }
}
