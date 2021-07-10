import { Component, OnInit } from '@angular/core';
import { TypeofnewService } from '../../../services/newstype.service'
import { NewType } from '../../../model/NewType';
import { Motel } from '../../../model/Motel';
import { MotelService } from '../../../services/motel.service'
import { AuthenticationService } from '../../../services/authentication.service';
import { Account } from  '../../../model/Account';
import {Observable, Subject} from 'rxjs';
import {startWith, map, debounce ,distinctUntilChanged,switchMap} from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { New } from 'src/app/model/New';

export interface Type{
  id:number;
  text:string;
}

@Component({
  selector: 'app-admin-publish',
  templateUrl: './admin-publish.component.html',
  styleUrls: ['./admin-publish.component.css']
})
export class AdminPublishComponent implements OnInit {

  nametophead = "Quản lý đăng tin"
  newTypes: NewType[];
  newType: NewType = {id:"", name:"", details:null};
  news:Array<New> = [];
  new: New = {id:null, newName:""}

  statuss:Array<Type> = [
    {id: 0, text:'Tất cả'}, 
    {id: 1, text:'Tin đã duyệt'}, 
    {id: 2, text:'Tin chưa duyệt'},
  ];
  status: string= "";

  motels: Motel[] = [];
  searchmotels: Motel[] = [];

  //pagination
  totalRecord: Number;
  page:Number = 1;

  //currentAccount: Account;

  constructor(private router: ActivatedRoute,private route: Router,public dialog: MatDialog,private authenticationService: AuthenticationService,private motelService: MotelService,private typeservice:TypeofnewService) { 
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
    this.getMotels("0","2","1");
  }

  async ngOnInit(): Promise<void> {
    this.status = "Tất cả"
    this.getTypes();
    await this.getDataNew();
  }

  public handlePageChange(event) {
    this.page = event;
  }

  async getDataNew(){
    this.news = await this.motelService.getNew() as New[];
    this.newTypes.shift();
    this.newType = this.newTypes[0];
  }


  async onChangeNew(event: any){
    let value = event.target.value;
    this.new = this.news.find(a => a.id == value);

    if(this.status == "Tất cả"){
      await this.getMotels("0", this.newType.id, this.new.id.toString());
    }
    if(this.status == "Tin đã duyệt"){
      await this.getMotels("1", this.newType.id, this.new.id.toString());
    }
    if(this.status == "Tin chưa duyệt"){
      await this.getMotels("2", this.newType.id, this.new.id.toString());
    }
  }
  
  public async onChangeNewType(event: any){
    let value = event.target.value;
    var city = this.newTypes.find(a => a.id == value);
    this.newType = city;
    if(this.status == "Tất cả"){
      await this.getMotels("0", this.newType.id, this.new.id.toString());
    }
    if(this.status == "Tin đã duyệt"){
      await this.getMotels("1", this.newType.id, this.new.id.toString());
    }
    if(this.status == "Tin chưa duyệt"){
      await this.getMotels("2", this.newType.id, this.new.id.toString());
    }
  }

  public async getTypes(){
    /*this.typeservice.getTypes().subscribe(gettypes => {
      this.newTypes = gettypes;
    })*/
    this.newTypes = await this.typeservice.getTypes() as NewType [];
  }

  // public loadDataHot(motel){
  //   for(let i = 0; i< motel.length; i++){
  //     if(motel[i].typeservice == "1")
  //     {
  //       this.searchmotels.push(motel[i])
  //     }
  //   }
  // }

  // public loadData3(motel){
  //   for(let i = 0; i< motel.length; i++){
  //     if(motel[i].typeservice == "2")
  //     {
  //       this.searchmotels.push(motel[i])
  //     }
  //   }
  // }

  // public loadData2(motel){
  //   for(let i = 0; i< motel.length; i++){
  //     if(motel[i].typeservice == "3")
  //     {
  //       this.searchmotels.push(motel[i])
  //     }
  //   }
  // }

  // public loadData1(motel){
  //   for(let i = 0; i< motel.length; i++){
  //     if(motel[i].typeservice == "4")
  //     {
  //       this.searchmotels.push(motel[i])
  //     }
  //   }
  // }

  // public loadDataThuong(motel){
  //   for(let i = 0; i< motel.length; i++){
  //     if(motel[i].typeservice == "5")
  //     {
  //       this.searchmotels.push(motel[i])
  //     }
  //   }
  // }

  public async getMotels(status: string, type: string, newT:string){
    /*this.motelService.getmoteladmin().subscribe(getmotel => {
      
    })*/
    const result = await this.motelService.getmoteladmin(status, type,newT) as Motel[];
    if(this.motels.length != 0){
      this.motels.splice(0 , this.motels.length);
    }
    // this.loadDataHot(result);
    // this.loadData1(result);
    // this.loadData2(result);
    // this.loadData3(result);    
    // this.loadDataThuong(result);

    this.motels = result
    this.totalRecord = this.motels.length;
  }

  public async onChangeStatus(event: any)
  {
    let value = event.target.value;
    var name = this.statuss[value].text.toString();
    this.status = name;
    if(this.status == "Tất cả"){
      await this.getMotels("0", this.newType.id, this.new.id.toString());
    }
    if(this.status == "Tin đã duyệt"){
      await this.getMotels("1", this.newType.id, this.new.id.toString());
    }
    if(this.status == "Tin chưa duyệt"){
      await this.getMotels("2", this.newType.id, this.new.id.toString());
    }
  }


  public linkRouterChiTiet(name, id) {
    //this.router.navigate( [{name: name, id: id}]);
    this.route.navigate( ['/admin/chi-tiet',name,id]);
  }
}
