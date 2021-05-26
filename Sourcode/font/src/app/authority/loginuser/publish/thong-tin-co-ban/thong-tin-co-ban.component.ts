import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Province } from '../../../../model/Province';
import { City } from '../../../../model/City';
import { CitiesService } from '../../../../services/cities.service'
import { ProvincesService } from '../../../../services/provinces.service'
import { Router } from '@angular/router';
import { MotelService } from '../../../../services/motel.service';
import { DictrictService } from '../../../../services/dictrict.service';
import { Motel } from '../../../../model/Motel';
import { MatDialog } from '@angular/material/dialog';
import { DialogThongBaoComponent } from '../dialog-thong-bao/dialog-thong-bao.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { District } from 'src/app/model/District';
import { Street } from 'src/app/model/Street';
import { StreetService } from 'src/app/services/street.service';
import { StorageService } from '../../../../storage.service';
import { NewType } from 'src/app/model/NewType';
import { TypeofnewService } from 'src/app/services/newstype.service';


@Component({
  selector: 'app-thong-tin-co-ban',
  templateUrl: './thong-tin-co-ban.component.html',
  styleUrls: ['./thong-tin-co-ban.component.css']
})
export class ThongTinCoBanComponent implements OnInit {

  typeMotel: string;
  addressMotel: string;

  cities: City [] = [];
  city: City;

  provinces : Province [] = [];
  province: Province;

  districts :District [] = [];
  district:District;

  streets: Street [] = [];
  street:Street;

  newTypes: Array<NewType>= [];
  newType: NewType;
  
  phoneMotel;

  motelprevous:Motel;
  checkFirstTime = true;
  isWarning = false;

  //currentAccount:Account;
  constructor(public typeservice:TypeofnewService,public streetService:StreetService,public dictrictService:DictrictService,private authenticationService: AuthenticationService,public dialog: MatDialog,private router: Router,private cityService: CitiesService, private provinceService: ProvincesService,public motelService:MotelService) {
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);    
    if(JSON.parse(localStorage.getItem(StorageService.motelStorage))){
      this.motelprevous = JSON.parse(localStorage.getItem(StorageService.motelStorage));
    }

