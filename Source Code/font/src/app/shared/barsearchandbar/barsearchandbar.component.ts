import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CitiesService } from '../../services/cities.service'
import { City } from '../../model/City';
import { NewType } from '../../model/NewType';
import { Province } from '../../model/Province';
import { Motel } from '../../model/Motel';
import { ProvincesService } from '../../services/provinces.service'
import { BehaviorSubjectClass } from '../../services/behaviorsubject'
import { TypeofnewService } from '../../services/newstype.service'
import { MotelService } from '../../services/motel.service'
import { Router,ActivatedRoute } from '@angular/router';
import { Detail } from 'src/app/model/Detail';
import { PriceSearch } from 'src/app/model/PriceSearch';
import { PriceSearchService } from 'src/app/services/price-search.service';
import { Location, PopStateEvent } from '@angular/common';
import { StreetService } from 'src/app/services/street.service';
import { DictrictService } from 'src/app/services/dictrict.service';
import { District } from 'src/app/model/District';
import { Street } from 'src/app/model/Street';
import { FormControl } from '@angular/forms';
import { List } from 'src/app/model/viewmodel/ListViewModel';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RemoveVietnameseTones } from 'src/app/removeVietnameseTones.service';

@Component({
  selector: 'app-barsearchandbar',
  templateUrl: './barsearchandbar.component.html',
  styleUrls: ['./barsearchandbar.component.css']
})
export class BarsearchandbarComponent implements OnInit {

  // Danh sách city và tên city
  cities = new Array<City>();
  city= new City;
  // Danh sách province và tên province
  provinces = new Array<Province>();
  province = new Province;
  // Danh sách district và tên district
  districts = new Array<District>();
  district = new District;
  // Danh sách street và tên street
  streets = new Array<Street>();
  street = new Street;
  // Danh sách province và tên province
  newTypes = new Array<NewType>();
  newType = "";
  // Danh sách pricesearch và tên pricesearch
  priceSearchs: PriceSearch[] = [];
  priceSearch;
  
  //load tên trên thanh tophead
  nametophead;
  name;
  
  myControl = new FormControl();
  options: List[] = [];
  filteredOptions: Observable<List[]>;
  search:string = "";

  @Output() newTypeSearch: EventEmitter<string> = new EventEmitter<string>();
  constructor(public streetService:StreetService,public dictrictService:DictrictService,public location: Location,private priceSearchServer:PriceSearchService,private router:ActivatedRoute,private route: Router,public activerouter:ActivatedRoute,private motelService: MotelService,private cityService: CitiesService, private provinceService: ProvincesService, private typeservice:TypeofnewService) {
    this.getPrices();
    this.getCities();
    this.getNewTypes();

  }

