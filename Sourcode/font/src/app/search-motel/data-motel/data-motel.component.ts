import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NewType } from '../../model/NewType';
import { TypeofnewService } from '../../services/newstype.service'
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from '../../services/authentication.service';
import { Account } from  '../../model/Account';
import { UserService } from '../../services/user.service'
import { data } from 'jquery';
import { Motel } from '../../model/Motel';
import { User } from '../../model/User';
import { ActivatedRoute, Router } from '@angular/router';
import { MotelService } from 'src/app/services/motel.service';
import { DialogSearchMotelComponent } from '../dialog-search-motel/dialog-search-motel.component';
import { AreaSearchService } from 'src/app/services/area-search.service';
import { AreaSearch } from 'src/app/model/AreaSearch';
import { RemoveVietnameseTones } from '../../removeVietnameseTones.service';
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
import { StorageService } from 'src/app/storage.service';


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
    {id: 1, text:'Tin VIP 1'}, // 
    {id: 2, text:'Tin VIP 2'},
    {id: 3, text:'Tin VIP 3'},
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
  areas: AreaSearch[] = [];
  str: string = ""
  constructor(private priceSearchServer:PriceSearchService,private provinceService: ProvincesService,public streetService:StreetService,public dictrictService:DictrictService,private cityService: CitiesService,private areaSearchService:AreaSearchService,private userService:UserService,private authenticationService: AuthenticationService,public dialog: MatDialog,private typeservice:TypeofnewService,private route: Router,private router: ActivatedRoute,private motelService:MotelService) {
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
    this.getArea();
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


  public async getTypes(){
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
    this.motels = this.motelsearch;
    this.seach = "Mặc định"
  }

  public async getDataAreaZone(){
    this.area = await this.areaSearchService.getAreaSearch() as AreaSearch[];
  }

  public linkRouter(name, id) {
    //this.router.navigate( [{name: name, id: id}]);
    this.route.navigate( ['/home/chi-tiet',name,id]);
  }
  public linkMap() {
    //this.router.navigate( [{name: name, id: id}]);
    this.route.navigate( ['/map']);
  }

  public handlePageChange(event) {
    this.page = event;
  }

  async getArea(){
    this.areas = await this.areaSearchService.getAreaSearch() as AreaSearch[];
    // this.area = this.directs[0].directName.toString();
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
      width: '400px',
      data: "aaa"
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.str = result.data;
      var a = this.str.split('@');
      if(a[0] == " "){
        var direct = "";
      }
      else{
        direct = a[0];
      }
      if(a[1] == " "){
        var area = "";
      }
      else{
        area = a[1];
      }
      this.url(direct, area);
      // this.AreaDataSearch();
      // this.DirectDataSearch();
    });
  }

  url(directName, areaId){
    var city = "/" + this.router.snapshot.paramMap.get("city");
    var type = "/" + this.router.snapshot.paramMap.get("type");
    var province = "/" + this.router.snapshot.paramMap.get("province");
    var street = "/" + this.router.snapshot.paramMap.get("street");
    var price = "/" + this.router.snapshot.paramMap.get("price");
    var district = "/" + this.router.snapshot.paramMap.get("district");
    var direct = ""
    var area = ""
    if(city == "/null"){
      city = "";
    }
    if(type == "/null"){
      type = "";
    }
    if(province == "/null"){
      province = "";
    }
    if(street == "/null"){
      street = "";
    }
    if(price == "/null"){
      price = "";
    }
    if(district == "/null"){
      district = "";
    }
    if(directName == ""){
      direct = "";
    }
    else{
      direct = "/" + RemoveVietnameseTones.removeVietnameseTones(directName);
    }
    if(areaId == ""){
      area = "";
    }
    else{
      area = "/" + areaId;
    }
    
    var link = '/home' + city + province + district + street + price + type + direct + area;
    console.log(link)
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([link]);
      
    });
  }

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
    var direct = this.router.snapshot.paramMap.get("direct");
    var area = this.router.snapshot.paramMap.get("area");

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
    var dataMotelFilter = this.motelsearch.slice();
    if(direct != null){
      dataMotelFilter = this.motelsearch.filter(a => RemoveVietnameseTones.removeVietnameseTones(a.detail.director) === direct);
    }
    if(area != null){
      var id = this.areas.find(a => a.id === area);
      if(area == "2"){
        dataMotelFilter = this.motelsearch.filter(a => Number(a.areaZone) < Number(id.numberTwo));
      }
      else if(area == "10"){
        dataMotelFilter = this.motelsearch.filter(a => Number(a.areaZone) > Number(id.numberTwo));
      }
      else if(area != "1"){
        dataMotelFilter = this.motelsearch.filter(a => (Number(a.areaZone) > Number(id.numberOne)) && (Number(a.areaZone) < Number(id.numberTwo)));
      }
    }

    // this.motels = this.motelsearch.slice();
    // this.totalRecord = this.motels.length;
    this.motels = dataMotelFilter.slice();
    this.totalRecord = this.motels.length;
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
