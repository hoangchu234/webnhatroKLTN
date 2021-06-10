import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Motel  } from '../../../../model/Motel';
import { MotelService } from '../../../../services/motel.service';
import { ServicePriceService } from '../../../../services/service-price.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer, } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Serviceprice } from 'src/app/model/Serviceprice';
import { Bill } from 'src/app/model/Bill';
import { StorageService } from 'src/app/storage.service';
import { New } from 'src/app/model/New';
import { Time } from 'src/app/model/Time';
import { ChangeTime } from 'src/app/model/ChangeTime';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chon-goi-tin-thanh-toan',
  templateUrl: './chon-goi-tin-thanh-toan.component.html',
  styleUrls: ['./chon-goi-tin-thanh-toan.component.css']
})
export class ChonGoiTinThanhToanComponent implements OnInit {

  servicePrice: Serviceprice[];
  
  news:Array<New> = [];
  times:Array<Time> = [];

  // public news:Array<New> = [
  //   {id: 0, text:'Tin Hot'}, // 4 tuần, 2 tuần
  //   {id: 1, text:'Tin VIP 3'}, // 
  //   {id: 2, text:'Tin VIP 2'},
  //   {id: 3, text:'Tin VIP 1'},
  //   {id: 4, text:'Tin thường'},
  // ];
  
  // public times:Array<Type> = [
  //   {id: 0, text:'Đăng theo ngày'}, 
  //   {id: 1, text:'Đăng theo tuần'}, 
  //   {id: 2, text:'Đăng theo tháng'},
  // ];

  time: string;

  // public months:Array<Type> = [
  //   {id: 0, text:'1 Tháng'}, 
  //   {id: 1, text:'2 Tháng'}, 
  //   {id: 2, text:'3 Tháng'}, 
  //   {id: 3, text:'4 Tháng'}, 
  //   {id: 4, text:'5 Tháng'}, 
  //   {id: 5, text:'6 Tháng'}, 
  //   {id: 6, text:'7 Tháng'}, 
  //   {id: 7, text:'8 Tháng'}, 
  //   {id: 8, text:'9 Tháng'}, 
  //   {id: 9, text:'10 Tháng'}, 
  //   {id: 10, text:'11 Tháng'}, 
  //   {id: 11, text:'12 Tháng'}, 
  // ];

  // public days:Array<Type> = [
  //   {id: 0, text:'6 Ngày'}, 
  //   {id: 1, text:'7 Ngày'}, 
  //   {id: 2, text:'8 Ngày'}, 
  //   {id: 3, text:'9 Ngày'}, 
  //   {id: 4, text:'10 Ngày'}, 
  //   {id: 5, text:'11 Ngày'}, 
  //   {id: 6, text:'12 Ngày'}, 
  //   {id: 7, text:'13 Ngày'}, 
  //   {id: 8, text:'14 Ngày'}, 
  //   {id: 9, text:'15 Ngày'}, 
  //   {id: 10, text:'16 Ngày'}, 
  //   {id: 11, text:'17 Ngày'}, 
  // ];

  // public weeks:Array<Type> = [
  //   {id: 0, text:'1 Tuần'}, 
  //   {id: 1, text:'2 Tuần'}, 
  //   {id: 2, text:'3 Tuần'}, 
  //   {id: 3, text:'4 Tuần'}, 
  //   {id: 4, text:'5 Tuần'}, 
  //   {id: 5, text:'6 Tuần'}, 
  //   {id: 6, text:'7 Tuần'}, 
  //   {id: 7, text:'8 Tuần'}, 
  //   {id: 8, text:'9 Tuần'}, 
  //   {id: 9, text:'10 Tuần'}, 
  // ];

  setValueName: string = "Số ngày";
  setArrayChoices: Array<ChangeTime> = [];

  new: string = "";
  timePublish:string = "";

  motel: Motel;
 
  //Xét tính tiền
  totalprice:number = 0;
  type:string[] = [];
  price:string = "";


