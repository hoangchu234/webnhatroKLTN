import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewType } from '../../../model/NewType';
import { TypeofnewService } from '../../../services/newstype.service'
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../../services/authentication.service';
import { Account } from  '../../../model/Account';
import { UserService } from '../../../services/user.service'
import { BehaviorSubjectClass } from '../../../services/behaviorsubject'
import { data } from 'jquery';
import { Motel } from '../../../model/Motel';
import { User } from '../../../model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { MotelService } from 'src/app/services/motel.service';
import { DialogSearchMotelComponent } from '../dialog-search-motel/dialog-search-motel.component';
import { AreaSearchService } from 'src/app/services/area-search.service';
import { AreaSearch } from 'src/app/model/AreaSearch';
import { RemoveVietnameseTones } from '../../../removeVietnameseTones.service';
import { CitiesService } from 'src/app/services/cities.service';
import { City } from 'src/app/model/City';
import { StreetService } from 'src/app/services/street.service';
import { DictrictService } from 'src/app/services/dictrict.service';
import { ProvincesService } from 'src/app/services/provinces.service';
import { Province } from 'src/app/model/Province';
import { District } from 'src/app/model/District';
import { Street } from 'src/app/model/Street';
import { PriceSearchService } from 'src/app/services/price-search.service';
import { PriceSearch } from 'src/app/model/PriceSearch';


export interface Type{
  id:number;
  text:string;
}

declare var jQuery: any;

@Component({
  selector: 'app-data-motel',
  templateUrl: './data-motel.component.html',
  styleUrls: ['./data-motel.component.css']
})
export class DataMotelComponent implements OnInit {

  public news:Array<Type> = [
    {id: 0, text:'Tin Hot'}, // 4 tuần, 2 tuần
    {id: 1, text:'Tin VIP 3'}, // 
    {id: 2, text:'Tin VIP 2'},
    {id: 3, text:'Tin VIP 1'},
    {id: 4, text:'Tin thường'},
  ];

  motelsearch: Motel[] = [];
  motels:Motel[] = [];

  // types: NewType[] = [];
  // // Danh sách city và tên city
  // cities: City[] = [];
  // // Danh sách province và tên province
  // provinces: Province[] = [];
  // // Danh sách district và tên district
  // districts: District[] = [];
  // // Danh sách street và tên street
  // streets: Street[] = [];

  counttypes: NewType[]; // mảng các loại nhà trọ
  arraycounttype: number[] =[]; // đếm số loại nhà trọ
  name:string;

  //Phân trang tổng số trang
  totalRecord;
  page:Number = 1;

  //load tên trên thanh tophead
  nametophead;

  //dialog
  public dialogsearch: Motel;

  //user
  //currentAccount: Account;
  users:User[];

  @Output() seach:string = "Mặc định";

  xetvalue = false;
  area: AreaSearch[];
  

  @Input() newTypeseach;
  @Input() citySearch;

  linkURL = this.route.url;

  constructor(private priceSearchServer:PriceSearchService,private provinceService: ProvincesService,public streetService:StreetService,public dictrictService:DictrictService,private cityService: CitiesService,private areaSearchService:AreaSearchService,private behaviorSubjectClass:BehaviorSubjectClass,private userService:UserService,private authenticationService: AuthenticationService,public dialog: MatDialog,private typeservice:TypeofnewService,private route: Router,private router: ActivatedRoute,private motelService:MotelService) {
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
    this.getDataAreaZone();
    this.getMotelByURL();
    /*
    (function ($) {
      $(document).ready(function myFunction(){
        var myVar;
        myVar = setTimeout(showPage, 2000);
      });

      function showPage() {
        document.getElementById("loader").style.display = "none";
        document.getElementById("myDiv").style.display = "block";
      }
      
    })(jQuery);
    */
   }


