import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Motel  } from '../../../../model/Motel';
import { MotelService } from '../../../../services/motel.service';
import { ServicePriceService } from '../../../../services/service-price.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer, } from '@angular/platform-browser';
import { BehaviorSubjectClass } from '../../../../services/behaviorsubject'
import { Router } from '@angular/router';
import { Serviceprice } from 'src/app/model/Serviceprice';
import { Bill } from 'src/app/model/Bill';

export interface Type{
  id:number;
  text:string;
}

@Component({
  selector: 'app-chon-goi-tin-thanh-toan',
  templateUrl: './chon-goi-tin-thanh-toan.component.html',
  styleUrls: ['./chon-goi-tin-thanh-toan.component.css']
})
export class ChonGoiTinThanhToanComponent implements OnInit {

  servicePrice: Serviceprice[];
  
  public news:Array<Type> = [
    {id: 0, text:'Tin Hot'}, // 4 tuần, 2 tuần
    {id: 1, text:'Tin VIP 3'}, // 
    {id: 2, text:'Tin VIP 2'},
    {id: 3, text:'Tin VIP 1'},
    {id: 4, text:'Tin thường'},
  ];
  
  public times:Array<Type> = [
    {id: 0, text:'Đăng theo ngày'}, 
    {id: 1, text:'Đăng theo tuần'}, 
    {id: 2, text:'Đăng theo tháng'},
  ];

  time: string;

  public months:Array<Type> = [
    {id: 0, text:'1 Tháng'}, 
    {id: 1, text:'2 Tháng'}, 
    {id: 2, text:'3 Tháng'}, 
    {id: 3, text:'4 Tháng'}, 
    {id: 4, text:'5 Tháng'}, 
    {id: 5, text:'6 Tháng'}, 
    {id: 6, text:'7 Tháng'}, 
    {id: 7, text:'8 Tháng'}, 
    {id: 8, text:'9 Tháng'}, 
    {id: 9, text:'10 Tháng'}, 
    {id: 10, text:'11 Tháng'}, 
    {id: 11, text:'12 Tháng'}, 
  ];

  public days:Array<Type> = [
    {id: 0, text:'6 Ngày'}, 
    {id: 1, text:'7 Ngày'}, 
    {id: 2, text:'8 Ngày'}, 
    {id: 3, text:'9 Ngày'}, 
    {id: 4, text:'10 Ngày'}, 
    {id: 5, text:'11 Ngày'}, 
    {id: 6, text:'12 Ngày'}, 
    {id: 7, text:'13 Ngày'}, 
    {id: 8, text:'14 Ngày'}, 
    {id: 9, text:'15 Ngày'}, 
    {id: 10, text:'16 Ngày'}, 
    {id: 11, text:'17 Ngày'}, 
  ];

  public weeks:Array<Type> = [
    {id: 0, text:'1 Tuần'}, 
    {id: 1, text:'2 Tuần'}, 
    {id: 2, text:'3 Tuần'}, 
    {id: 3, text:'4 Tuần'}, 
    {id: 4, text:'5 Tuần'}, 
    {id: 5, text:'6 Tuần'}, 
    {id: 6, text:'7 Tuần'}, 
    {id: 7, text:'8 Tuần'}, 
    {id: 8, text:'9 Tuần'}, 
    {id: 9, text:'10 Tuần'}, 
  ];

  setValueName: string = "Số ngày";
  setArrayChoices: Array<Type> = [];

  new: string;
  timePublish:string;

  motel: Motel;
 
  //Xét tính tiền
  totalprice:number = 0;
  type:string[] = [];
  price:number;


  constructor(private behaviorSubjectClass:BehaviorSubjectClass,private priceService: ServicePriceService,private router: Router,private _sanitizer: DomSanitizer,private storage: AngularFireStorage,private http:HttpClient,public motelService:MotelService) {

  }

