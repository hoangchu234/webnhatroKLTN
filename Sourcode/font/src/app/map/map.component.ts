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
declare const L2: any;

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
  distanceId = "";

  search = "";

  long = 106.66456239976246;
  lat = 10.802007379610322;
  name = "Công viên hoàng văn thụ";

  motelsearch: Motel[] = [];
  motels:Motel[] = [];
  
  //Phân trang tổng số trang
  totalRecord;
  page:Number = 1;

  youLong = "";
  youLat = "";

  mymap: any;
  marker: any;
  constructor(public streetService:StreetService,public dictrictService:DictrictService,private priceSearchServer:PriceSearchService,private router:ActivatedRoute,private route: Router,public activerouter:ActivatedRoute,private motelService: MotelService,private cityService: CitiesService, private provinceService: ProvincesService, private typeservice:TypeofnewService) {
    this.getPrices();
    this.getCities();
    this.getNewTypes();
    this.getDistance();
    this.getMotelByURL();
  }

  async ngOnInit() {
    this.runMap();
    this.firstTime();
    await this.setData();
  }

  buildMap(lat,lon,name)  {
    if (this.mymap != undefined) { this.mymap.remove(); } 
    this.mymap = L.map('map').setView([lon,lat], 13);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token',
      }
    ).addTo(this.mymap );
    
    L.marker([lon,lat]).addTo(this.mymap)
        .bindPopup(name)
        .openPopup();
    
    
  }

  runMap(){
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      console.log(position.coords.latitude+","+position.coords.longitude);
      console.log(this.lat+","+ this.long);

      // this.youLat = position.coords.latitude;
      this.youLat = position.coords.latitude.toString()
      this.youLong = position.coords.longitude.toString()


      const latlong1 =[position.coords.latitude,position.coords.longitude];//vị trí hiện tại
      const latLong = [this.lat, this.long];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      
      
      this.mymap = L.map('map').setView(latLong, 13);
      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token',
        }
      ).addTo(this.mymap );

      this.marker = L.marker(latLong).addTo(this.mymap );

      this.marker.bindPopup('<b>Hi</b>').openPopup();
      this.marker.bindPopup('<b>Hi</b>').openPopup();

      let popup = L.popup()
        .setLatLng(latLong)
        .setContent(this.name)
        .openOn(this.mymap );
    });
    this.watchPosition();
  
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 9000,
        maximumAge: 0,
      }
    );
  }

  onLong(message: string): void {
    this.youLong = message;
  }

  onLat(message: string): void {
    this.youLat = message;
  }

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
      districtZero.provinceId = number.toString();
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
    var dis: Distance = {
      id: 0,
      number:"", 
      name:"Tất cả"
    }
    this.distances.unshift(dis);
    this.distance = "Tất cả";
    this.distanceId = "0";

  }

  public async onChoiceDistance(distance:Distance) {
    if(distance.id == 0){
      this.distance = "Tất cả";
      this.distanceId = "0";
      await this.getMotelByURL();
    }
    else{
      this.distance = distance.number + " " + distance.name;
      this.distanceId = distance.id.toString();
      await this.getDataMotelDistance();
    }


  }

  async onSearch(){

    var searchtext = "";
    if(this.search != ""){
      searchtext = this.search
    }

    if(this.city.name != "Tỉnh thành phố"){
      searchtext = searchtext + " " + this.city.name
    }
    if(this.province.name != "Quận Huyện"){
      searchtext = searchtext + " " + this.province.name 
    }
    if(this.district.name != "Phường Xã"){
      searchtext = searchtext + " " + this.district.name
    }
    if(this.street.name != "Đường Phố"){
      searchtext = searchtext + " " + this.street.name
    }
    
    if(searchtext == ""){
      await this.getDistance();
    }
    else{
      var linkData = await this.motelService.getLocation(searchtext) as any;
      if(linkData["data"]["features"].length !=0){
        this.name = linkData["data"]["features"][0]["properties"]["name"].toString();
        this.long = linkData["data"]["features"][0]["geometry"]["coordinates"][0];
        this.lat = linkData["data"]["features"][0]["geometry"]["coordinates"][1];

        console.log(this.lat);
        console.log(this.long);
        this.youLat = this.lat.toString();
        this.youLong = this.long.toString();
        this.buildMap( this.long , this.lat, this.name);
        await this.getMotelByURL();
      }
    }

    
    // }
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
      var indexPrice = priceSearch.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.numberOne) === str[0]);

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

  async getDataMotelDistance(){

    if(this.youLong != "" && this.youLat != ""){

      var city = this.router.snapshot.paramMap.get("city");
      var type = this.router.snapshot.paramMap.get("type");
      var province = this.router.snapshot.paramMap.get("province");
      var street = this.router.snapshot.paramMap.get("street");
      var price = this.router.snapshot.paramMap.get("price");
      var district = this.router.snapshot.paramMap.get("district");
  
      var idType: number = 0;
      var idCity: number = 0;
      var idProvince: number = 0;
      var idDistrict: number = 0;
      var idStreet: number = 0;
      var idPrice: number = 0;
  
      const types = await this.getTypes();
      const cities = await this.getDataCities();

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
        var indexPrice = priceSearch.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.numberOne) === str[0]);
  
        indexPrice = indexPrice + 1;
        idPrice = indexPrice;
      }

      if(this.motelsearch.length){
        this.motelsearch.splice(0, this.motelsearch.length);
      }  
      const result =  await this.motelService.getMotelDistance(idCity,idProvince,idDistrict,idStreet,idPrice,idType,this.distanceId, this.youLong, this.youLat) as any;
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
  }

  async success(position) {
    var	latitude = position.coords.latitude,
      longitude = position.coords.longitude,
      altitude = position.coords.altitude,
      accuracy = position.coords.accuracy;
  
    // Hiển thị các thông số về vị trí hiện tại của bạn.
    console.log(latitude);
    console.log(longitude);
    console.log(altitude);
    console.log(accuracy);
  }

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