  check = false;
  constructor(private userService: UserService,private authenticationService: AuthenticationService,private priceService: ServicePriceService,private router: Router,private _sanitizer: DomSanitizer,private storage: AngularFireStorage,private http:HttpClient,public motelService:MotelService) {

  }

  async ngOnInit(): Promise<void> {
    this.prevous();
    var data = await this.getCheckFree();
    if(data == 0) this.check = false;
    else this.check = true;
  }

  async getCheckFree(){
    var id = Number(this.authenticationService.currentAccountValue.user.id);
    var data = await this.userService.getUserFromId(id) as User;
    if(Number(data.pubishFree)==0)
    {
      return 0;
    }
    else{
      return 1;
    }
  }

  async getDataNew(){
    this.news = await this.motelService.getNew() as New[];
    this.new = this.news[0].newName;
  }
  async getDataNewPrevous(newNamePre){
    var data = await this.motelService.getNew() as New[];
    var index = data.findIndex(a => a.newName === newNamePre);
    this.news.splice(0, this.news.length);
    this.news.push(data[index]);
    data.splice(index,1);
    for(let i=0;i<data.length;i++){
      this.news.push(data[i]);
    }
    this.new = this.news[0].newName;
  }

  async getDataTime(){
    this.times = await this.motelService.getTime() as Time[];
    this.time = this.times[0].timeName;
    await this.getDataChangeTime(this.times[0].id);
    this.timePublish = this.setArrayChoices[0].changeTimeName;
    this.tinhTien();
  }
  async getDataTimePrevous(timeName,changeTimeName){
    var data = await this.motelService.getTime() as Time[];
    var index = data.findIndex(a => a.timeName === timeName);
    this.times.splice(0, this.news.length);
    this.times.push(data[index]);
    data.splice(index,1);
    for(let i=0;i<data.length;i++){
      this.times.push(data[i]);
    }
    this.time = this.times[0].timeName;
    await this.getDataChangeTimePrevous(changeTimeName,this.times[0].id);
    this.timePublish = this.setArrayChoices[0].changeTimeName;
    this.tinhTien();
  }

  async getDataChangeTime(typeTime: number){
    this.setArrayChoices = await this.motelService.getChangeTime(typeTime) as ChangeTime[];
  }
  async getDataChangeTimePrevous(changeTimeName,typeTime: number){
    var data = await this.motelService.getChangeTime(typeTime) as ChangeTime[];
    var index = data.findIndex(a => a.changeTimeName === changeTimeName);
    this.setArrayChoices.splice(0, this.news.length);
    this.setArrayChoices.push(data[index]);
    data.splice(index,1);
    for(let i=0;i<data.length;i++){
      this.setArrayChoices.push(data[i]);
    }
  }

  public async getServicePrices(){
    this.servicePrice = await this.priceService.getServiceprices() as Serviceprice[];
    //this.priceService.getServiceprices().subscribe(getserviceprice => this.servicePrice = getserviceprice)
  }


  public onChangeSetValueName(event){
    let value = event.target.value;
    var name = this.setArrayChoices.find(a => a.id == value);
    this.timePublish = name.changeTimeName;
    this.tinhTien();
  }

  public async onChangetime(event){
    let value = event.target.value;
    await this.getDataChangeTime(value);   
    this.timePublish = this.setArrayChoices[0].changeTimeName;
    var name = this.times.find(a => a.id == value);
    this.time = name.timeName;  
    this.tinhTien();
  }

  public onChangeNewMotel(event)
  {
    let value = event.target.value;
    var name = this.news.find(a => a.id == value);
    this.new = name.newName;
    this.tinhTien();
  }

  
  public step1(){
    this.router.navigateByUrl('/user/thong-tin-vi-tri');
  }
  public step2(){
    this.router.navigateByUrl('/user/thong-tin-nha-tro');
  }
  public step3(){
    this.router.navigateByUrl('/user/thong-tin-chi-tiet-nha-tro');
  }
  public step4(){
    this.router.navigateByUrl('/user/thong-tin-hinh-anh');
  }