   async ngOnInit(): Promise<void> {
   
    this.isUser();

    
    /*const name = this.router.snapshot.paramMap.get("name");
    const type = this.router.snapshot.paramMap.get("type");
    const city = this.router.snapshot.paramMap.get("city");
    const province = this.router.snapshot.paramMap.get("province");
    const district = this.router.snapshot.paramMap.get("district");
    const street = this.router.snapshot.paramMap.get("street");
    const price = this.router.snapshot.paramMap.get("price");*/
    
    
    /*if(this.name == "cho-thue-nha-tro"){
      this.nametophead = "Cho thuê phòng trọ, nhà trọ số 1 Việt Nam";
       await this.getMotelByType("Phòng trọ, nhà trọ");
       console.log("aa")
    }
    else if(this.name == "nha-cho-thue"){
      this.nametophead = "Cho Thuê Nhà Nguyên Căn, Giá Rẻ, Chính Chủ, Mới Nhất 2020";
      await this.getMotelByType("Nhà thuê nguyên căn");
    }
    else if(this.name == "cho-thue-can-ho"){
      this.nametophead = "Cho Thuê Căn Hộ Chung Cư Mini, Căn Hộ Dịch Vụ, Giá Rẻ - Mới Nhất 2020";
      await this.getMotelByType("Cho thuê căn hộ");
    }
    else if(this.name == "tim-nguoi-o-ghep-cap"){
      this.nametophead = "Tìm Người Ở Ghép, Tìm Nam Ở Ghép, Tìm Nữ Ở Ghép";
      await this.getMotelByType("Tìm người ở ghép");
    }
    else if(this.name == "cho-thue-mat-bang"){
      this.nametophead = "Cho Thuê Mặt Bằng, Cho Thuê Văn Phòng, Cửa Hàng, Kiot";
      await this.getMotelByType("Cho thuê mặt bằng");
    }
    */
    
    
    
    //this.dangtinService.getSearchMotel().subscribe(motel => this.motelsearch = motel);
    //this.dangtinService.searchmoteluser(this.motelsearch).subscribe(getmotels => this.motels = getmotels);
  }


  public onCity(message:string){
    this.motels = this.motelsearch.filter(a => a.city.name == message);
  }

  public async getTypes(){
    /*this.typeservice.getTypes().subscribe(gettypes => {
      this.newTypes = gettypes;
    })*/
    return await this.typeservice.getTypes() as NewType [];

  }

  public getMotelDecreasePrice(){
    this.motels = this.motels.sort((a,b) => Number(b.price) - Number(a.price))
    this.seach = "Gía giảm dần"
  }

  public getMotelIncreasePrice(){
    this.motels = this.motels.sort((a,b) => Number(a.price) - Number(b.price))
    this.seach = "Gía tăng dần"
  }

  public getMotelIncreaseArea(){
    this.motels = this.motels.sort((a,b) => Number(a.areaZone) - Number(b.areaZone))
    this.seach = "Diện tích tăng dần"
  }

  public getMotelDecreaseArea(){
    this.motels = this.motels.sort((a,b) => Number(b.areaZone) - Number(a.areaZone))
    this.seach = "Diện tích giảm dần"
  }

  public getMotelDeffault(){
    this.motels = this.motelsearch
    this.seach = "Mặc định"
  }

  public async getDataAreaZone(){
    this.area = await this.areaSearchService.getAreaSearch() as AreaSearch[];
  }

  public linkRouter(name, id) {
    //this.router.navigate( [{name: name, id: id}]);
    this.route.navigate( ['/home/chi-tiet',name,id]);
  }

