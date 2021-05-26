import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MotelService } from '../../../../services/motel.service';
import { Motel } from '../../../../model/Motel';
import { Detail } from '../../../../model/Detail';
import { MatDialog } from '@angular/material/dialog';
import { DialogThongBaoComponent } from '../dialog-thong-bao/dialog-thong-bao.component';
import { StorageService } from 'src/app/storage.service';

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

  directs:Array<Data> = [
    {id: 0, text:'Không xác định'},
    {id: 1, text:'Đông'},
    {id: 2, text:'Tây'},
    {id: 3, text:'Nam'},
    {id: 4, text:'Bắc'},
    {id: 5, text:'Đông Bắc'},
    {id: 6, text:'Đông Nam'},
    {id: 7, text:'Tây Bắc'},
    {id: 8, text:'Tây Nam'},
  ];
  direct: string;

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
    }
   }

  ngOnInit(): void {
    this.typePriceMotel = "đồng/tháng"
    this.direct = this.directs[0].text.toString();
  }

  public onChangeTypePriceMote(event){
    let value = event.target.value;
    var name = this.typePriceMotels[value].text.toString();
    this.typePriceMotel = name;
  }

  public onChangeDirect(event)
  {
    let value = event.target.value;
    var name = this.directs[value].text.toString();
    this.direct = name;
  }

 
  public next(){
    if(this.priceMotel && this.areaMotel && this.typePriceMotel && this.title && this.description){
      let motelnew = new Motel();
      motelnew = JSON.parse(localStorage.getItem(StorageService.motelStorage));
      motelnew.price = this.priceMotel;
      motelnew.areaZone = this.areaMotel;
      motelnew.priceType = this.typePriceMotel;
      motelnew.areaZoneType = "m²";
      let detail = new Detail();
      detail.director = this.direct;
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
  public step2(){
    this.router.navigateByUrl('/user/thong-tin-nha-tro');
  }


  public step3(){
    this.router.navigateByUrl('/user/thong-tin-chi-tiet-nha-tro');
  }
  public step4(){
    this.router.navigateByUrl('/user/thong-tin-hinh-anh');
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