    this.getNewTypes();

  }

  async ngOnInit(): Promise<void> {
    this.phoneMotel = this.authenticationService.currentAccountValue.phone;
    this.typeMotel = "Thuê";

    if(this.motelprevous){
      this.privous();
    }
    else{
      this.getCities();
    }
  }

  async privous(){
    this.phoneMotel = this.motelprevous.phone;
    this.addressMotel = this.motelprevous.address;
     
    //type
    this.newTypes.splice(0,this.newTypes.length);
    await this.getNewTypes();
    var getType = JSON.parse(localStorage.getItem(StorageService.TypeMotelStorage));
    this.newType = getType;
    var indexTy = this.newTypes.findIndex(a => a.id === getType.id);
    this.newTypes.splice(indexTy,1);
    this.newTypes.unshift(this.newType);


    //city
    const city = await this.cityService.getCitys() as City[];
    city.shift();
    this.city = city.find(a => a.id == this.motelprevous.cityId);

    this.cities.splice(0,this.cities.length);
    this.cities = city.slice();

    var indexCi = this.cities.findIndex(a => a.id === this.motelprevous.cityId);
    this.cities.splice(indexCi,1);
    this.cities.unshift(this.city);

    //Province
    const province = await this.provinceService.getProvincesByCity(Number(this.motelprevous.cityId)) as Province[];
    this.province = province.find(a => a.id == this.motelprevous.provinceId);  
    
    this.provinces.splice(0,this.provinces.length);
    this.provinces = province.slice();

    var indexPr = this.provinces.findIndex(a => a.id === this.motelprevous.provinceId);
    this.provinces.splice(indexPr,1);
    this.provinces.unshift(this.province);

    //District
    const district = await this.dictrictService.getDistrictByProvince(Number(this.motelprevous.provinceId)) as District[];
    this.district = district.find(a => a.id == this.motelprevous.districtId);

    this.districts.splice(0,this.districts.length);
    this.districts = district.slice();

    var indexDi = this.districts.findIndex(a => a.id === this.motelprevous.districtId);
    this.districts.splice(indexDi,1);
    this.districts.unshift(this.district);

    //street
    const street = await this.streetService.getStreetByProvince(Number(this.motelprevous.provinceId)) as Street[];
    this.street = street.find(a => a.id == this.motelprevous.streetId);
      
    this.streets.splice(0,this.streets.length);
    this.streets = street.slice();

    var indexst = this.streets.findIndex(a => a.id === this.motelprevous.streetId);
    this.streets.splice(indexst,1);
    this.streets.unshift(this.street);    
  }

  public getNewTypes = async () => {
    //this.typeservice.getTypeExcepts().subscribe(gettypes => this.newTypes = gettypes);
    this.newTypes = await this.typeservice.getTypeExcepts() as NewType[];
    this.newType = this.newTypes[0];
  }

  public onClickTypeMotelButton() {
    this.typeMotel = "Thuê"
    this.isWarning = false;

  }

  public onChangeType(event)
  {
    let value = event.target.value;
    var typeFind = this.newTypes.find(m => m.id == value);
    this.newType = typeFind;
  }

  public onChangeCity(event)
  {
    let value = event.target.value;
    var cityFind = this.cities.find(m => m.id == value);
    this.city = cityFind;
    this.getProvinceById(cityFind.id);
  }

  public onChangeProvince(event)
  {
    let value = event.target.value;
    var provinceFind = this.provinces.find(m => m.id == value);
    this.province = provinceFind;
    this.getStreetById(provinceFind.id);
    this.getDistricteById(provinceFind.id);
  }

  public onChangeDistrict(event){
    let value = event.target.value;
    if(value){    
      var districtFind = this.districts.find(m => m.id == value);
      this.district = districtFind;
    }
    else{

    }
  }

  public onChangeStreet(event){
    let value = event.target.value;
    var streetFind = this.streets.find(m => m.id == value);
    this.street = streetFind;
  }

  public async getStreetById(ID){
    var streetNew : Street [] = [];
    this.streets = streetNew;
   
    const result = await this.streetService.getStreetByProvince(Number(ID)) as Street[];
    for (let i = 0; i < result.length; i++) {
      let street = new Street();
      street.id = result[i].id;
      street.name = result[i].name;
      this.streets.push(street);
    }
    this.street = result[0]
  }

  public async getProvinceById(ID){
    var provinceNew : Province [] = [];
    this.provinces = provinceNew;
    const list = await this.provinceService.getProvincesByCity(Number(ID)) as Province[];
      for (let i = 0; i < list.length; i++) {
        let province = new Province();
        province.id = list[i].id;
        province.name = list[i].name;
        this.provinces.push(province);
      }
      this.province = list[0]
      this.getDistricteById(list[0].id)
      this.getStreetById(list[0].id)
  }

  public async getDistricteById(ID){
    var districtNew : District [] = [];
    this.districts = districtNew;
    const list = await this.dictrictService.getDistrictByProvince(Number(ID)) as District[];
      for (let i = 0; i < list.length; i++) {
        let district = new District();
        district.id = list[i].id;
        district.name = list[i].name;
        this.districts.push(district);
      }
      this.district = list[0];
    
  }

  public async getCities(){
    const result = await this.cityService.getCitys() as City[];
    for(let i=1;i<result.length;i++){
      this.cities.push(result[i]);
    }
    this.city = result[1]
    this.getProvinceById(result[1].id)
  }

  public next(){
    if( this.typeMotel && this.city.id && this.province.id && this.addressMotel && this.phoneMotel){
      let motel = new Motel(); 
      motel.typemotel = this.typeMotel;
      motel.cityId = this.city.id;
      motel.provinceId = this.province.id;
      motel.districtId = this.district.id;
      if(this.street == undefined){
        motel.streetId = "0";
      }
      else{
        motel.streetId = this.street.id;
      }
      motel.address = this.addressMotel;
      motel.phone = this.phoneMotel;
      localStorage.setItem(StorageService.motelStorage, JSON.stringify(motel));
      // this.behaviorSubjectClass.setNewTypes(this.newType);
      localStorage.setItem(StorageService.TypeMotelStorage, JSON.stringify(this.newType))
      this.router.navigateByUrl('/user/thong-tin-nha-tro');
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

  public prevous(){
    this.router.navigateByUrl('/user/thong-tin-vi-tri');
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