  ngOnInit(): void {
    try{
      var link = this.route.url.toString().split("/");
      if(link[2] == "chi-tiet"){

      }
      else{
        this.setData();
        this.firstTime();
        this.enterSearch();
      }

    }
    catch(err){

    }

    

/*
    if(Number(localStorage.getItem('priceid')) == 0){
      this.priceSearch.number = "Tất cả";
    }

    if(Number(localStorage.getItem('priceid')) == 1){
      this.priceSearch.number = "Dưới 1 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 2){
      this.priceSearch.number = "1 triệu - 2 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 3){
      this.priceSearch.number = "2 triệu - 3 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 4){
      this.priceSearch.number = "3 triệu - 5 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 5){
      this.priceSearch.number = "5 triệu - 7 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 6){
      this.priceSearch.number = "7 triệu - 10 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 7){
      this.priceSearch.number = "7 triệu - 10 triệu";
    }
    if(Number(localStorage.getItem('priceid')) == 8){
      this.priceSearch.number = "10 triệu - 15 triệu";
    }*/
    
    /*this.activerouter.data.subscribe(data => {
      this.name = data.kind;
    })
    if(this.name == "cho-thue-nha-tro"){
      this.nametophead = "Cho thuê phòng trọ, nhà trọ số 1 Việt Nam";
      this.newType = "Phòng trọ, nhà trọ"
    }
    if(this.name == "nha-cho-thue"){
      this.nametophead = "Cho Thuê Nhà Nguyên Căn, Giá Rẻ, Chính Chủ, Mới Nhất 2020";
      this.newType = "Nhà thuê nguyên căn"

    }
    if(this.name == "cho-thue-can-ho"){
      this.nametophead = "Cho Thuê Căn Hộ Chung Cư Mini, Căn Hộ Dịch Vụ, Giá Rẻ - Mới Nhất 2020";
      this.newType = "Cho thuê căn hộ"

    }
    if(this.name == "cho-thue-mat-bang"){
      this.nametophead = "Cho Thuê Mặt Bằng, Cho Thuê Văn Phòng, Cửa Hàng, Kiot";

      this.newType = "Cho thuê mặt bằng"
    }
    if(this.name == "tim-nguoi-o-ghep-cap"){
      this.nametophead = "Tìm Người Ở Ghép, Tìm Nam Ở Ghép, Tìm Nữ Ở Ghép";
      this.newType = "Tìm người ở ghép"
    }*/
  }

 
  public firstTime(){
    var cities = new City();
    var provinces= new Province();
    var districts= new District();
    var streets= new Street();
    cities.id = "0"
    cities.name = "Tất cả"
    this.cities.push(cities)

    provinces.id = "0"
    provinces.name = "Tất cả"
    this.provinces.push(provinces)

    districts.id = "0"
    districts.name = "Tất cả"
    this.districts.push(districts)

    streets.id = "0"
    streets.name = "Tất cả"
    this.streets.push(streets)

    this.city.name = "Tỉnh thành phố";
    this.city.id = "0";
    this.province.name = "Quận Huyện";
    this.province.id = "0";
    this.district.name = "Phường Xã";
    this.district.id = "0";
    this.street.name = "Đường Phố";
    this.street.id = "0";
    this.newType = "Phòng trọ, nhà trọ";
    this.priceSearch = "Tất cả";
    
    //this.priceSearch.number = "Giá thuê"
    
    /*if(localStorage.getItem('city') != null && localStorage.getItem('city') != "Tất cả"){
      
      /*this.cityService.getCityFromId(Number(localStorage.getItem('city'))).subscribe(data => {
        this.city = data;
        if(data.name == ""){
          this.city.name = "Tất cả"
        }
        this.getCities();
      })
      
    }
    if( localStorage.getItem('province') != null && localStorage.getItem('province') != "Tất cả"){
      /*this.provinceService.getProvinceById(Number(localStorage.getItem('province'))).subscribe(data => {
        this.province = data;
        if(data.name == ""){
          this.province.name = "Tất cả"
        }
        this.getProvinceByID(localStorage.getItem('city'))
      })
    }
    if(localStorage.getItem('street') != null && localStorage.getItem('street') != "Tất cả"){
      /*this.streetService.getStreetFromId(Number(localStorage.getItem('street'))).subscribe(data => {
        this.street = data;
        if(data.name == ""){
          this.street.name = "Tất cả"
        }
        this.getStreetById(localStorage.getItem('province'))
      })
    }
    if(localStorage.getItem('district') != null && localStorage.getItem('district') != "Tất cả"){
      /*this.dictrictService.getDistrictFromId(Number(localStorage.getItem('district'))).subscribe(data => {
        this.district = data;
        if(data.name == ""){
          this.district.name = "Tất cả"
        }
        this.getDistricteById(localStorage.getItem('province'))
      })
    }

    else{
      this.city.name = "Tỉnh thành phố";
      this.city.id = "0";
      this.province.name = "Quận Huyện";
      this.province.id = "0";
      this.district.name = "Phường Xã";
      this.district.id = "0";
      this.street.name = "Đường Phố";
      this.street.id = "0";
      this.newType = "Phòng trọ, nhà cho thuê"
      //this.priceSearch.number = "Giá thuê"
      this.priceSearch.id = 0;
    }*/

  }

