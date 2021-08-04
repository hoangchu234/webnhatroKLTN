import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MotelService } from '../../../../services/motel.service';
import { Motel } from '../../../../model/Motel';
import { Detail } from '../../../../model/Detail';
import { MatDialog } from '@angular/material/dialog';
import { DialogThongBaoComponent } from '../dialog-thong-bao/dialog-thong-bao.component';
import { StorageService } from 'src/app/storage.service';
import { Direct } from 'src/app/model/Direct';

export interface Data{
  id:number;
  text:string;
}

@Component({
  selector: 'app-thong-tin-co-ban-next',
  templateUrl: './thong-tin-co-ban-next.component.html',
  styleUrls: ['./thong-tin-co-ban-next.component.css']
})


export class ThongTinCoBanNextComponent implements OnInit {

  motelprevous:Motel;
  priceMotel: Float32Array;
  areaMotel: string;

  directs: Direct[] = [];

  direct: Direct = {id:null,directName:""};

  title: string;
  description: string;

  typePriceMotels:Array<Data> = [
    {id: 0, text:'đồng/tháng'},
    {id: 1, text:'triệu/tháng'},
  ];
  typePriceMotel: string;

  constructor(public dialog: MatDialog,private router: Router,public motelService:MotelService) {
    this.motelprevous = JSON.parse(localStorage.getItem(StorageService.motelStorage));
    if(this.motelprevous.price != undefined){
      this.priceMotel = this.motelprevous.price;
      this.areaMotel = this.motelprevous.areaZone;
      this.title = this.motelprevous.title;
      this.description = this.motelprevous.description;
      if(this.motelprevous.priceType == "triệu/tháng"){
        this.typePriceMotels = this.typePriceMotels.splice(0, this.typePriceMotels.length);
        var data:Array<Data> = [
          {id: 0, text:'triệu/tháng'},
          {id: 1, text:'đồng/tháng'},
        ];
        this.typePriceMotels = data.slice();
        this.typePriceMotel = this.motelprevous.priceType;
      }
    }
    else{
      this.typePriceMotel = "đồng/tháng";
    }
  }

  ngOnInit(): void {
    if(this.motelprevous.detail != undefined){
      this.getDirectPrevous(this.motelprevous.detail.director);
    }
    else{
      this.getDirect();
    }
  }

  async getDirect(){
    this.directs = await this.motelService.getDirect() as Direct[];
    this.direct = this.directs[0]
  }

  async getDirectPrevous(name){
    var data = await this.motelService.getDirect() as Direct[];
    var index = data.findIndex(a => a.directName === name);
    var dataFirst = data[index];
    data.splice(index, 1);
    this.directs.push(dataFirst);
    for(let i=0;i<data.length;i++){
      this.directs.push(data[i]);
    }
    
    this.direct = this.directs[0]
    
  }

  public onChangeTypePriceMote(event){
    let value = event.target.value;
    var name = this.typePriceMotels[value].text.toString();
    this.typePriceMotel = name;
  }

  public onChangeDirect(event)
  {
    let value = event.target.value;
    this.direct = this.directs[value];
  }

  public step3(){
    if(this.priceMotel && this.areaMotel && this.typePriceMotel && this.title && this.description){
      let motelnew = new Motel();
      motelnew = JSON.parse(localStorage.getItem(StorageService.motelStorage));
      motelnew.price = this.priceMotel;
      motelnew.areaZone = this.areaMotel;
      motelnew.priceType = this.typePriceMotel;
      motelnew.areaZoneType = "m²";
      let detail = new Detail();
      detail.director = this.direct.directName;
      motelnew.detail = detail;
      motelnew.title = this.title;
      motelnew.description = this.description;
      localStorage.removeItem(StorageService.motelStorage)
      localStorage.setItem(StorageService.motelStorage, JSON.stringify(motelnew));
      this.router.navigateByUrl('/user/thong-tin-chi-tiet-nha-tro');
    }
    else{
      this.openDialog();
    }
   
  }

  public step1(){
    this.router.navigateByUrl('/user/thong-tin-vi-tri');
  }

  public step4(){
    var data = this.motelprevous.detail;
    if(data != undefined){
      this.router.navigateByUrl('/user/thong-tin-hinh-anh');
    }
  }

  public step5(){
    var data = localStorage.getItem(StorageService.ImageStorage);;
      if(data != undefined){
        this.router.navigateByUrl('/user/goi-thanh-toan');
      }
  }

  public step6(){
    var data = this.motelprevous.bill;
      if(data != undefined){
        this.router.navigateByUrl('/user/thanh-toan-dong');
      }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogThongBaoComponent, {
      direction: "ltr",
      width: '400px'
    });
 
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
