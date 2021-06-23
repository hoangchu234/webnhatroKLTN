import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MotelService } from '../../../../services/motel.service';
import { CitiesService } from '../../../../services/cities.service';
import { ProvincesService } from '../../../../services/provinces.service';
import { DictrictService } from '../../../../services/dictrict.service';
import { StreetService } from '../../../../services/street.service';
import { Motel } from '../../../../model/Motel';
import { Detail } from '../../../../model/Detail';
import { LiveType } from '../../../../model/LiveType';
import { StorageService } from 'src/app/storage.service';
import { City } from 'src/app/model/City';
import { Province } from 'src/app/model/Province';
import { District } from 'src/app/model/District';
import { Street } from 'src/app/model/Street';

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

  longtude = "";
  langtude = "";

  nameCity = "";
  nameProvince = "";
  nameDistrict = "";
  nameStreet = "";

  long = "";
  lat = "";
  constructor(public streetService:StreetService,public dictrictService:DictrictService,private cityService: CitiesService, private provinceService: ProvincesService,private router: Router,public motelService:MotelService) {
    this.motelprevous = JSON.parse(localStorage.getItem(StorageService.motelStorage));
    if(this.motelprevous.detail.numberBath != undefined || this.motelprevous.detail.numberLiving != undefined){
      this.numberBath = this.motelprevous.detail.numberBath.toString();
      this.numberLiving = this.motelprevous.detail.numberLiving.toString();
    }
   }

  async ngOnInit(): Promise<void> {
    this.nameCity = await this.getNameCity(this.motelprevous.cityId);
    this.nameProvince = await this.getNameProvince(this.motelprevous.provinceId);
    this.nameDistrict = await this.getNameCity(this.motelprevous.districtId);
    this.nameStreet = await this.getNameStreet(this.motelprevous.streetId);
    this.getLiveType();
    this.numberBath = "0";
    this.numberLiving = "0";

    this.getlonglat();
  }

  async getNameCity(id){
    var data = await this.cityService.getCityFromId(id) as City;
    return data.name;
  }
  async getNameProvince(id){
    var data = await this.provinceService.getProvinceById(id) as Province;
    return data.name;
  }
  async getNameDistrict(id){
    var data = await this.dictrictService.getDistrictFromId(id) as District;
    return data.name;
  }
  async getNameStreet(id){
    var data = await this.streetService.getStreetFromId(id) as Street;
    return data.name;
  }

  async getViTri(cityname,provincename,districtname,streetname,addressMotel){
    var data = cityname + ", " + provincename + ", " + districtname + ", " + streetname;
    var get = await this.motelService.getLocation(data);
    this.lat = get["data"]["features"][0]["geometry"]["coordinates"][0];
    this.long = get["data"]["features"][0]["geometry"]["coordinates"][1];
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

  // public step3(){
  //   this.router.navigateByUrl('/user/thong-tin-chi-tiet-nha-tro');
  // }

  // public step4(){
  //   this.router.navigateByUrl('/user/thong-tin-hinh-anh');
  // }

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

  async getlonglat(){
    let motelnew = new Motel();
    motelnew = JSON.parse(localStorage.getItem(StorageService.motelStorage));

    if(this.motelprevous.latitude == "" && this.motelprevous.longitude == ""){
      await this.getViTri(this.nameCity,this.nameProvince, this.nameDistrict,this.nameStreet,this.motelprevous.address);
      this.longtude = this.longtude;
      this.langtude = this.lat;
    }
    else{
      this.longtude = this.motelprevous.longitude;
      this.langtude = this.motelprevous.latitude;
    }
    motelnew.longitude = this.longtude;
    motelnew.latitude = this.langtude;

    localStorage.removeItem(StorageService.motelStorage)
    localStorage.setItem(StorageService.motelStorage, JSON.stringify(motelnew));
  }

  public async step4(){
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
