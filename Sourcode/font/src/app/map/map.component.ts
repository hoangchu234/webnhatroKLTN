import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../model/City';
import { Distance } from '../model/Distance';
import { District } from '../model/District';
import { Motel } from '../model/Motel';
import { NewType } from '../model/NewType';
import { PriceSearch } from '../model/PriceSearch';
import { Province } from '../model/Province';
import { Street } from '../model/Street';
import { RemoveVietnameseTones } from '../removeVietnameseTones.service';
import { CitiesService } from '../services/cities.service';
import { DictrictService } from '../services/dictrict.service';
import { MotelService } from '../services/motel.service';
import { TypeofnewService } from '../services/newstype.service';
import { PriceSearchService } from '../services/price-search.service';
import { ProvincesService } from '../services/provinces.service';
import { StreetService } from '../services/street.service';

declare const L: any;

export interface Type{
  id:number;
  text:string;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  public news:Array<Type> = [
    {id: 0, text:'Tin Hot'}, // 4 tuần, 2 tuần
    {id: 1, text:'Tin VIP 1'}, // 
    {id: 2, text:'Tin VIP 2'},
    {id: 3, text:'Tin VIP 3'},
    {id: 4, text:'Tin thường'},
  ];

  title = 'locationApp';

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
  priceSearch = "";

  distances: Distance[] = [];
  distance = "";

  search = "";

  long = 106.66449163903896;
  lat = 10.802034899283724;
  name = "Công viên hoàng văn thụ";

  motelsearch: Motel[] = [];
  motels:Motel[] = [];
  
  //Phân trang tổng số trang
  totalRecord;
  page:Number = 1;

  constructor(public streetService:StreetService,public dictrictService:DictrictService,private priceSearchServer:PriceSearchService,private router:ActivatedRoute,private route: Router,public activerouter:ActivatedRoute,private motelService: MotelService,private cityService: CitiesService, private provinceService: ProvincesService, private typeservice:TypeofnewService) {
    this.getPrices();
    this.getCities();
    this.getNewTypes();
    this.getDistance();
    this.getMotelByURL();
  }

  async ngOnInit() {
    this.firstTime();
    await this.setData();
  }

  // runMap(){
  //   if (!navigator.geolocation) {
  //     console.log('location is not supported');
  //   }
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const coords = position.coords;
  //     const latLong = [this.lat, this.long];
  //     console.log(
  //       `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
  //     );
  //     let mymap = L.map('map').setView(latLong, 13);

  //     L.tileLayer(
  //       'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
  //       {
  //         attribution:
  //           'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //         maxZoom: 18,
  //         id: 'mapbox/streets-v11',
  //         tileSize: 512,
  //         zoomOffset: -1,
  //         accessToken: 'your.mapbox.access.token',
  //       }
  //     ).addTo(mymap);

  //     let marker = L.marker(latLong).addTo(mymap);

  //     marker.bindPopup('<b>Hi</b>').openPopup();

  //     let popup = L.popup()
  //       .setLatLng(latLong)
  //       .setContent(this.name)
  //       .openOn(mymap);
  //   });
  //   this.watchPosition();
  // }

  // watchPosition() {
  //   let desLat = 0;
  //   let desLon = 0;
  //   let id = navigator.geolocation.watchPosition(
  //     (position) => {
  //       console.log(
  //         `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
  //       );
  //       if (position.coords.latitude === desLat) {
  //         navigator.geolocation.clearWatch(id);
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 9000,
  //       maximumAge: 0,
  //     }
  //   );
  // }