  prevous(){
    let motelnew = new Motel();
    motelnew = JSON.parse(localStorage.getItem(StorageService.motelStorage));
    if(motelnew.bill != undefined){
      this.getDataNewPrevous(motelnew.typeservice);
      var check = motelnew.bill.timeChoice.split(" ");
      var data = "";
      if(check[2] == "ngày"){
        data = motelnew.bill.numberDatePublish + " Ngày";
      }
      else if(check[2] == "tuần"){
        data = motelnew.bill.numberDatePublish + " Tuần";
      }
      else{
        data = motelnew.bill.numberDatePublish + " Tháng";
      }
      this.getDataTimePrevous(motelnew.bill.timeChoice,data);
    }
    else{
      this.getDataNew();
      this.getDataTime();
    }
    this.getServicePrices();
  }

  public step6(){

    this.motel = JSON.parse(localStorage.getItem(StorageService.motelStorage));
    this.motel.typeservice = this.new;
    this.motel.time = this.timePublish;

   
    let bill = new Bill();
    bill.payMoney = this.totalprice;
    var t = this.timePublish.split(" ");
    bill.numberDatePublish = Number(t[0]);
    bill.timeChoice = this.time;
    this.motel.bill = bill;

    localStorage.removeItem(StorageService.motelStorage)
    localStorage.setItem(StorageService.motelStorage, JSON.stringify(this.motel));
    localStorage.setItem(StorageService.totalMoneyStorage, this.totalprice.toString());
    this.router.navigateByUrl('/user/thanh-toan-dong'); 
   
  }

  // prevous(){
  //   this.totalprice = Number(localStorage.getItem(StorageService.totalMoneyStorage));
  // }

  public tinhTien(){
    var data = this.servicePrice.find(a => a.typeofnew == this.new);
    if(this.time == "Đăng theo ngày"){
      this.price = data.priceDate.split(" ")[0];
      this.type = this.timePublish.split(" ");
      this.totalprice = (Number(this.type[0]))*(Number(this.price)*1000);
    }
    else if(this.time == "Đăng theo tuần"){
      this.price = data.priceWeek.split(" ")[0];
      this.type = this.timePublish.split(" ");
      this.totalprice = (Number(this.type[0]))*(Number(this.price)*1000);
    }
    else if(this.time == "Đăng theo tháng"){
      this.price = data.priceMonth.split(" ")[0];
      this.type = this.timePublish.split(" ");
      this.totalprice = (Number(this.type[0]))*(Number(this.price)*1000);
    }
    // var = this.totalprice.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
    // if(this.new == "Tin Hot"){
    //   if(this.time == "Đăng theo ngày"){
    //     this.price = 50000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    //   if(this.time == "Đăng theo tuần"){
    //     this.price = 315000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    //   if(this.time == "Đăng theo tháng"){
    //     this.price = 1200000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    // }
    // if(this.new == "Tin VIP 3"){
    //   if(this.time == "Đăng theo ngày"){
    //     this.price = 30000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    //   if(this.time == "Đăng theo tuần"){
    //     this.price = 190000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    //   if(this.time == "Đăng theo tháng"){
    //     this.price = 800000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    // }
    // if(this.new == "Tin VIP 2"){
    //   if(this.time == "Đăng theo ngày"){
    //     this.price = 20000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    //   if(this.time == "Đăng theo tuần"){
    //     this.price = 133000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    //   if(this.time == "Đăng theo tháng"){
    //     this.price = 540000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    // }
    // if(this.new == "Tin VIP 1"){
    //   if(this.time == "Đăng theo ngày"){
    //     this.price = 10000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    //   if(this.time == "Đăng theo tuần"){
    //     this.price = 63000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    //   if(this.time == "Đăng theo tháng"){
    //     this.price = 240000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    // }
    // if(this.new == "Tin thường"){
    //   if(this.time == "Đăng theo ngày"){
    //     this.price = 2000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    //   if(this.time == "Đăng theo tuần"){
    //     this.price = 12000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    //   if(this.time == "Đăng theo tháng"){
    //     this.price = 48000
    //     this.type = this.timePublish.split(" ");
    //     this.totalprice = Number(this.type[0])*this.price;
    //   }
    // }

  }
}
