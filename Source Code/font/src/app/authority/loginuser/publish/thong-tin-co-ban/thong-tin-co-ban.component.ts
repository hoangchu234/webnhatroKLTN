import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Province } from '../../../../model/Province';
import { City } from '../../../../model/City';
import { Account } from '../../../../model/Account';
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

  currentAccount:Account;
  constructor(public streetService:StreetService,public dictrictService:DictrictService,private authenticationService: AuthenticationService,public dialog: MatDialog,private behaviorSubjectClass: BehaviorSubjectClass,private router: Router,private cityService: CitiesService, private provinceService: ProvincesService,public motelService:MotelService) {
    this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);    
    this.motelprevous = JSON.parse(localStorage.getItem('PublishMotel'));
    if(this.motelprevous){
      this.phoneMotel = this.motelprevous.phone;
      this.addressMotel = this.motelprevous.address;

      this.cityService.getCitys().subscribe(getcity => {
        this.cities.push(getcity.find(a => a.id == this.motelprevous.cityId));
        this.city = getcity.find(a => a.id == this.motelprevous.cityId);
        for(let i=1;i< getcity.length;i++){           
          if(this.motelprevous.cityId == getcity[i].id){          
          }
          else{
            this.cities.push(getcity[i]);
          }
        }
        

      })

      this.provinceService.getProvincesByCity(Number(this.motelprevous.cityId)).subscribe((data) => {
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
      })

      this.dictrictService.getDistrictByProvince(Number(this.motelprevous.provinceId)).subscribe((data) => {
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
      })

      if(this.motelprevous.streetId == "0"){

      }
      else{
        this.streetService.getStreetByProvince(Number(this.motelprevous.provinceId)).subscribe((data) => {
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
        })
      }

    }
    else{
      this.getCities();
    }
  }

  ngOnInit(): void {
    this.phoneMotel = localStorage.getItem("phone");
    this.typeMotel = "Thuê";
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

  public getStreetById(ID){
    var streetNew : Street [] = [];
    this.streets = streetNew;
    const list = this.streetService.getStreetByProvince(Number(ID)).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        let street = new Street();
        street.id = data[i].id;
        street.name = data[i].name;
        this.streets.push(street);
      }
      this.street = data[0]
      console.log(data)
  })
  }

  public getProvinceById(ID){
    var provinceNew : Province [] = [];
    this.provinces = provinceNew;
        const list = this.provinceService.getProvincesByCity(Number(ID)).subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
            let province = new Province();
            province.id = data[i].id;
            province.name = data[i].name;
            this.provinces.push(province);
          }
          this.province = data[0]
          this.getDistricteById(data[0].id)
          this.getStreetById(data[0].id)
      })
  }

  public getDistricteById(ID){
    var districtNew : District [] = [];
    this.districts = districtNew;
        const list = this.dictrictService.getDistrictByProvince(Number(ID)).subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
            let district = new District();
            district.id = data[i].id;
            district.name = data[i].name;
            this.districts.push(district);
          }
          this.district = data[0];
      })
  }

  public getCities(){
    this.cityService.getCitys().subscribe(getcity => {
      for(let i=1;i<getcity.length;i++){
        this.cities.push(getcity[i]);
      }
      this.city = getcity[1]
      this.getProvinceById(getcity[1].id)
    })
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

      localStorage.setItem('PublishMotel', JSON.stringify(motel));
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
