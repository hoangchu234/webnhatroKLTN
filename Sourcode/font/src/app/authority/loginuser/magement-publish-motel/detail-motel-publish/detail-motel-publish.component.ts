import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Motel } from 'src/app/model/Motel';
import { Account } from 'src/app/model/Account';
import { NewType } from 'src/app/model/NewType';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MotelService } from 'src/app/services/motel.service';
import { ImageService } from 'src/app/services/image.service';
import { TypeofnewService } from 'src/app/services/newstype.service';
import { CitiesService } from 'src/app/services/cities.service';
import { ProvincesService } from 'src/app/services/provinces.service';
import { City } from 'src/app/model/City';
import { Province } from 'src/app/model/Province';
import { LiveType } from 'src/app/model/LiveType';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Image } from 'src/app/model/Image';
import { District } from 'src/app/model/District';
import { Street } from 'src/app/model/Street';
import { DictrictService } from 'src/app/services/dictrict.service';
import { StreetService } from 'src/app/services/street.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Direct } from 'src/app/model/Direct';
import { ToastService } from 'src/app/services/toast.service';

export interface Data{
  id:number;
  text:string;
}

@Component({
  selector: 'app-detail-motel-publish',
  templateUrl: './detail-motel-publish.component.html',
  styleUrls: ['./detail-motel-publish.component.css']
})
export class DetailMotelPublishComponent implements OnInit {

  motel: Motel[] = [];
  newTypes: NewType [] = [];
  newType: NewType = {id:"", name:"", details:null};

  //currentAccount:Account;
  cities: City[] = [];
  city = new City();

  provinces: Province[] = [];
  procince = new Province();

  districts: District[] = [];
  district = new District();

  streets: Street[] = [];
  street = new Street();

  phoneMotel;

  typePriceMotels:Array<Data> = [
    {id: 0, text:'đồng/tháng'},
    {id: 1, text:'triệu/tháng'},
  ];
  typePriceShowMotels: Data[] = [];
  typePriceMotel ='đồng/tháng';

  // directs:Array<Data> = [
  //   {id: 0, text:'Đông'},
  //   {id: 1, text:'Tây'},
  //   {id: 2, text:'Nam'},
  //   {id: 3, text:'Bắc'},
  //   {id: 4, text:'Đông Bắc'},
  //   {id: 5, text:'Đông Nam'},
  //   {id: 6, text:'Tây Bắc'},
  //   {id: 7, text:'Tây Nam'},
  // ];

  directsShow: Direct[] = [];
  direct: Direct = {id:null, directName:""};

  liveTypes:LiveType[] = [];
  liveType;

  numberBath: string;
  numberLiving: string;
  
  btnDisabledBath = true;
  btnDisabledLiving = true;
  
  arrayTrue: boolean[] = [];

  loadImageFromPC: string [] = [];
  oldImage: Image [] = [];
  motelImageDelete: Image [] = [];

  image: File [] = [];
  imagesURLFirebare: string[] = [];

  motelUpdate: Motel = new Motel();
  
  checkOutOfDate = false;

  address: string = "";
  addressNumber: string = "";

  price = new Float32Array(0);
  areaZone:string = "";
  title:string = "";
  decription:string = "";

  checkSaveImage = false;
  motelById: Motel;
  constructor(private route: Router,private toast: ToastService,private router: ActivatedRoute,public dialog: MatDialog,public streetService:StreetService,public dictrictService:DictrictService,private storage: AngularFireStorage,private imageService: ImageService,private cityService: CitiesService, private provinceService: ProvincesService,private authenticationService: AuthenticationService,private typeservice:TypeofnewService,public motelService:MotelService) {
  }

