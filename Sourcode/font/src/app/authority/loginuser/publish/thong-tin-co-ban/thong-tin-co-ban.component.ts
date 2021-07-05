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
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-thong-tin-co-ban',
  templateUrl: './thong-tin-co-ban.component.html',
  styleUrls: ['./thong-tin-co-ban.component.css']
})
export class ThongTinCoBanComponent implements OnInit {

  typeMotel: string;
  addressMotel: string = "";
  addressNumber: string = ""

  cities: City [] = [];
  city: City = {id:"", name:""};

  provinces : Province [] = [];
  province: Province = {id:"", name:"",cityid:"", city:null};

  districts :District [] = [];
  district:District= {id:"", name:"",provinceId:"", province:null};

  streets: Street [] = [];
  street:Street= {id:"", name:"",provinceId:"", province:null};

  newTypes: Array<NewType>= [];
  newType: NewType = {id:"", name:"", details:null};
  
  phoneMotel;

  motelprevous:Motel;
  checkFirstTime = true;
  isWarning = false;

  check = false;
  //currentAccount:Account;

  long = "";
  lat = "";
  prevous = false;

  constructor(private toast: ToastService, public typeservice:TypeofnewService,public streetService:StreetService,public dictrictService:DictrictService,private authenticationService: AuthenticationService,public dialog: MatDialog,private router: Router,private cityService: CitiesService, private provinceService: ProvincesService,public motelService:MotelService) {
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);    
    if(JSON.parse(localStorage.getItem(StorageService.motelStorage))){
      this.motelprevous = JSON.parse(localStorage.getItem(StorageService.motelStorage));
      this.check = true;
    }

    this.getNewTypes();

  }

  async ngOnInit(): Promise<void> {
    this.phoneMotel = this.authenticationService.currentAccountValue.phone;
    this.typeMotel = "Thuê";

    if(this.motelprevous){
      await this.privous();
      this.changeAddress(this.addressNumber);
    }
    else{
      await this.getCities();
      this.changeAddress(this.addressNumber)
    }
  }

  changeAddress(x){
    this.addressMotel = x + " " + this.street.name + " " + this.district.name + " " + this.province.name + " " + this.city.name;
  }

  async privous(){
    this.prevous = true;
    this.phoneMotel = this.motelprevous.phone;
    this.addressNumber = this.motelprevous.address;

    this.lat = this.motelprevous.latitude;
    this.long = this.motelprevous.longitude;

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

  public async onChangeCity(event)
  {
    let value = event.target.value;
    var cityFind = this.cities.find(m => m.id == value);
    this.city = cityFind;
    await this.getProvinceById(cityFind.id);
    this.changeAddress(this.addressNumber);
  }

  public async onChangeProvince(event)
  {
    let value = event.target.value;
    var provinceFind = this.provinces.find(m => m.id == value);
    this.province = provinceFind;
    await this.getStreetById(provinceFind.id);
    await this.getDistricteById(provinceFind.id);
    this.changeAddress(this.addressNumber);
  }

  public onChangeDistrict(event){
    let value = event.target.value;
    if(value){    
      var districtFind = this.districts.find(m => m.id == value);
      this.district = districtFind;
      this.changeAddress(this.addressNumber);
    }
    else{

    }
  }

  public onChangeStreet(event){
    let value = event.target.value;
    var streetFind = this.streets.find(m => m.id == value);
    this.street = streetFind;
    this.changeAddress(this.addressNumber);
  }

  saverange(newValue) {
    this.changeAddress(newValue);
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
      await this.getDistricteById(list[0].id)
      await this.getStreetById(list[0].id)
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
    await this.getProvinceById(result[1].id)
  }

  public async step2(){
    let motel = new Motel(); 

    if( this.typeMotel && this.city.id && this.province.id && this.addressMotel && this.phoneMotel){

      if(this.prevous == false){
        await this.getViTri(this.addressMotel);
      }

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
      
      motel.addressNumber = this.addressNumber;
      motel.address = this.addressMotel;

      motel.phone = this.phoneMotel;

      if(this.lat == "" || this.long == ""){
        this.toast.toastInfo('Không tìm thấy địa chỉ này bạn vui lòng nhập lại');
      }
      else{
        motel.latitude = this.lat;
        motel.longitude = this.long;

        localStorage.setItem(StorageService.motelStorage, JSON.stringify(motel));
        // this.behaviorSubjectClass.setNewTypes(this.newType);
        localStorage.setItem(StorageService.TypeMotelStorage, JSON.stringify(this.newType))
        this.router.navigateByUrl('/user/thong-tin-nha-tro');
      }
    }
    else{
      this.toast.toastInfo('Xin hãy nhập đủ thông tin');
    }
  }


  public step3(){
    if(this.check == true){
      var data = this.motelprevous.detail;
      if(data != undefined){
        this.router.navigateByUrl('/user/thong-tin-chi-tiet-nha-tro');
      }
    }
    
  }
  public step4(){
    if(this.check == true){
      var data = this.motelprevous;
      if(data != undefined){
        this.router.navigateByUrl('/user/thong-tin-hinh-anh');
      }
    }
  }

  public step5(){
    if(this.check == true){
      var data = localStorage.getItem(StorageService.ImageStorage);;
      if(data != undefined){
        this.router.navigateByUrl('/user/goi-thanh-toan');
      }
    }
  }

  public step6(){
    if(this.check == true){
      var data = this.motelprevous.bill;
      if(data != undefined){
        this.router.navigateByUrl('/user/thanh-toan-dong');
      }
    }
  }

  async getViTri(address: string){
    var get = await this.motelService.getLocation(address);
    this.lat = get["data"]["features"][0]["geometry"]["coordinates"][0];
    this.long = get["data"]["features"][0]["geometry"]["coordinates"][1];
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
