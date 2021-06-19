import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from '../model/City';
import { Distance } from '../model/Distance';
import { District } from '../model/District';
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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

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

  constructor(public streetService:StreetService,public dictrictService:DictrictService,private priceSearchServer:PriceSearchService,private router:ActivatedRoute,private route: Router,public activerouter:ActivatedRoute,private motelService: MotelService,private cityService: CitiesService, private provinceService: ProvincesService, private typeservice:TypeofnewService) {
    this.getPrices();
    this.getCities();
    this.getNewTypes();
    this.getDistance();
  }

  async ngOnInit() {
    this.firstTime();

    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [10.798167914161445, 106.6524641976436];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
      let mymap = L.map('map').setView(latLong, 13);

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
      ).addTo(mymap);

      let marker = L.marker(latLong).addTo(mymap);

      marker.bindPopup('<b>Hi</b>').openPopup();

      let popup = L.popup()
        .setLatLng(latLong)
        .setContent('I am Subrat')
        .openOn(mymap);
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
        timeout: 5000,
        maximumAge: 0,
      }
    );
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

  onSearch(){
    var searchtext = "Chung cư k300"
    var linkData = this.motelService.getLocation(searchtext) as any;
    console.log(linkData);
  }
}
