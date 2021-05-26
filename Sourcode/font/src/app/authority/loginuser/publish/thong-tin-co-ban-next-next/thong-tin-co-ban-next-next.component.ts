import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MotelService } from '../../../../services/motel.service';
import { Motel } from '../../../../model/Motel';
import { Detail } from '../../../../model/Detail';
import { LiveType } from '../../../../model/LiveType';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-thong-tin-co-ban-next-next',
  templateUrl: './thong-tin-co-ban-next-next.component.html',
  styleUrls: ['./thong-tin-co-ban-next-next.component.css']
})
export class ThongTinCoBanNextNextComponent implements OnInit {

  liveType: string = "";
  numberBath: string;
  numberLiving: string;
  liveTypes:LiveType[];

  btnDisabledBath = true;
  btnDisabledLiving = true;
  motelprevous:Motel;
  constructor(private router: Router,public motelService:MotelService) {
    this.motelprevous = JSON.parse(localStorage.getItem(StorageService.motelStorage));
    if(this.motelprevous.detail.numberBath != undefined || this.motelprevous.detail.numberLiving != undefined){
      this.numberBath = this.motelprevous.detail.numberBath.toString();
      this.numberLiving = this.motelprevous.detail.numberLiving.toString();

    }
   }

  ngOnInit(): void {
    this.getLiveType();
    this.numberBath = "0";
    this.numberLiving = "0";
  }

  public async getLiveType(){
    const result = await this.motelService.getLiveTypes() as LiveType[];
    this.liveTypes = result.slice();
    this.liveTypes.shift();
    //this.motelService.getLiveTypes().subscribe(getlivetype => this.liveTypes = getlivetype)
  }

  public increaseNumberBath()
  {
    this.numberBath = (Number(this.numberBath) + 1).toString();
    this.btnDisabledBath = false;
  }

  public decreaseNumberBath()
  {
    this.numberBath = (Number(this.numberBath) - 1).toString();
    if(Number(this.numberBath) == 0){
      this.btnDisabledBath = true;
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

  public increaseNumberLiving()
  {
    this.numberLiving = (Number(this.numberLiving) + 1).toString();
    this.btnDisabledLiving = false;
  }

  public decreaseNumberLiving()
  {
    this.numberLiving = (Number(this.numberLiving) - 1).toString();
    if(Number(this.numberLiving) == 0){
      this.btnDisabledLiving = true;
    }
    
  }

  public next(){
    let motelnew = new Motel();
    motelnew = JSON.parse(localStorage.getItem(StorageService.motelStorage));

    let detail = new Detail();
    
    if(this.liveType == ""){
      detail.liveTypeId = "1";
    }
    else{
      detail.liveTypeId = this.liveType;
    }

    detail.numberBath = Number(this.numberBath);
    detail.numberLiving = Number(this.numberLiving);
    detail.director = motelnew.detail.director;
    motelnew.detail = detail;

    localStorage.removeItem(StorageService.motelStorage)
    localStorage.setItem(StorageService.motelStorage, JSON.stringify(motelnew));
    this.router.navigateByUrl('/user/thong-tin-hinh-anh');
  }

  
  
}