  public handlePageChange(event) {
    this.page = event;
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

  public isUser() {
    try{
      var role = Number(this.authenticationService.currentAccountValue.roleId);
    }
    catch(error){    
      if(role == 1){
        this.xetvalue = true;
      }
      this.xetvalue = false;
    }
    
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogSearchMotelComponent, {
      direction: "ltr",
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      try{

      }
      catch(error){
        console.log("errr")
      }
    /*
      //1
      if(localStorage.getItem('areaName') == null && localStorage.getItem('directName') ){
       this.motels = this.motelLoc.filter(a => a.detail.director == localStorage.getItem('directName'))
       this.totalRecord = this.motels.length;
       console.log("directName")
      }
      if(localStorage.getItem('areaName') && localStorage.getItem('directName') == null ){
        var area = this.area.find(a => a.name == localStorage.getItem('areaName'))
        this.getMotelByAreaSearch(area.id);
        console.log("areaName")
      }
       
      if(localStorage.getItem('areaName') && localStorage.getItem('directName')){
        var area = this.area.find(a => a.name == localStorage.getItem('areaName'))
        this.getMotelByAreaSearch(area.id);
        this.motels = this.motelLoc.filter(a => a.detail.director == localStorage.getItem('directName'))
        this.totalRecord = this.motels.length;
        console.log("areaName,directName")
      }


      //0
      if(localStorage.getItem('areaName') == null && localStorage.getItem('directName') == null){
        this.motels = this.motelsearch;
        this.motelLoc = this.motels;
        this.totalRecord = this.motels.length;
        console.log("_________")
      }*/

    });
  }

  /*public getMotelByAreaSearch(id){
    if(Number(id) == 1){
      this.motels = this.motelLoc.filter(a => Number(a.areaZone) < 20)
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 2){
      this.motels = this.motelLoc.filter(a => Number(a.areaZone) >= 20 && Number(a.areaZone) < 30)
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 3){
      this.motels = this.motelLoc.filter(a => Number(a.areaZone) >= 30 && Number(a.areaZone) < 50)
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 4){
      this.motels = this.motelLoc.filter(a => Number(a.areaZone) >= 50 && Number(a.areaZone) < 60)
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 5){
      this.motels = this.motelLoc.filter(a => Number(a.areaZone) >= 60 && Number(a.areaZone) < 70)
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 6){
      this.motels = this.motelLoc.filter(a => Number(a.areaZone) >= 70 && Number(a.areaZone) < 80)
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 7){
      this.motels = this.motelLoc.filter(a => Number(a.areaZone) >= 80 && Number(a.areaZone) < 90)
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 8){
      this.motels = this.motelLoc.filter(a => Number(a.areaZone) >= 90 && Number(a.areaZone) < 100)
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 9){
      this.motels = this.motelLoc.filter(a => Number(a.areaZone) > 100)
      this.totalRecord = this.motels.length;
    }
  }*/

  public async getCities(){
    return await this.cityService.getCitys() as City[];
    /*this.cityService.getCitys().subscribe(getcity => {
      this.cities = getcity;
    })*/
  }

  public async getStreetById(ID){
    return await this.streetService.getStreetByProvince(Number(ID)) as Street[];
  }

  public async getDistricteById(ID){
    return await this.dictrictService.getDistrictByProvince(Number(ID)) as District[];

  }

  public async getProvinceByID(ID){
    return await this.provinceService.getProvincesByCity(Number(ID)) as Province[];
  }


  //:city/:province/:district/:street/:price/:type
  //:city/:province/:district/:street/:type
  //:city/:province/:district/:type
  //:city/:province/:type
  //:city/:type
  //:type
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
    const cities = await this.getCities();
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
      var provinceByCityId = await this.getProvinceByID(idCity);
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
      var districtByCityId = await this.getDistricteById(idProvince);
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
      var streetByCityId = await this.getStreetById(idProvince);
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
      /*indexPrice = priceSearch.findIndex(a => {
        if(a.typePriceOne == null){
          var listPrice = a.numberOne + " - " + a.numberTwo + " " + a.typePriceTwo;
          if(listPrice == price){
            indexPrice = Number(a.id);
          }
        }
        else{
          var listPrice = a.numberOne + " " + a.typePriceOne + " - " + a.numberTwo + " " + a.typePriceTwo;
          if(listPrice == price){
            indexPrice = Number(a.id);
          }
        }
      });  */

