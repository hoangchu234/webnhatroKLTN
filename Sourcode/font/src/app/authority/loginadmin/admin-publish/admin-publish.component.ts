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
  newTypes: NewType [];
  newType = "";

  statuss:Array<Type> = [
    {id: 0, text:'Tất cả'}, 
    {id: 1, text:'Tin đã duyệt'}, 
    {id: 2, text:'Tin chưa duyệt'},
  ];
  status: string= "";

  motels: Motel[];
  searchmotels: Motel[] = [];

  //pagination
  totalRecord: Number;
  page:Number = 1;

  //currentAccount: Account;

  constructor(private router: ActivatedRoute,private route: Router,public dialog: MatDialog,private authenticationService: AuthenticationService,private motelService: MotelService,private typeservice:TypeofnewService) { 
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
    this.getMotels();
  }

  ngOnInit(): void {
    this.newType = "Tất cả";
    this.status = "Tất cả"
    this.getTypes();
  }

  public handlePageChange(event) {
    this.page = event;
  }

  public onChangeNewType(event: any){
    let value = event.target.value;
    var city = this.newTypes.find(a => a.id == value);
    this.newType = city.name;
    if((this.status == "Tất cả" && this.newType != "Tất cả") || this.status == "Tất cả" && this.newType != "Tất cả"){
      this.motels = this.searchmotels.filter(motel => motel.detail.typeofnew.name == this.newType);
    }
    else if(this.status == "Tất cả" && this.newType == "Tất cả"){
      this.motels = this.searchmotels;
    }
    else if(this.status != "Tất cả" && this.newType == "Tất cả"){
      this.motels = this.searchmotels.filter(motel => motel.detail.typeofnew.name == this.newType);
    }
    else{
      if(this.status == "Tin đã duyệt"){
        this.motels = this.searchmotels.filter(motel => motel.detail.typeofnew.name == this.newType && motel.verify == true);
      }
      if(this.status == "Tin chưa duyệt"){
        this.motels = this.searchmotels.filter(motel => motel.detail.typeofnew.name == this.newType && motel.verify == false);
      }
    }
  }

  public async getTypes(){
    /*this.typeservice.getTypes().subscribe(gettypes => {
      this.newTypes = gettypes;
    })*/
    this.newTypes = await this.typeservice.getTypes() as NewType [];
  }

  public loadDataHot(motel){
    for(let i = 0; i< motel.length; i++){
      if(motel[i].typeservice == "Tin Hot")
      {
        this.searchmotels.push(motel[i])
      }
    }
  }

  public loadData3(motel){
    for(let i = 0; i< motel.length; i++){
      if(motel[i].typeservice == "Tin VIP 3")
      {
        this.searchmotels.push(motel[i])
      }
    }
  }

  public loadData2(motel){
    for(let i = 0; i< motel.length; i++){
      if(motel[i].typeservice == "Tin VIP 2")
      {
        this.searchmotels.push(motel[i])
      }
    }
  }

  public loadData1(motel){
    for(let i = 0; i< motel.length; i++){
      if(motel[i].typeservice == "Tin VIP 1")
      {
        this.searchmotels.push(motel[i])
      }
    }
  }

  public loadDataThuong(motel){
    for(let i = 0; i< motel.length; i++){
      if(motel[i].typeservice == "Tin thường")
      {
        this.searchmotels.push(motel[i])
      }
    }
  }

  public async getMotels(){
    /*this.motelService.getmoteladmin().subscribe(getmotel => {
      
    })*/
    const result = await this.motelService.getmoteladmin() as Motel[];
    this.loadDataHot(result);
    this.loadData1(result);
    this.loadData2(result);
    this.loadData3(result);    
    this.loadDataThuong(result);

    this.motels = this.searchmotels
    this.totalRecord = this.motels.length;
  }

  public onChangeStatus(event: any)
  {
    let value = event.target.value;
    var name = this.statuss[value].text.toString();
    this.status = name;
    if((this.newType == "Tất cả" && this.status != "Tất cả") || (this.status == "Tất cả" && this.newType != "Tất cả")){
      if(this.status == "Tin đã duyệt"){
        this.motels = this.searchmotels.filter(motel => motel.verify == true);
      }
      if(this.status == "Tin chưa duyệt"){
        this.motels = this.searchmotels.filter(motel => motel.verify == false);
      }
    }
    else if(this.status == "Tất cả" && this.newType == "Tất cả"){
      this.motels = this.searchmotels;
    }
    else if(this.status != "Tất cả" && this.newType == "Tất cả"){
      this.motels = this.searchmotels.filter(motel => motel.detail.typeofnew.name == this.newType);
    }
    else{
      if(this.status == "Tin đã duyệt"){
        this.motels = this.searchmotels.filter(motel => motel.verify == true && motel.detail.typeofnew.name == this.newType);
      }
      if(this.status == "Tin chưa duyệt"){
        this.motels = this.searchmotels.filter(motel => motel.verify == false && motel.detail.typeofnew.name == this.newType);
      }
    }

  }


  public linkRouterChiTiet(name, id) {
    //this.router.navigate( [{name: name, id: id}]);
    this.route.navigate( ['/admin/chi-tiet',name,id]);
  }
}
