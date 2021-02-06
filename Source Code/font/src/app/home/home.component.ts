import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CitiesService } from '../services/cities.service'
import { City } from '../model/City';
import { NewType } from '../model/NewType';
import { Province } from '../model/Province';
import { Motel } from '../model/Motel';
import { ProvincesService } from '../services/provinces.service'
import { TypeofnewService } from '../services/newstype.service'
import { MotelService } from '../services/motel.service'
import { BehaviorSubjectClass } from '../services/behaviorsubject'
import { PriceSearchService } from '../services/price-search.service'
import { Router } from '@angular/router';
import { Detail } from '../model/Detail';

import { PriceSearch } from '../model/PriceSearch';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // Danh sách city và tên city
  cities: City [] = [];
  city  = new City();
  cityid;
  // Danh sách province và tên province
  provinces: Province [] = [];
  province = new Province();
  provinceid;
  // Danh sách type và tên type
  newTypes: NewType [] = [];
  newType:string;
  // Danh sách pricesearch và tên pricesearch
  priceSearchs: PriceSearch [] = [];
  priceSearch;
  // Danh sách pricesearch và tên pricesearch
  motelhighlights: Motel[] = [];
  motelnews: Motel[] = [];

  searchtext;

  ngModelcity;
  constructor(private priceSearchServer:PriceSearchService,private http: HttpClient,private router: Router,private behaviorSubjectClass:BehaviorSubjectClass,private motelService: MotelService,private cityService: CitiesService, private provinceService: ProvincesService, private typeservice:TypeofnewService) { 

  }

  ngOnInit(){
    localStorage.removeItem('city');
    localStorage.removeItem('province');
    localStorage.removeItem('district');
    localStorage.removeItem('street');
    localStorage.removeItem('searchtext');
    localStorage.removeItem('priceid');

    this.getPrices();
    this.getNewTypes();
    this.getCitys();
    
    this.getHighlightsMotel();
    this.getNewsMotel();

    this.city.name = "Toàn quốc";
    this.province.name = "Tỉnh thành";
    this.priceSearch = "Chọn mức giá";
    this.newType = "Phòng trọ, nhà cho thuê"
  }

  /*sendEmail() {
    let email = new Email();
    email.name = this.name;
    email.subject = this.subject;
    email.text = this.text;
    console.log(email);
    this.motelService.postEmail(email).subscribe(email => this.emailsend == email);
  }*/

  public linkRouter(name, id) {
    //this.router.navigate( [{name: name, id: id}]);
    this.router.navigate( ['/home/chi-tiet',name,id]);
  }

  public onClickCity (city: City)  {
    this.city = city;
    this.province.name = "Tỉnh thành";
    this.getProvinces();
  }

  public onClickProvince (province:Province)  {
    this.province = province;

  }

  public onClickNewType (event) {
    let value = event.target.value;
    var type = this.newTypes.find(a => a.id == value);
    this.newType = type.name;
  }

  public onClickPrice (priceSearch: PriceSearch)  {
    this.priceSearch = priceSearch.number;
    localStorage.setItem('priceid', priceSearch.id.toString());
  }

  public getProvinces(){
    if(this.city.name == ""){
      alert("Chọn thành phố trước");
    }
    else{
        var id = this.cities.find(m => m.name == this.city.name);
        console.log(id)
        this.provinceService.getProvincesByCity(Number(id.id)).subscribe( data => this.provinces = data)
    }
  }

  public onClickSeeMoreHCM(){
    var name = "TP HCM"
    this.router.navigate( ['/home/area',name]);
  }

  public onClickSeeMoreHN(){
    var name = "Hà Nội"
    this.router.navigate( ['/home/area',name]);
  }

  public getCitys(){
    this.cityService.getCitys().subscribe(getcity => {
      for(let i=1;i<getcity.length;i++){
        this.cities.push(getcity[i])
      }
    })
  }

  public getPrices(){
    this.priceSearchServer.getprices().subscribe(getprice =>{
      this.priceSearchs = getprice
    })
    
  }

  public getNewTypes(){
    this.typeservice.getTypeExcepts().subscribe(gettypes => {
      this.newTypes = gettypes;
    })

  }

  public getHighlightsMotel () {
    this.motelService.getHighlightsMotels().subscribe(gettypes => {
      this.motelhighlights = gettypes
    })
  }

  public getMotelSearch () {
    localStorage.setItem('city', this.city.id);
    localStorage.setItem('province', this.province.id);
    if(this.searchtext == undefined){
      localStorage.setItem('searchtext', "NULL");
    }
    else{
      localStorage.setItem('searchtext', this.searchtext);
    }

    this.routerNewType();
  }

  public routerNewType(){
    if(this.newType === "Phòng trọ, nhà trọ"){
      this.router.navigateByUrl('/home/cho-thue-nha-tro');
    }
    else if(this.newType === "Nhà thuê nguyên căn"){
      this.router.navigateByUrl('/home/nha-cho-thue');
    }
    else if(this.newType === "Cho thuê căn hộ"){
      this.router.navigateByUrl('/home/cho-thue-can-ho');
    }
    else if(this.newType === "Tìm người ở ghép"){
      this.router.navigateByUrl('/home/tim-nguoi-o-ghep-cap');
    }
    else if(this.newType === "Cho thuê mặt bằng"){
      this.router.navigateByUrl('/home/cho-thue-mat-bang');
    }
    else {
      this.router.navigateByUrl('/home/cho-thue-nha-tro');
    }
  }

  public getNewsMotel () {
    this.motelService.getNowsMotels().subscribe(gettypes => {
      this.motelnews = gettypes;
    });

  }

}