  public handlePageChange(event) {
    this.page = event;
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
      this.priceSearch = priceSearch.numberOne  + priceSearch.numberTwo + " " + priceSearch.typePriceTwo;
    }
    else{
      this.priceSearch = priceSearch.numberOne + " " + priceSearch.typePriceOne  + priceSearch.numberTwo + " " + priceSearch.typePriceTwo;
    }
  
  }


  public async getStreetById(ID){
    this.streets = new Array<Street>();
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
      result[i].numberTwo = " - " + result[i].numberTwo;
      this.priceSearchs.push(result[i])
    }

    
  }

  public async getDistance(){
    this.distances = await this.motelService.getDistance() as Distance[];
    this.distance = this.distances[0].number + " " + this.distances[0].name;
  }

  public onChoiceDistance(distance:Distance) {
    this.distance = distance.number + " " + distance.name;
  }

  async onSearch(){
    // console.log(this.city.name)
    // console.log(this.province.name)
    // console.log(this.district.name)
    // console.log(this.street.name)
    // console.log(this.search)
    
    // var city = "", province = "", district = "", street = "", search ="";
    // if(this.city.name != "Tỉnh thành phố"){
    //   city = this.city.name
    // }
    // if(this.province.name != "Quận Huyện"){
    //   province = ", " + this.province.name 
    // }
    // if(this.district.name != "Phường Xã"){
    //   district = ", " + this.district.name
    // }
    // if(this.street.name != "Đường Phố"){
    //   street = ", " +this.street.name
    // }
    // if(this.search != ""){
    //   search = ", " + this.search
    // }
    // var searchtext = city + province + district + street + search;
    // if(searchtext == ""){

    // }
    // else{
    //   var linkData = await this.motelService.getLocation(searchtext) as any;
    //   // console.log(linkData["data"]["features"][0]["geometry"]["coordinates"]);
    //   this.lat = linkData["data"]["features"][0]["geometry"]["coordinates"][0];
    //   this.long = linkData["data"]["features"][0]["geometry"]["coordinates"][1];
    // }

    var linkData = await this.motelService.getLocation("chung cư hoàng hoa thám ") as any;
    console.log(linkData["data"]["features"])
    if(linkData["data"]["features"].length !=0){
      this.name = linkData["data"]["features"][0]["properties"]["name"].toString();
      this.lat = linkData["data"]["features"][0]["geometry"]["coordinates"][0];
      this.long = linkData["data"]["features"][0]["geometry"]["coordinates"][1];
      console.log(this.lat + "," + this.long)
      console.log(linkData["data"]["features"][0])
    }

    // this.runMap();
  }

  //Load data
  public loadDataHot(motel){
    for(let i = 0; i< motel.length; i++){
      if(motel[i].typeservice == "Tin Hot")
      {
        this.motelsearch.push(motel[i])
      }
    }
  }

  public loadData3(motel){
    for(let i = 0; i< motel.length; i++){
      if(motel[i].typeservice == "Tin VIP 3")
      {
        this.motelsearch.push(motel[i])
      }
    }
  }

  public loadData2(motel){
    for(let i = 0; i< motel.length; i++){
      if(motel[i].typeservice == "Tin VIP 2")
      {
        this.motelsearch.push(motel[i])
      }
    }
  }

  public loadData1(motel){
    for(let i = 0; i< motel.length; i++){
      if(motel[i].typeservice == "Tin VIP 1")
      {
        this.motelsearch.push(motel[i])
      }
    }
  }

  public loadDataThuong(motel){
    for(let i = 0; i< motel.length; i++){
      if(motel[i].typeservice == "Tin thường")
      {
        this.motelsearch.push(motel[i])
      }
    }
  }

  public async getTypes(){
    return await this.typeservice.getTypes() as NewType [];
  }

  public async getDataCities(){
    return await this.cityService.getCitys() as City[];
  }

  public async getDataStreetById(ID){
    return await this.streetService.getStreetByProvince(Number(ID)) as Street[];
  }

  public async getDataDistricteById(ID){
    return await this.dictrictService.getDistrictByProvince(Number(ID)) as District[];

  }

  public async getDataProvinceByID(ID){
    return await this.provinceService.getProvincesByCity(Number(ID)) as Province[];
  }

  public async getMotelByURL() {

    var city = this.router.snapshot.paramMap.get("city");
    var type = this.router.snapshot.paramMap.get("type");
    var province = this.router.snapshot.paramMap.get("province");
    var street = this.router.snapshot.paramMap.get("street");
    var price = this.router.snapshot.paramMap.get("price");
    var district = this.router.snapshot.paramMap.get("district");
    var direct = this.router.snapshot.paramMap.get("direct");
    var area = this.router.snapshot.paramMap.get("area");

    var idType: number = 0;
    var idCity: number = 0;
    var idProvince: number = 0;
    var idDistrict: number = 0;
    var idStreet: number = 0;
    var idPrice: number = 0;

    const types = await this.getTypes();
    const cities = await this.getDataCities();
    // const provinces = await this.provinceService.getProvinces() as Province[];
    // const districts = await this.dictrictService.getDistricts() as District[];
    // const streets = await this.streetService.getStreets() as Street[];

    var indexType = types.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.name) === type);
    idType = indexType + 1;

    if(city != null){
      var indexCity = cities.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.name) === city);
      if(indexCity == -1){
        price = city;
        indexCity = 0;
      }
      idCity = indexCity;
    }
    
    if(province != null){
      var provinceByCityId = await this.getDataProvinceByID(idCity);
      var indexProvince = provinceByCityId.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.name) === province); 
      if(indexProvince == -1){
        price = province;
        indexProvince = 0;
        idProvince = indexProvince;
      }
      else{
        idProvince = Number(provinceByCityId[indexProvince].id);
      }
    }

    if(district != null){
      var districtByCityId = await this.getDataDistricteById(idProvince);
      var indexDistrict = districtByCityId.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.name) === district); 
      if(indexDistrict == -1){
        price = district;
        indexDistrict = 0;
        idDistrict = indexDistrict
      }  
      else{
        idDistrict = Number(districtByCityId[indexDistrict].id);
      }
    }
    if(street != null){
      var streetByCityId = await this.getDataStreetById(idProvince);
      var indexStreet = streetByCityId.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.name) === street);   
      if(indexStreet == -1){
        price = street;
        indexStreet = 0;
        idStreet = indexStreet
      }     
      else{
        idStreet = Number(streetByCityId[indexStreet].id);
      }
    }
    if(price != null){
      const priceSearch = await this.priceSearchServer.getprices() as PriceSearch[];
      //2-Trieu-3-Trieu
      //Duoi-1-Trieu
      var str = price.split("-");
      // var str = price.replace("-","");
      // str = str.replace("-", "");
      var indexPrice = priceSearch.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.numberOne) === str[0]);

      // if(indexPrice == -1){
      //   str = str.replace("-", "");
      //   indexPrice = priceSearch.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.numberOne + a.typePriceOne + a.numberTwo + a.typePriceTwo) === str);
      // }
      indexPrice = indexPrice + 1;
      idPrice = indexPrice;
    }

    const result =  await this.motelService.getmotelbyorder(idCity,idProvince,idDistrict,idStreet,idPrice,idType) as any;
    this.loadDataHot(result);
    this.loadData1(result);
    this.loadData2(result);
    this.loadData3(result);    
    this.loadDataThuong(result);
    if(this.motels.length){
      this.motels.splice(0, this.motels.length);
    }  
    this.motels = this.motelsearch.slice();
    this.totalRecord = this.motels.length;

  }

  async setData(){
    var city = this.router.snapshot.paramMap.get("city");
    var type = this.router.snapshot.paramMap.get("type");
    var province = this.router.snapshot.paramMap.get("province");
    var street = this.router.snapshot.paramMap.get("street");
    var price = this.router.snapshot.paramMap.get("price");
    var district = this.router.snapshot.paramMap.get("district");

    console.log(city + type )
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
      var str = price.split("-");
      var priceSearch: PriceSearch[] = [];
      priceSearch = await this.priceSearchServer.getprices() as PriceSearch[];

     
      var indexPrice = priceSearch.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.numberOne) === str[0]);
      
      var dataFind: PriceSearch = {
        id:priceSearch[indexPrice].id, 
        numberOne:priceSearch[indexPrice].numberOne, 
        typePriceOne:priceSearch[indexPrice].typePriceOne, 
        numberTwo:priceSearch[indexPrice].numberTwo, 
        typePriceTwo:priceSearch[indexPrice].typePriceTwo
      }
      
      if(dataFind.typePriceOne == null){
        this.priceSearch = dataFind.numberOne  + " - " + dataFind.numberTwo + " " + dataFind.typePriceTwo;
      }
      else{
        this.priceSearch = dataFind.numberOne + " " + dataFind.typePriceOne  + " - " + dataFind.numberTwo + " " + dataFind.typePriceTwo;
      }

    }

    this.getProvinceByID(this.city.id);
    this.getDistricteById(this.province .id)
    this.getStreetById(this.province.id);
  }
}