      //2-Trieu-3-Trieu
      //Duoi-1-Trieu
      var str = price.replace("-","");
      str = str.replace("-", "");
      var indexPrice = priceSearch.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.numberOne + a.numberTwo + a.typePriceTwo) === str);

      if(indexPrice == -1){
        str = str.replace("-", "");
        indexPrice = priceSearch.findIndex(a => RemoveVietnameseTones.removeVietnameseTones(a.numberOne + a.typePriceOne + a.numberTwo + a.typePriceTwo) === str);
      }
      indexPrice = indexPrice + 1;
      idPrice = indexPrice;
    }

    const result =  await this.motelService.getmotelbyorder(idCity,idProvince,idDistrict,idStreet,idPrice,idType) as any;
    // this.loadDataHot(result);
    // this.loadData1(result);
    // this.loadData2(result);
    // this.loadData3(result);    
    // this.loadDataThuong(result);
    if(this.motels.length){
      console.log("have")
      this.motels.splice(0, this.motels.length);
    }
    this.motels = result.slice();
    this.totalRecord = result.length;
   
  }

  /*
  public getMotelByCity(motelss){
    if((localStorage.getItem('city') && localStorage.getItem('city') != "0")){
      this.motels = motelss.filter(a => a.cityId == localStorage.getItem('city'))
    }
    else{
      this.motels = this.motelsearch;
    }
    
  }

  public getMotelByProvince(motelss){
    if((localStorage.getItem('province') && localStorage.getItem('province') != "0")){
      this.motels = motelss.filter(a => a.provinceId == localStorage.getItem('province'))
    }
    else{
      
    }
  }

  public getMotelByDistrict(motelss){
    if((localStorage.getItem('district') && localStorage.getItem('district') != "0")){
      this.motels = motelss.filter(a => a.districtId == localStorage.getItem('district'))
    }
    else{
      
    }
  }

  public getMotelByStreet(motelss){
    if((localStorage.getItem('street') && localStorage.getItem('street') != "0")){
      this.motels = motelss.filter(a => a.streetId == localStorage.getItem('street'))
    }
    else{
      
    }
  }

  public getMotelBySearch(motelss){
    if(localStorage.getItem('searchtext') != "NULL" && localStorage.getItem('searchtext') != null){
      this.motels = this.motels.filter(a => a.title.toLowerCase().includes(localStorage.getItem('searchtext').toLowerCase()));
    }
    else{
      
    }

  }

  */

  /*public getMotelByPriceSearch(id,motelss){
    if(Number(id) == 1){
      this.motels = motelss.filter(a => (Number(a.price) < 1.000 && a.priceType == "triệu/tháng") || (Number(a.price) < 999 && a.priceType == "đồng/tháng"))
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 2){
      this.motels = motelss.filter(a => Number(a.price) >= 1.000 && Number(a.price) < 2.000 && a.priceType == "triệu/tháng")
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 3){
      this.motels = motelss.filter(a => Number(a.price) >= 2.000 && Number(a.price) < 3.000 && a.priceType == "triệu/tháng")
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 4){
      this.motels = motelss.filter(a => Number(a.price) >= 3.000 && Number(a.price) < 5.000 && a.priceType == "triệu/tháng")
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 5){
      this.motels = motelss.filter(a => Number(a.price) >= 5.000 && Number(a.price) < 7.000 && a.priceType == "triệu/tháng")
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 6){
      this.motels = motelss.filter(a => Number(a.price) >= 7.000 && Number(a.price) < 10.000 && a.priceType == "triệu/tháng")
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 7){
      this.motels = motelss.filter(a => Number(a.price) >= 10.000 && Number(a.price) < 15.000 && a.priceType == "triệu/tháng")
      this.totalRecord = this.motels.length;
    }
    else if(Number(id) == 8){
      this.motels = motelss.filter(a => Number(a.price) > 15.000 && a.priceType == "triệu/tháng")
      this.totalRecord = this.motels.length;
    }
  }*/
 
}