  ngOnInit(): void {
    this.setArrayChoices = this.days;
    this.new = 'Tin Hot';
    this.time = 'Đăng theo ngày';
    this.timePublish = '6 Ngày'
    this.getServicePrices();

    this.tinhTien();
    localStorage.removeItem('currentImagesFile');
  }

  public getServicePrices(){
    this.priceService.getServiceprices().subscribe(getserviceprice => this.servicePrice = getserviceprice)
  }


  public onChangeSetValueName(event){
    let value = event.target.value;
    var name = this.setArrayChoices[value].text.toString();
    this.timePublish = name;
    this.tinhTien();
  }

  public onChangetime(event){
    try{
      let value = event.target.value;
      var name = this.times[value].text.toString();
      this.time = name;
  
      if(Number(value) == 0){
        this.setValueName = "Số ngày";
        this.setArrayChoices = this.days;
      }
      else if(Number(value) == 1){
        this.setValueName = "Số tuần";
        this.setArrayChoices = this.weeks;
      }
      else {
        this.setValueName = "Số tháng";
        this.setArrayChoices = this.months;
      }
    }
    catch(error){
      this.setValueName = "Số tháng";
      this.setArrayChoices = this.months;
    }  
    this.tinhTien();
  }

  public onChangeNewMotel(event)
  {
    try{
      let value = event.target.value;
      var name = this.news[value].text.toString();
      this.new = name;
      this.tinhTien();
    }
    catch (error){
     
    }

  }

  public prevous(){
    this.router.navigateByUrl('/user/thong-tin-hinh-anh');
  }

  public next(){

    this.motel = JSON.parse(localStorage.getItem('PublishMotel'));
    this.motel.typeservice = this.new;
    this.motel.time = this.timePublish;

   
    let bill = new Bill();
    bill.payMoney = this.totalprice;
    var t = this.timePublish.split(" ");
    bill.numberDatePublish = Number(t[0]);
    bill.timeChoice = this.time;
    this.motel.bill = bill;

    localStorage.removeItem('PublishMotel')
    localStorage.setItem('PublishMotel', JSON.stringify(this.motel));
    this.router.navigateByUrl('/user/thanh-toan-dong'); 
   
  }

  
  public tinhTien(){
    console.log(this.timePublish.split(" "));
    if(this.new == "Tin Hot"){
      if(this.time == "Đăng theo ngày"){
        this.price = 50000
        this.type = this.timePublish.split(" ");

        this.totalprice = Number(this.type[0])*this.price;
      }
      if(this.time == "Đăng theo tuần"){
        this.price = 315000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
      if(this.time == "Đăng theo tháng"){
        this.price = 120000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
    }
    if(this.new == "Tin VIP 3"){
      if(this.time == "Đăng theo ngày"){
        this.price = 30000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
      if(this.time == "Đăng theo tuần"){
        this.price = 190000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
      if(this.time == "Đăng theo tháng"){
        this.price = 800000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
    }
    if(this.new == "Tin VIP 2"){
      if(this.time == "Đăng theo ngày"){
        this.price = 20000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
      if(this.time == "Đăng theo tuần"){
        this.price = 133000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
      if(this.time == "Đăng theo tháng"){
        this.price = 540000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
    }
    if(this.new == "Tin VIP 1"){
      if(this.time == "Đăng theo ngày"){
        this.price = 10000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
      if(this.time == "Đăng theo tuần"){
        this.price = 63000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
      if(this.time == "Đăng theo tháng"){
        this.price = 240000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
    }
    if(this.new == "Tin thường"){
      if(this.time == "Đăng theo ngày"){
        this.price = 2000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
      if(this.time == "Đăng theo tuần"){
        this.price = 12000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
      if(this.time == "Đăng theo tháng"){
        this.price = 48000
        this.type = this.timePublish.split(" ");
        this.totalprice = Number(this.type[0])*this.price;
      }
    }

    localStorage.setItem('totalMoney', this.totalprice.toString());
  }
}