  //:city/:province/:district/:street/:price/:type
  //:city/:province/:district/:street/:type
  //:city/:province/:district/:type
  //:city/:province/:type
  //:city/:type
  //:type
  async setData(){
    var city = this.router.snapshot.paramMap.get("city");
    var type = this.router.snapshot.paramMap.get("type");
    var province = this.router.snapshot.paramMap.get("province");
    var street = this.router.snapshot.paramMap.get("street");
    var price = this.router.snapshot.paramMap.get("price");
    var district = this.router.snapshot.paramMap.get("district");

    const types = await this.typeservice.getTypes() as NewType[];
    const cities = await this.cityService.getCitys() as City[];

    var indexType = types.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.name) === type)
    const result = types[indexType];
    this.newType = result.name;

    if(city != null){
      var indexCity = cities.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.name) === city); 
      if(indexCity == -1){
        price = city;
      }
      else{
        this.city = cities[indexCity];
        this.search = this.search + this.city.name;
      }
    }
    
    if(province != null){
      const idCity = cities[Number(indexCity)].id;
      var provinceByCityId = await this.provinceService.getProvincesByCity(Number(idCity)) as Province[];
      var indexProvince = provinceByCityId.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.name) === province); 
      if(indexProvince == -1){
        price = province;
      }
      else{
        this.province = provinceByCityId[indexProvince];
        this.search = this.search + this.province.name;
      }
    }
    if(district != null){
      const idProvince = provinceByCityId[Number(indexProvince)].id;
      var districtByCityId = await this.dictrictService.getDistrictByProvince(Number(idProvince)) as District[];
      var indexDistrict = districtByCityId.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.name) === district);
      if(indexDistrict == -1){
        price = district;
      }  
      else{
        this.district = districtByCityId[indexDistrict];
        this.search = this.search + this.district.name;
      }
    }
    if(street != null){
      const idProvince = provinceByCityId[Number(indexProvince)].id;
      var streetByCityId = await this.streetService.getStreetByProvince(Number(idProvince)) as Street[];
      var indexStreet = streetByCityId.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.name) === street);   
      if(indexStreet == -1){
        price = street;
      }     
      else{
        this.street = streetByCityId[indexStreet];
        this.search = this.search + this.street.name;
      }
    }
    if(price != null){//2-Trieu-3-Trieu
      const priceSearch = await this.priceSearchServer.getprices() as PriceSearch[];
      var str = price.replace("-","");
      str = str.replace("-", "");
      var indexPrice = priceSearch.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.numberOne + a.numberTwo + a.typePriceTwo) === str);

      if(indexPrice == -1){
        str = str.replace("-", "");
        indexPrice = priceSearch.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.numberOne + a.typePriceOne + a.numberTwo + a.typePriceTwo) === str);
      }
     
      this.priceSearch = this.returnDataPriceSearch(priceSearch.find(a => a.id == indexPrice+1));
    }

    this.getProvinceByID(this.city.id);
    this.getDistricteById(this.province .id)
    this.getStreetById(this.province.id);
  }


  public onChoiceCity(city:City) {
    this.city = city;
    if(city.name == "Tất cả"){
      this.province.name = "Tất cả"
      this.district.name = "Tất cả"
      this.districts = new Array<District>();
      this.street.name = "Tất cả"
      this.streets = new Array<Street>();
    }
    if(city.name != "Tất cả"){
      this.province.name = "Quận Huyện";
      this.district.name = "Phường Xã";
      this.street.name = "Đường Phố";
    }
    this.getProvinceByID(city.id);
  }

  public onChoiceProvince(province:Province) {
    this.province = province;
    if(province.name == "Tất cả"){
      this.district.name = "Phường Xã";
      this.street.name = "Đường Phố";
    }
    if(province.name != "Tất cả"){
      this.district.name = "Phường Xã";
      this.street.name = "Đường Phố";
    }
    this.getDistricteById(province.id)
    this.getStreetById(province.id);
  }

  public onChoiceDistrict(district:District) {
    this.district = district;
  }

  public onChoiceStreet(street:Street) {
    this.street = street;
  }

  public onChoiceNewtype(name) {
    this.newType = name;
  }

  public onChoicePriceSearch(priceSearch) {
    //this.priceSearch.number = price.number;
    if(priceSearch.typePriceOne == null){
      this.priceSearch = priceSearch.numberOne  + " - " + priceSearch.numberTwo + " " + priceSearch.typePriceTwo;
    }
    else{
      this.priceSearch = priceSearch.numberOne + " " + priceSearch.typePriceOne  + " - " + priceSearch.numberTwo + " " + priceSearch.typePriceTwo;
    }
  }
  
  returnDataPriceSearch(priceSearch){
    var returnData;
    if(priceSearch.typePriceOne == null){
      returnData = priceSearch.numberOne  + " - " + priceSearch.numberTwo + " " + priceSearch.typePriceTwo;
    }
    else{
      returnData = priceSearch.numberOne + " " + priceSearch.typePriceOne  + " - " + priceSearch.numberTwo + " " + priceSearch.typePriceTwo;
    }
    return returnData;
  }

  public async getStreetById(ID){
    this.streets = new Array<Street>();
        /*const list = this.streetService.getStreetByProvince(Number(ID)).subscribe((data) => {
          let street = new Street();
          var number = 0;
          street.id = number.toString();
          street.name = "Tất cả";
          this.streets.push(street);
          
          for (let i = 0; i < data.length; i++) {
            let street = new Street();
            street.id = data[i].id;
            street.name = data[i].name;
            this.streets.push(street);
          }
      })*/
      const list = await this.streetService.getStreetByProvince(Number(ID)) as Street[];
        let street = new Street();
        var number = 0;
        street.id = number.toString();
        street.name = "Tất cả";
        this.streets.push(street);
        
        for (let i = 0; i < list.length; i++) {
          let street = new Street();
          street.id = list[i].id;
          street.name = list[i].name;
          this.streets.push(street);
        }
  }

  public async getDistricteById(ID){
    const list = await this.dictrictService.getDistrictByProvince(Number(ID)) as District[];
      var districtNew : District [] = [];
      this.districts = districtNew;
      
      var districtZero = new District();
      var number = 0;
      districtZero.id = number.toString();
      districtZero.name = "Tất cả";
      districtZero.provinceid = number.toString();
      this.districts.push(districtZero);

      for (let i = 0; i < list.length; i++) {        
        this.districts.push(list[i]);
      }
        /*const list = this.dictrictService.getDistrictByProvince(Number(ID)).subscribe((data) => {
          var districtNew : District [] = [];
          this.districts = districtNew;
          
          var districtZero = new District();
          var number = 0;
          districtZero.id = number.toString();
          districtZero.name = "Tất cả";
          districtZero.provinceid = number.toString();
          this.districts.push(districtZero);

          for (let i = 0; i < data.length; i++) {        
            this.districts.push(data[i]);
          }

      })*/
  }

  public async getProvinceByID(ID){
      const result = await this.provinceService.getProvincesByCity(Number(ID)) as Province[];

      var provinceNew : Province[] = [];
      this.provinces = provinceNew;

      var provinceZero = new Province();
      var number = 0;
      provinceZero.id = number.toString();
      provinceZero.name = "Tất cả";
      provinceZero.cityid = number.toString();
      this.provinces.push(provinceZero);

      for(let i=0;i<result.length;i++){
        this.provinces.push(result[i])
      }

    /*this.provinceService.getProvincesByCity(Number(ID)).subscribe( data => {
      //this.provinces = data

      var provinceNew : Province[] = [];
      this.provinces = provinceNew;

      var provinceZero = new Province();
      var number = 0;
      provinceZero.id = number.toString();
      provinceZero.name = "Tất cả";
      provinceZero.cityid = number.toString();
      this.provinces.push(provinceZero);

      for(let i=0;i<data.length;i++){
        this.provinces.push(data[i])
      }
    })*/
  }

  public async getCities(){
    const result = await this.cityService.getCitys() as City[];
    var cityZero = new City();
    var number = 0;
    cityZero.id = number.toString();
    cityZero.name = "Tất cả";

    var cityNew : City[] = [];
    this.cities = cityNew;
    this.cities.push(cityZero)
    for(let i=1;i<result.length;i++){
      this.cities.push(result[i])
    }
  }


  public async getNewTypes(){
    this.newTypes = await this.typeservice.getTypeExcepts() as NewType[];
    //this.typeservice.getTypeExcepts().subscribe(gettypes => this.newTypes = gettypes)
  }

  public async getPrices(){
    const result = await this.priceSearchServer.getprices() as PriceSearch[];
    //this.priceSearchs = getprice
    var priceZero = new PriceSearch();
    priceZero.id = 0;
    priceZero.numberOne = "Tất cả";
    priceZero.numberTwo = "";
    priceZero.typePriceOne = "";
    priceZero.typePriceTwo = "";
    this.priceSearchs.push(priceZero);
     
    for(let i =0;i<result.length;i++){
      result[i].numberTwo = "- " + result[i].numberTwo;
      this.priceSearchs.push(result[i])
    }

    /*this.priceSearchServer.getprices().subscribe(getprice =>{
      //this.priceSearchs = getprice
      var priceZero = new PriceSearch();
      var number = 0;
      priceZero.id = 0;
      priceZero.number = "Tất cả";
      this.priceSearchs.push(priceZero);
     
      for(let i =0;i<getprice.length;i++){
        this.priceSearchs.push(getprice[i])
      }
    })*/
    
  }

  /*public onClick() {

    /*if(this.priceSearch.number == "Tất cả"){
      this.priceSearch.id = 0;
    }
    localStorage.setItem('priceid', this.priceSearch.id.toString());

    this.activerouter.data.subscribe(data => {
      this.name = data.kind;
    })

    this.newTypeSearch.emit(this.newType);
    if(this.newType === "Phòng trọ, nhà trọ" && this.name != "cho-thue-nha-tro"){
      //window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-nha-tro');
    }
    else if(this.newType === "Nhà thuê nguyên căn" && this.name != "nha-cho-thue"){
      //window.location.reload();
      this.router.navigateByUrl('/home/nha-cho-thue');
    }
    else if(this.newType === "Cho thuê căn hộ" && this.name != "cho-thue-can-ho"){
      //window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-can-ho');
    }
    else if(this.newType === "Tìm người ở ghép" && this.name != "tim-nguoi-o-ghep-cap"){
      //window.location.reload();
      this.router.navigateByUrl('/home/tim-nguoi-o-ghep-cap');
    }
    else if(this.newType === "Cho thuê mặt bằng" && this.name != "cho-thue-mat-bang"){
      //window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-mat-bang');
    }
    //////
    else if(this.name == "cho-thue-nha-tro"){
      window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-nha-tro');
    }
    else if(this.name == "nha-cho-thue"){
      window.location.reload();
      this.router.navigateByUrl('/home/nha-cho-thue');
    }
    else if(this.name == "cho-thue-can-ho"){
      window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-can-ho');
    }
    else if(this.name == "tim-nguoi-o-ghep-cap"){
      window.location.reload();
      this.router.navigateByUrl('/home/tim-nguoi-o-ghep-cap');
    }
    else if(this.name == "cho-thue-mat-bang"){
      window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-mat-bang');
    }
    //////
    else {
      //window.location.reload();
      this.router.navigateByUrl('/home/cho-thue-nha-tro');
    }
  }*/


  public async enterSearch(){
    this.options = await this.cityService.getSearchs() as List[];
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice(0,7))
      );
  }

  private _filter(name: string): List[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0).slice(0,7);
  }

  displayFn(list: List): string {
    return list && list.name ? list.name : '';
  }

  async onSearch(){
    const districts = await this.dictrictService.getDistricts() as District[];
    const streets = await this.streetService.getStreets() as Street[]
    var city = "", province = "", district = "", street = "", price = "";
    if(this.city.name == "Tỉnh thành phố" || this.city.name == "Tất cả"){
      city = "";
    }
    else{
      city = RemoveVietnameseTones.removeVietnameseTones(this.city.name);
    }
    if(this.province.name == "Quận Huyện" || this.province.name == "Tất cả"){
      province = "";
    }
    else{
      province = '/' + RemoveVietnameseTones.removeVietnameseTones(this.province.name);
    }
    if(this.district.name == "Phường Xã" || this.district.name == "Tất cả"){
      district = "";
    }
    else{
      district = '/' + RemoveVietnameseTones.removeVietnameseTones(this.district.name);
    }
    if(this.street.name == "Đường Phố" || this.street.name == "Tất cả"){
      street = "";
    }
    else{
      street = '/' + RemoveVietnameseTones.removeVietnameseTones(this.street.name);
    }

    if(this.priceSearch == "Chọn mức giá" || this.priceSearch == "Tất cả"){
      price = "";
    }
    else{
      price = RemoveVietnameseTones.removeVietnameseTones(this.priceSearch.replace("-", " "));
    }

    if(this.myControl.value){
      let str = this.myControl.value.name.toString().split(", ");
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

    if(this.newType == "Tất cả"){
      const result = await this.typeservice.getTypes() as NewType[];
      console.log(result)
      this.newType = result[1].name;
    }
    var link = '/home' + '/' + city + province + district + street + '/' + price  + '/' + RemoveVietnameseTones.removeVietnameseTones(this.newType);
    
    //this.route.navigate( [link]);
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([link]);
      
    }); 
  }
}