  async ngOnInit(): Promise<void> {
    const id = this.router.snapshot.paramMap.get("id");
    this.motelById = await this.getDataMotelById(id);

    this.addressNumber = this.motelById.addressNumber;
    await this.getNewTypes();
    await this.getCities();
    this.changeAddress(this.addressNumber);

    await this.getLiveType();
    await this.getTypePrice();
    // this.getDirect();
    await this.getDirectData();

    this.address = this.motelById.address;
    this.price = this.motelById.price;
    this.areaZone = this.motelById.areaZone;
    this.title = this.motelById.title;
    this.decription = this.motelById.description;


    if(this.motelById.status == "3"){
      this.checkOutOfDate = true;
    }

    this.motelUpdate = this.motelById;
    // load image
    for(let i=0 ;i< this.motelById.images.length;i++){
      this.loadImageFromPC.push(this.motelById.images[i].imageMotel)
    }

    this.oldImage = this.motelById.images;

    this.numberBath = this.motelById.detail.numberBath.toString();
    this.numberLiving = this.motelById.detail.numberLiving.toString();

    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);    
    this.phoneMotel = this.motelById.phone;
  }

  changeAddress(x){
    this.address = x + " " + this.street.name + " " + this.district.name + " " + this.procince.name + " " + this.city.name;
  }

  saverange(newValue) {
    this.changeAddress(newValue);
  } 

  async getDirectData(){
    var data = await this.motelService.getDirect() as Direct[];
    var index = data.findIndex(a => a.directName === this.motelById.detail.director);
    this.directsShow.push(data[index]);
    data.splice(index,1);
    for(let i=0; i<data.length;i++){
      this.directsShow.push(data[i]);
    }
    this.direct = this.directsShow[0];
  }

  async getDataMotelById(id){
    return await this.motelService.getMotelFromId(Number(id)) as Motel;
  }

  public increaseNumberBath()
  {
    this.numberBath = (Number(this.numberBath) + 1).toString();
    this.btnDisabledBath = false;
    this.motelUpdate.detail.numberBath = Number(this.numberBath);
  }

  public decreaseNumberBath()
  {
    this.numberBath = (Number(this.numberBath) - 1).toString();
    if(Number(this.numberBath) == 0){
      this.btnDisabledBath = true;
    }
    this.motelUpdate.detail.numberBath = Number(this.numberBath);
  }

  public increaseNumberLiving()
  {
    this.numberLiving = (Number(this.numberLiving) + 1).toString();
    this.btnDisabledLiving = false;
    this.motelUpdate.detail.numberLiving = Number(this.numberLiving);

  }

  public decreaseNumberLiving()
  {
    this.numberLiving = (Number(this.numberLiving) - 1).toString();
    if(Number(this.numberLiving) == 0){
      this.btnDisabledLiving = true;
    }
    this.motelUpdate.detail.numberLiving = Number(this.numberLiving);
  }

  public getTypePrice(){
    for(let i=0 ;i<this.typePriceMotels.length; i++){
      if(this.motelById.priceType == this.typePriceMotels[i].text){
        this.typePriceShowMotels.push(this.typePriceMotels[i])
        break;
      }
    }
    for(let i=0 ;i<this.typePriceMotels.length; i++){
      if(this.motelById.priceType != this.typePriceMotels[i].text){
        this.typePriceShowMotels.push(this.typePriceMotels[i])
      }
    }
    this.typePriceMotel = this.typePriceShowMotels[0].text;
  }

  public async getLiveType(){
    var result = await this.motelService.getLiveTypes() as LiveType[];
    result.splice(0,1);
    var index = result.findIndex(a => a.id === this.motelById.detail.liveTypeId);
    this.liveTypes = result.slice();
    for(let i=0; i< result.length;i++){
      if(i == index){
        this.arrayTrue.push(true);
      }
      else{
        this.arrayTrue.push(false);
      }
    }
  }

  public async getCities(){
    let result = await this.cityService.getCitys() as City[];
    result.splice(0,1);
    var index = result.findIndex(a => Number(a.id) === Number(this.motelById.cityId));
    this.city = result[index];

    this.cities = result;
    this.cities.splice(index,1);
    this.cities.unshift(this.city);
    
    await this.getProvinceById(this.city.id);
  }

  public async getProvinceById(ID){
    let result = await this.provinceService.getProvincesByCity(Number(ID)) as Province[];
    var index = result.findIndex(a => Number(a.id) === Number(this.motelById.provinceId));
    // console.log(this.motelById)
    
    if(index == -1){
      this.procince = result[0];
    }
    else{
      this.procince = result[index];

    }
    

    this.provinces = result;
    this.provinces.splice(index, 1);
    this.provinces.unshift(this.procince)
    
    await this.getStreetById(this.procince.id)
    await this.getDistricteById(this.procince.id)
  }

  public async getStreetById(ID){
    let result = await this.streetService.getStreetByProvince(Number(ID)) as Street[];
    var index = result.findIndex(a => Number(a.id) === Number(this.motelById.streetId));

    if(index == -1){
      this.street = result[0];
    }
    else{
      this.street = result[index];

    }
    this.streets = result;
    this.streets.splice(index , 1);
    this.streets.unshift(this.street)
    // if(result.length == 0){
    //   this.motelUpdate.streetId = "0"
    // }
  }

  public async getDistricteById(ID){
    const result = await this.dictrictService.getDistrictByProvince(Number(ID)) as District[];
    var index = result.findIndex(a => Number(a.id) === Number(this.motelById.districtId));
    if(index == -1){
      this.district = result[0];
    }
    else{
      this.district = result[index];

    }
    this.districts = result;
    this.districts.splice(index, 1);
    this.districts.unshift(this.district);
  }

  public getNewTypes = async () => {
    const result = await this.typeservice.getTypeExcepts() as NewType[];
    var index = result.findIndex(a => Number(a.id) === Number(this.motelById.detail.typeofnewId.toString()));
    this.newType = result[index];
    this.newTypes = result;
    this.newTypes.splice(index, 1)
    this.newTypes.unshift(this.newType);
  }


  //Edit new
  public onChangeNewType(event)
  {
    let value = event.target.value;
    var id = this.newTypes.find(a => a.id == value);
    this.newType = id;

    this.motelUpdate.detail.typeofnewId = Number(id.id);
  }

  public async onChangeCity(event)
  {
    let value = event.target.value;
    var id = this.cities.find(a => a.id == value);
    this.city = id;
    
    var provinceNew: Province[] = [];
    this.provinces = provinceNew;
    await this.getProvinceById(this.city.id);
    this.motelUpdate.cityId = id.id;
    
    this.changeAddress(this.addressNumber);
  }

  public onChangeProvince(event)
  {
    let value = event.target.value;
    var id = this.provinces.find(a => a.id == value);
    this.procince = id;

    var districtNew: District[] = [];
    this.districts = districtNew;
    var streetNew: Street[] = [];
    this.districts = districtNew;
    this.streets = streetNew;
    this.getDistricteById(id.id);
    this.getStreetById(id.id);
    this.motelUpdate.provinceId = id.id;

    this.changeAddress(this.addressNumber);
  }

  public onChangeDistrict(event)
  {
    let value = event.target.value;
    var id = this.districts.find(a => a.id == value);
    this.district = id;

    this.motelUpdate.districtId = id.id;

    this.changeAddress(this.addressNumber);
  }

  public onChangeStreet(event)
  {
    let value = event.target.value;
    var id = this.streets.find(a => a.id == value);
    this.street = id;

    this.motelUpdate.streetId = id.id;

    this.changeAddress(this.addressNumber);
  }

  public onChangePriceType(event)
  {
    let value = event.target.value;
    this.typePriceMotel = value;
    this.motelUpdate.priceType = value;
  }

  public onChangeDirect(event)
  {
    let value = event.target.value;
    this.direct = this.directsShow.find(a => a.id == value);
    this.motelUpdate.detail.director = this.direct.directName;
  }

  public async onChangeLiveType(event, liveTypes: LiveType)
  {
    this.liveType = liveTypes.nameType;
    const result = await this.motelService.getLiveTypes() as LiveType[];
    var id = result.find(a => a.nameType == this.liveType)
    this.motelUpdate.detail.liveTypeId = id.id;
  }

  public handleFileInput(event) {
    var files: FileList;
    files = event.target.files;

    this.checkSaveImage = true;
    for(let i=0; i< files.length; i++)
    {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (event: any) => {
        this.loadImageFromPC.push(event.target.result)
      }   
      this.image.push(files.item(i)) // lấy hình
    }
  }

  public onDelete(id){
    this.checkSaveImage = true;
    if(this.image.length == 1){
      var fileNew : File[] =[];
      this.image = fileNew;
    }


    this.loadImageFromPC.forEach((element,index)=>{
      if(index == id) {
        this.loadImageFromPC.splice(id,1);
      }
    });


    this.oldImage.forEach((element,index)=>{
      if(index == id) {
        this.motelImageDelete.push(this.oldImage[index])
      }
    });
  }

  public loadImage = async () => {
    if(this.image.length != 0 && this.motelImageDelete.length != 0){
      for(let i=0; i< this.image.length;i++){
        var temp = this.image.length;
        var filePath = `${this.motelById.title}/${this.image[i].name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.image[i]).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.imagesURLFirebare.push(url);
              if(Number(this.image.length) == Number(this.imagesURLFirebare.length)){
                this.updateMotel();
                this.deleteImageOld();
                this.addImageNew();
                this.toast.toastSuccess('Sửa thành công');
                var link = '/user/quan-ly-dang-tin';
                window.location.replace(link);
              }
            })
          })
        ) .subscribe();
      } 
    }

    if(this.motelImageDelete.length != 0 && this.image.length == 0){

      this.updateMotel();
      this.deleteImageOld();
      this.toast.toastSuccess('Sửa thành công');
      var link = '/user/quan-ly-dang-tin';
      window.location.replace(link);
    }

    if(this.image.length != 0 && this.motelImageDelete.length == 0){
      for(let i=0; i< this.image.length;i++){
        var temp = this.image.length;
        var filePath = `${this.motelById.title}/${this.image[i].name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.image[i]).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.imagesURLFirebare.push(url);
              // console.log(url)
              if(Number(this.image.length) == Number(this.imagesURLFirebare.length)){
                this.updateMotel();
                this.addImageNew();
                this.toast.toastSuccess('Sửa thành công');
                var link = '/user/quan-ly-dang-tin';
                window.location.replace(link);
              }
            })
          })
        ) .subscribe();
      } 
    }
    if(this.image.length == 0 && this.motelImageDelete.length == 0){
      if(this.address != "")
      {
        this.motelUpdate.address = this.address;
        this.motelUpdate.addressNumber = this.addressNumber;
      }
      var float32 = new Float32Array(0);
      if(this.price != float32)
      {
        this.motelUpdate.price = this.price;
      }
      if(this.areaZone != "")
      {
        this.motelUpdate.areaZone = this.areaZone;
      }
      if(this.title != "")
      {
        this.motelUpdate.title = this.title;
      }
      if(this.decription != "")
      {
        this.motelUpdate.description = this.decription;
      }
      //console.log(this.motelUpdate);
      if(this.street == undefined){

      }
      this.motelUpdate.verify = false;
      this.motelUpdate.status = "2"
      this.motelService.updateNVMotel(this.motelUpdate).subscribe(data => {
        
      });
      this.toast.toastSuccess('Sửa thành công');
      var link = '/user/quan-ly-dang-tin';
      window.location.replace(link);
    }
   
  }

  public deleteImageOld(){
    // Cập nhật image cũ
    for(let i=0; i<this.motelImageDelete.length;i++){
      this.imageService.deleteImage(Number(this.motelImageDelete[i].id)).subscribe()
    }
  }

  public addImageNew(){
    // Thêm hình mới
    var images: Image [] = [];
    for(let i=0; i<this.imagesURLFirebare.length;i++){
      var image = new Image(); 
      image.imageMotel = this.imagesURLFirebare[i];
      image.motelId = this.motelUpdate.id.toString();
      images.push(image);   
    }
    if(this.imagesURLFirebare.length){
      var motel = new Motel();
      motel.images = images;
      this.imageService.postImageMotel(motel).subscribe();
    }

   
  }

  public updateMotel(){
    // Update motel data
    if(this.address != "")
    {
      this.motelUpdate.address = this.address;
      this.motelUpdate.addressNumber = this.addressNumber;
    }
    var float32 = new Float32Array(0);
    if(this.price != float32)
    {
      this.motelUpdate.price = this.price;
    }
    if(this.areaZone != "")
    {
      this.motelUpdate.areaZone = this.areaZone;
    }
    if(this.title != "")
    {
      this.motelUpdate.title = this.title;
    }
    if(this.decription != "")
    {
      this.motelUpdate.description = this.decription;
    }
    //console.log(this.motelUpdate);
    if(this.street == undefined){

    }
    this.motelUpdate.verify = false;
    this.motelUpdate.status = "2"
    this.motelService.updateNVMotel(this.motelUpdate).subscribe(data => {
      // console.log(data);
    });
  }

}
