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
import { BehaviorSubjectClass } from '../../../../services/behaviorsubject'
import { MatDialog } from '@angular/material/dialog';
import { DialogThongBaoComponent } from '../dialog-thong-bao/dialog-thong-bao.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { District } from 'src/app/model/District';
import { Street } from 'src/app/model/Street';
import { StreetService } from 'src/app/services/street.service';
import { StorageService } from '../../../../storage.service';


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

  phoneMotel;

  motelprevous:Motel;
  checkFirstTime = true;
  isWarning = false;

  //currentAccount:Account;
  constructor(public streetService:StreetService,public dictrictService:DictrictService,private authenticationService: AuthenticationService,public dialog: MatDialog,private behaviorSubjectClass: BehaviorSubjectClass,private router: Router,private cityService: CitiesService, private provinceService: ProvincesService,public motelService:MotelService) {
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);    
    this.motelprevous = JSON.parse(localStorage.getItem(StorageService.motelStorage));
 
  }

  async ngOnInit(): Promise<void> {
    this.phoneMotel = this.authenticationService.currentAccountValue.phone;
    this.typeMotel = "Thuê";

    if(this.motelprevous){
      this.phoneMotel = this.motelprevous.phone;
      this.addressMotel = this.motelprevous.address;

      ///
      this.returnCity();

      /*this.provinceService.getProvincesByCity(Number(this.motelprevous.cityId)).subscribe((data) => {
        this.provinces.push(data.find(a => a.id == this.motelprevous.provinceId));
        this.province = data.find(a => a.id == this.motelprevous.provinceId);
        for (let i = 0; i < data.length; i++) {
          if(this.motelprevous.provinceId == data[i].id){

          }
          else{
            let province = new Province();
            province.id = data[i].id;
            province.name = data[i].name;
            this.provinces.push(province);
          }           
        }
      })*/
      const province = await this.provinceService.getProvincesByCity(Number(this.motelprevous.cityId)) as Province[];
      this.provinces.push(province.find(a => a.id == this.motelprevous.provinceId));
        this.province = province.find(a => a.id == this.motelprevous.provinceId);
        for (let i = 0; i < province.length; i++) {
          if(this.motelprevous.provinceId == province[i].id){

          }
          else{
            let province = new Province();
            province.id = province[i].id;
            province.name = province[i].name;
            this.provinces.push(province);
          }           
        }

      /*this.dictrictService.getDistrictByProvince(Number(this.motelprevous.provinceId)).subscribe((data) => {
        this.districts.push(data.find(a => a.id == this.motelprevous.districtId));
        this.district = data.find(a => a.id == this.motelprevous.districtId);
        for (let i = 0; i < data.length; i++) {
          if(this.motelprevous.districtId == data[i].id){

          }
          else{
            let district = new District();
            district.id = data[i].id;
            district.name = data[i].name;
            this.districts.push(district);
          }           
        }
      })*/
      const district = await this.dictrictService.getDistrictByProvince(Number(this.motelprevous.provinceId)) as District[];
      this.districts.push(district.find(a => a.id == this.motelprevous.districtId));
        this.district = district.find(a => a.id == this.motelprevous.districtId);
        for (let i = 0; i < district.length; i++) {
          if(this.motelprevous.districtId == district[i].id){

          }
          else{
            let district = new District();
            district.id = district[i].id;
            district.name = district[i].name;
            this.districts.push(district);
          }           
        }

      if(this.motelprevous.streetId == "0"){

      }
      else{
        /*this.streetService.getStreetByProvince(Number(this.motelprevous.provinceId)).subscribe((data) => {
          this.streets.push(data.find(a => a.id == this.motelprevous.streetId));
          this.street = data.find(a => a.id == this.motelprevous.streetId);
          for (let i = 0; i < data.length; i++) {
            if(this.motelprevous.streetId == data[i].id){
  
            }
            else{
              let street = new Street();
              street.id = data[i].id;
              street.name = data[i].name;
              this.streets.push(street);
            }           
          }
        })*/
        const street = await this.streetService.getStreetByProvince(Number(this.motelprevous.provinceId)) as Street[];
        this.streets.push(street.find(a => a.id == this.motelprevous.streetId));
          this.street = street.find(a => a.id == this.motelprevous.streetId);
          for (let i = 0; i < street.length; i++) {
            if(this.motelprevous.streetId == street[i].id){
  
            }
            else{
              let street = new Street();
              street.id = street[i].id;
              street.name = street[i].name;
              this.streets.push(street);
            }           
          }
      }

    }
    else{
      this.getCities();
    }
  }

  public async returnCity(){
    const result = await this.cityService.getCitys() as City[];
      this.cities.push(result.find(a => a.id == this.motelprevous.cityId));
        this.city = result.find(a => a.id == this.motelprevous.cityId);
        for(let i=1;i< result.length;i++){           
          if(this.motelprevous.cityId == result[i].id){          
          }
          else{
            this.cities.push(result[i]);
          }
        }
  }
  public onClickTypeMotelButton() {
    this.typeMotel = "Thuê"
    this.isWarning = false;

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
    /*const list = this.streetService.getStreetByProvince(Number(ID)).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        let street = new Street();
        street.id = data[i].id;
        street.name = data[i].name;
        this.streets.push(street);
      }
      this.street = data[0]
      console.log(data)
  })*/
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
        /*const list = this.provinceService.getProvincesByCity(Number(ID)).subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
            let province = new Province();
            province.id = data[i].id;
            province.name = data[i].name;
            this.provinces.push(province);
          }
          this.province = data[0]
          this.getDistricteById(data[0].id)
          this.getStreetById(data[0].id)
      })*/
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
        /*const list = this.dictrictService.getDistrictByProvince(Number(ID)).subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
            let district = new District();
            district.id = data[i].id;
            district.name = data[i].name;
            this.districts.push(district);
          }
          this.district = data[0];
      })*/
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

      localStorage.setItem('StorageService.motelStorage', JSON.stringify(motel));
      this.router.navigateByUrl('/user/thong-tin-nha-tro');
    }
    else{
      this.openDialog();
    }
    
  }

  public prevous(){
    this.router.navigateByUrl('/user/danh-muc');
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
