import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CitiesService } from '../services/cities.service'
import { City } from '../model/City';
import { NewType } from '../model/NewType';
import { Province } from '../model/Province';
import { Motel } from '../model/Motel';
import { ProvincesService } from '../services/provinces.service'
import { TypeofnewService } from '../services/newstype.service'
import { MotelService } from '../services/motel.service'
import { PriceSearchService } from '../services/price-search.service'
import { Router } from '@angular/router';
import { List } from '../model/viewmodel/ListViewModel';
import { RemoveVietnameseTones } from '../removeVietnameseTones.service';
import { PriceSearch } from '../model/PriceSearch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { StreetService } from '../services/street.service';
import { DictrictService } from '../services/dictrict.service';
import { District } from '../model/District';
import { Street } from '../model/Street';
import { ViewportScroller } from '@angular/common';
import { CountNewTypeViewModel } from '../model/CountNewTypeViewModel';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  counttypes: CountNewTypeViewModel[] = []; // mảng các loại nhà trọ
  // Danh sách city và tên city
  cities: City [] = [];
  city  = new City();
  // Danh sách province và tên province
  provinces: Province [] = [];
  province = new Province();
  // Danh sách type và tên type
  newTypes: NewType [] = [];
  newType:string;
  // Danh sách pricesearch và tên pricesearch
  priceSearchs: PriceSearch [] = [];
  priceSearch;
  // Danh sách pricesearch và tên pricesearch
  motelhighlights: Motel[] = [];
  motelnews: Motel[] = [];

  searchText = "";
  check = false;
  myControl = new FormControl();
  options: List[] = [];
  filteredOptions: Observable<List[]>;

  constructor(private priceSearchServer:PriceSearchService,
    private http: HttpClient,private router: Router,private motelService: MotelService,
    private cityService: CitiesService, private provinceService: ProvincesService, 
    private typeservice:TypeofnewService,public streetService:StreetService,public dictrictService:DictrictService,
    viewportScroller: ViewportScroller) { 
      
  }

  async ngOnInit(){
    await this.getCountTypes();

    this.getPrices();
    this.getNewTypes();
    this.getCitys();
    
    this.getHighlightsMotel();
    this.getNewsMotel();
    await this.enterSearch();   
    this.city.name = "Toàn quốc";
    this.province.name = "Tỉnh thành";
    this.priceSearch = "Chọn mức giá";
    this.newType = "Phòng trọ, nhà trọ";

    
  }

  /*sendEmail() {
    let email = new Email();
    email.name = this.name;
    email.subject = this.subject;
    email.text = this.text;
    console.log(email);
    this.motelService.postEmail(email).subscribe(email => this.emailsend == email);
  }*/
  async getCountTypes(){
    const result = await this.typeservice.getCountTypes() as any;
    for(let i = 1;i< result.length; i++){
      this.counttypes.push(result[i])
    }
  }

  linkRouter(name, id) {
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
    if(priceSearch.typePriceOne == null){
      this.priceSearch = priceSearch.numberOne  + " - " + priceSearch.numberTwo + " " + priceSearch.typePriceTwo;
    }
    else{
      this.priceSearch = priceSearch.numberOne + " " + priceSearch.typePriceOne  + " - " + priceSearch.numberTwo + " " + priceSearch.typePriceTwo;
    }
    //localStorage.setItem('priceid', priceSearch.id.toString());
  }

  public async getProvinces(){
    if(this.city.name == ""){
      alert("Chọn thành phố trước");
    }
    else{
        var id = this.cities.find(m => m.name == this.city.name);
        this.provinces = await this.provinceService.getProvincesByCity(Number(id.id)) as Province[];     
        //this.provinceService.getProvincesByCity(Number(id.id)).subscribe( data => this.provinces = data)
    }
  }

  public onClickSeeMoreHCM(){
    var name = "Ho-Chi-Minh"
    this.router.navigate( ['/area',name]);
  }

  public onClickSeeMoreHN(){
    var name = "Ha-Noi"
    this.router.navigate( ['/area',name]);
  }

  public async getCitys(){
    var data = await this.cityService.getCitys() as City[];
    data.splice(0,1);
    this.cities = data.slice();
  }

  public async getPrices(){
    /*this.priceSearchServer.getprices().subscribe(getprice =>{
      this.priceSearchs = getprice
    })*/
    this.priceSearchs = await this.priceSearchServer.getprices() as PriceSearch[];
  }

  public async getNewTypes(){
    this.newTypes = await this.typeservice.getTypeExcepts() as NewType[];
  }

  public async getHighlightsMotel () {
    this.motelhighlights = await this.motelService.getHighlightsMotels() as Motel[];
  }

  linkRoute(link){
    // console.log(link)
    this.router.navigate( [link]);
  }

  onChoceTypes(types: NewType){
    var type = '/' + RemoveVietnameseTones.removeVietnameseTones(types.name);
    var link = '/home' + type;
    this.linkRoute(link);
  }

  onChocePrices(priceSearch: PriceSearch){
    if(priceSearch.typePriceOne == null){
      this.priceSearch = priceSearch.numberOne  + " - " + priceSearch.numberTwo + " " + priceSearch.typePriceTwo;
    }
    else{
      this.priceSearch = priceSearch.numberOne + " " + priceSearch.typePriceOne  + " - " + priceSearch.numberTwo + " " + priceSearch.typePriceTwo;
    }
    var price = '/' + RemoveVietnameseTones.removeVietnameseTones(this.priceSearch.replace("-", " "));
    var type = '/' + RemoveVietnameseTones.removeVietnameseTones(this.newType);
    var link = '/home' + price + type;
    this.linkRoute(link);
  }

  public async getMotelSearch () {

    const districts = await this.dictrictService.getDistricts() as District[];
    const streets = await this.streetService.getStreets() as Street[]
    var city = "", province = "", district = "", street = "", price = "", direct = "", area = "";
    if(this.city.name == "Toàn quốc"){
      city = "";
    }
    else{
      city = '/' + RemoveVietnameseTones.removeVietnameseTones(this.city.name);
    }
    if(this.province.name == "Tỉnh thành"){
      province = "";
    }
    else{
      province = '/' + RemoveVietnameseTones.removeVietnameseTones(this.province.name);
    }

    if(this.priceSearch == "Chọn mức giá"){
      price = "";
    }
    else{
      price = '/' + RemoveVietnameseTones.removeVietnameseTones(this.priceSearch.replace("-", " "));
    }
    
    if(this.searchText != ""){
      let str = this.searchText.toString().split(", ");
      if(str.length == 1){
        city = RemoveVietnameseTones.removeVietnameseTones(str[0]);
      }
      else if(str.length == 2){
        city = RemoveVietnameseTones.removeVietnameseTones(str[1]);
        province = '/' + RemoveVietnameseTones.removeVietnameseTones(str[0]);
      }
      else {
        city = RemoveVietnameseTones.removeVietnameseTones(str[2]);
        province = '/' + RemoveVietnameseTones.removeVietnameseTones(str[1]);
        var indexDistrict: Number = 0;
        var indexStreet: number = 0;
        streets.forEach(a => {
          if(RemoveVietnameseTones.removeVietnameseTones(a.name) === str[0]){
            indexStreet = Number(a.id);
          }
        }); 
        districts.forEach(a => {
          if(RemoveVietnameseTones.removeVietnameseTones(a.name) == str[0]){
            indexDistrict = Number(a.id);
          }
        }); 
        if(indexDistrict != 0){
          district = '/' + RemoveVietnameseTones.removeVietnameseTones(str[0]);
        }
        else{
          street = '/' + RemoveVietnameseTones.removeVietnameseTones(str[0]);
        }
      }
    }
    var type = '/' + RemoveVietnameseTones.removeVietnameseTones(this.newType);
    var link = '/home' + city + province + district + street + price  + type + direct + area;
    // console.log(link)
    // this.router.navigate( [link]);
    this.linkRoute(link);

  }

  public async getNewsMotel () {
    this.motelnews = await this.motelService.getNowsMotels() as Motel[];
  }

  async enterSearch(){
    this.options = await this.cityService.getSearchs() as List[];
    if(this.options.length){
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice(0,6))
      );
      if(this.check == true){
        this.filteredOptions.subscribe((data)=>{
          if(data.length != 0){
            this.searchText = data[0].name;
          }
          else{
            this.searchText = "";
          }
        })
      }

    }
  }
  
  private _filter(name: string): List[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0).slice(0,6);
  }

  displayFn(list: List): string {
    return list && list.name ? list.name : '';
  }

  onKeyUp(x) { // appending the updated value to the variable
    this.check = true;
  }
}
