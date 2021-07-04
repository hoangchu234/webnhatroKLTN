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
import { Serviceprice } from 'src/app/model/Serviceprice';
import { ServicePriceService } from 'src/app/services/service-price.service';
import { BillService } from 'src/app/services/bill.service';
import { Bill } from 'src/app/model/Bill';
import { ExtendPaypalComponent } from './extend-paypal/extend-paypal.component';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/storage.service';
import { Direct } from 'src/app/model/Direct';
import { New } from 'src/app/model/New';
import { Time } from 'src/app/model/Time';
import { ChangeTime } from 'src/app/model/ChangeTime';
import { ToastService } from 'src/app/services/toast.service';

export interface Data{
  id:number;
  text:string;
}

@Component({
  selector: 'app-detail-motel-extend',
  templateUrl: './detail-motel-extend.component.html',
  styleUrls: ['./detail-motel-extend.component.css']
})
export class DetailMotelExtendComponent implements OnInit {

  motel: Motel[] = [];
  newTypes: NewType [] = [];
  newType;

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
  typePriceMotel;

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
  directs: Array<Direct> = [];
  
  directsShow: Direct[] = [];
  direct;

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
  price = new Float32Array(0);
  areaZone:string = "";
  title:string = "";
  decription:string = "";

  servicePrice: Serviceprice[] = [];
  news:Array<New> = [];
  times:Array<Time> = [];
  
  // public news:Array<Data> = [
  //   {id: 0, text:'Tin Hot'}, // 4 tuần, 2 tuần
  //   {id: 1, text:'Tin VIP 3'}, // 
  //   {id: 2, text:'Tin VIP 2'},
  //   {id: 3, text:'Tin VIP 1'},
  //   {id: 4, text:'Tin thường'},
  // ];
  
  // public times:Array<Data> = [
  //   {id: 0, text:'Đăng theo ngày'}, 
  //   {id: 1, text:'Đăng theo tuần'}, 
  //   {id: 2, text:'Đăng theo tháng'},
  // ];

  time: string;

  // public months:Array<Data> = [
  //   {id: 0, text:'1 Tháng'}, 
  //   {id: 1, text:'2 Tháng'}, 
  //   {id: 2, text:'3 Tháng'}, 
  //   {id: 3, text:'4 Tháng'}, 
  //   {id: 4, text:'5 Tháng'}, 
  //   {id: 5, text:'6 Tháng'}, 
  //   {id: 6, text:'7 Tháng'}, 
  //   {id: 7, text:'8 Tháng'}, 
  //   {id: 8, text:'9 Tháng'}, 
  //   {id: 9, text:'10 Tháng'}, 
  //   {id: 10, text:'11 Tháng'}, 
  //   {id: 11, text:'12 Tháng'}, 
  // ];

  // public days:Array<Data> = [
  //   {id: 0, text:'6 Ngày'}, 
  //   {id: 1, text:'7 Ngày'}, 
  //   {id: 2, text:'8 Ngày'}, 
  //   {id: 3, text:'9 Ngày'}, 
  //   {id: 4, text:'10 Ngày'}, 
  //   {id: 5, text:'11 Ngày'}, 
  //   {id: 6, text:'12 Ngày'}, 
  //   {id: 7, text:'13 Ngày'}, 
  //   {id: 8, text:'14 Ngày'}, 
  //   {id: 9, text:'15 Ngày'}, 
  //   {id: 10, text:'16 Ngày'}, 
  //   {id: 11, text:'17 Ngày'}, 
  // ];

  // public weeks:Array<Data> = [
  //   {id: 0, text:'1 Tuần'}, 
  //   {id: 1, text:'2 Tuần'}, 
  //   {id: 2, text:'3 Tuần'}, 
  //   {id: 3, text:'4 Tuần'}, 
  //   {id: 4, text:'5 Tuần'}, 
  //   {id: 5, text:'6 Tuần'}, 
  //   {id: 6, text:'7 Tuần'}, 
  //   {id: 7, text:'8 Tuần'}, 
  //   {id: 8, text:'9 Tuần'}, 
  //   {id: 9, text:'10 Tuần'}, 
  // ];

  setValueName: string = "Số ngày";
  setArrayChoices: Array<ChangeTime> = [];

  new: string;
  timePublish:string;
  //Xét tính tiền
  totalprice:number = 0;
  type:string[] = [];
  priceBill:string = "";
  motelById: Motel;

  constructor(private toast: ToastService,private router: ActivatedRoute,private billService:BillService,private priceService: ServicePriceService,public dialog: MatDialog,public streetService:StreetService,public dictrictService:DictrictService,private storage: AngularFireStorage,private imageService: ImageService,private cityService: CitiesService, private provinceService: ProvincesService,private authenticationService: AuthenticationService,private typeservice:TypeofnewService,public motelService:MotelService) {
    
  }

  async ngOnInit(): Promise<void> {
    const id = this.router.snapshot.paramMap.get("id");
    this.motelById = await this.getDataMotelById(id);

    this.getNewTypes();
    this.getCities();
    this.getLiveType();
    this.getTypePrice();
    this.getDirectData();

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


    //Xét bill
    // this.setArrayChoices = this.days;
    // this.new = 'Tin Hot';
    // this.time = 'Đăng theo ngày';
    // this.timePublish = '6 Ngày'
    this.getDataNew();
    this.getDataTime();
    this.getServicePrices();

    this.tinhTien();
  }

  
  async getDataNew(){
    this.news = await this.motelService.getNew() as New[];
    this.new = this.news[0].newName;
  }

  async getDataTime(){
    this.times = await this.motelService.getTime() as Time[];
    this.time = this.times[0].timeName;
    await this.getDataChangeTime(this.times[0].id);
    this.timePublish = this.setArrayChoices[0].changeTimeName;
    this.tinhTien();
  }

  async getDataChangeTime(typeTime: number){
    this.setArrayChoices = await this.motelService.getChangeTime(typeTime) as ChangeTime[];
  }

  async getDirectData(){
    var data = await this.motelService.getDirect() as Direct[];
    var index = data.findIndex(a => a.directName === this.motelById.detail.director);
    this.directsShow.push(data[index]);
    data.splice(index,1);
    for(let i=0; i<data.length;i++){
      this.directsShow.push(data[i]);
    }
    this.direct = this.directsShow[0].directName.toString();
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
  }

  // public getDirect(){
  //   for(let i=0 ;i<this.directs.length; i++){
  //     if(this.motelById.detail.director == this.directs[i].directName){
  //       this.directsShow.push(this.directs[i])
  //       break;
  //     }
  //   }
  //   for(let i=0 ;i<this.directs.length; i++){
  //     if(this.motelById.detail.director != this.directs[i].directName){
  //       this.directsShow.push(this.directs[i])
  //     }
  //   }
  // }

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
    const result = await this.cityService.getCitys() as City[];
    for(let i=1; i< result.length; i++){
      if(result[i].id == this.motelById.cityId){
        this.cities.push(result[i]);
        this.city = result[i];
        this.getProvinceById(result[i].id)
        break;
      }
    }

    for(let i=1; i< result.length; i++){
      if(result[i].id != this.motelById.cityId){
        this.cities.push(result[i]);
      }
    }
  }

  public async getProvinceById(ID){
    const result = await this.provinceService.getProvincesByCity(Number(ID)) as Province[];
    for (let i = 0; i < result.length; i++) {
      if(result[i].id == this.motelById.provinceId){
        this.provinces.push(result[i]);
        this.procince = result[i];
        this.getStreetById(result[i].id)
        this.getDistricteById(result[i].id)
        break;
      }
    }
    for (let i = 1; i < result.length; i++) {
      if(result[i].id != this.motelById.provinceId){
        this.provinces.push(result[i]);
      }
    }


    /*const list = this.provinceService.getProvincesByCity(Number(ID)).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if(data[i].id == this.motelById.provinceId){
          this.provinces.push(data[i]);
          this.procince = data[i];
          this.getStreetById(data[i].id)
          this.getDistricteById(data[i].id)
          break;
        }
      }

      for (let i = 1; i < data.length; i++) {
        if(data[i].id != this.motelById.provinceId){
          this.provinces.push(data[i]);
        }
      }

    })*/
  }

  public async getStreetById(ID){
    const result = await this.streetService.getStreetByProvince(Number(ID)) as Street[];
    for (let i = 0; i < result.length; i++) {
      if(result[i].id == this.motelById.streetId){
        this.streets.push(result[i]);
        this.street = result[i];
        break;
      }
    }
    for (let i = 1; i < result.length; i++) {
      if(result[i].id != this.motelById.streetId){
        this.streets.push(result[i]);
      }
    }
    if(result.length == 0){
      this.motelUpdate.streetId = "0"
    }
      /*const list = this.streetService.getStreetByProvince(Number(ID)).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          if(data[i].id == this.motelById.streetId){
            this.streets.push(data[i]);
            this.street = data[i];
            break;
          }
        }
        for (let i = 1; i < data.length; i++) {
          if(data[i].id != this.motelById.streetId){
            this.streets.push(data[i]);
          }
        }
        if(data.length == 0){
          this.motelUpdate.streetId = "0"
        }
      })*/
  }

  /*public getDistricteById(ID){
        const list = this.dictrictService.getDistrictByProvince(Number(ID)).subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
            if(data[i].id == this.motelById.districtId){
              this.districts.push(data[i]);
              this.district = data[i];
              break;
            }
          }
          for (let i = 1; i < data.length; i++) {
            if(data[i].id != this.motelById.districtId){
              this.districts.push(data[i]);
            }
          }
        
      })
  }*/
  public async getDistricteById(ID){
    const result = await this.dictrictService.getDistrictByProvince(Number(ID)) as District[];
    for (let i = 0; i < result.length; i++) {
      if(result[i].id == this.motelById.districtId){
        this.districts.push(result[i]);
        this.district = result[i];
        break;
      }
    }
    for (let i = 1; i < result.length; i++) {
      if(result[i].id != this.motelById.districtId){
        this.districts.push(result[i]);
      }
    }
  }

  public getNewTypes = async () => {
    const result = await this.typeservice.getTypeExcepts() as NewType[];
    for (let i = 0; i < result.length; i++) {
      if(this.motelById.detail.typeofnewId.toString() == result[i].id){
        this.newTypes.push(result[i]);

        break;
      }
    }
    for (let i = 0; i < result.length; i++) {
      if(this.motelById.detail.typeofnewId.toString() != result[i].id){
        this.newTypes.push(result[i]);
      }
    }
  }


  //Edit new
  public onChangeNewType(event)
  {
    let value = event.target.value;
    this.newType = value;
    var id = this.newTypes.find(a => a.name == value);
    this.motelUpdate.detail.typeofnewId = Number(id.id);
  }

  public onChangeCity(event)
  {
    let value = event.target.value;
    this.city = value;
    var id = this.cities.find(a => a.name == value);
    var provinceNew: Province[] = [];
    this.provinces = provinceNew;
    this.getProvinceById(id.id);
    this.motelUpdate.cityId = id.id;
  }

  public onChangeProvince(event)
  {
    let value = event.target.value;
    this.procince = value;
    var id = this.provinces.find(a => a.name == value);

    var districtNew: District[] = [];
    this.districts = districtNew;
    var streetNew: Street[] = [];
    this.districts = districtNew;
    this.streets = streetNew;
    this.getDistricteById(id.id);
    this.getStreetById(id.id);
    this.motelUpdate.provinceId = id.id;
  }

  public onChangeDistrict(event)
  {
    let value = event.target.value;
    this.district = value;
    var id = this.districts.find(a => a.name == value);
    console.log(id)
    this.motelUpdate.districtId = id.id;
  }

  public onChangeStreet(event)
  {
    let value = event.target.value;
    this.street = value;
    var id = this.streets.find(a => a.name == value);
    console.log(id)
    this.motelUpdate.streetId = id.id;
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
    this.direct = value;
    this.motelUpdate.detail.director = value;
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


  // Bill
  public async getServicePrices(){
    this.servicePrice = await this.priceService.getServiceprices() as Serviceprice[];
  }

  public onChangeSetValueName(event){
    let value = event.target.value;
    var name = this.setArrayChoices.find(a => a.id == value);
    this.timePublish = name.changeTimeName;
    this.tinhTien();
  }

  public async onChangetime(event){
    let value = event.target.value;
    await this.getDataChangeTime(value);   
    this.timePublish = this.setArrayChoices[0].changeTimeName;
    var name = this.times.find(a => a.id == value);
    this.time = name.timeName;  
    this.tinhTien();
  }

  public onChangeNewMotel(event)
  {
    let value = event.target.value;
    var name = this.news.find(a => a.id == value);
    this.new = name.newName;
    this.tinhTien();
  }

 

  public tinhTien(){
    var data = this.servicePrice.find(a => a.typeofnew == this.new);
    if(this.time == "Đăng theo ngày"){
      this.priceBill = data.priceDate.split(" ")[0];
      this.type = this.timePublish.split(" ");
      this.totalprice = (Number(this.type[0]))*(Number(this.price)*1000);
    }
    else if(this.time == "Đăng theo tuần"){
      this.priceBill = data.priceWeek.split(" ")[0];
      this.type = this.timePublish.split(" ");
      this.totalprice = (Number(this.type[0]))*(Number(this.price)*1000);
    }
    else if(this.time == "Đăng theo tháng"){
      this.priceBill = data.priceMonth.split(" ")[0];
      this.type = this.timePublish.split(" ");
      this.totalprice = (Number(this.type[0]))*(Number(this.price)*1000);
    }
  }

  public loadImage = async () => {
    //console.log(this.motelImageDelete)//hình cũ đã xóa
    //console.log(this.oldImage) //hình cũ
    //console.log(this.image) //hình mới

    
    
      
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
                console.log("1 1")
                console.log(url)
                this.updateMotel();
                this.deleteImageOld();
                this.addImageNew();
                this.addBill();
                // alert("Sửa thành công")
                this.toast.toastSuccess('Sửa thành công');
                window.location.reload();
              }
            })
          })
        ) .subscribe();
      } 
    }

    if(this.motelImageDelete.length != 0 && this.image.length == 0){

      this.updateMotel();
      this.deleteImageOld();
      this.addBill();
      // alert("Sửa thành công")
      this.toast.toastSuccess('Sửa thành công');

      window.location.reload();
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
              console.log(url)
              if(Number(this.image.length) == Number(this.imagesURLFirebare.length)){
                this.updateMotel();
                this.addImageNew();
                this.addBill();
                // alert("Sửa thành công")
                this.toast.toastSuccess('Sửa thành công');

                window.location.reload();
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
      this.motelService.updateExtendMotel(this.motelUpdate).subscribe(data => {
        this.addBill();
      });
      // alert("Sửa thành công")
      this.toast.toastSuccess('Sửa thành công');

    
      window.location.reload();
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
      this.imageService.postImageMotel(motel).subscribe(data =>{
        
      });
    }

    
  }

  public updateMotel(){
    // Update motel data
    if(this.address != "")
    {
      this.motelUpdate.address = this.address;
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
    this.motelUpdate.status = "2";
    this.motelService.updateExtendMotel(this.motelUpdate).subscribe(data => {
      // console.log(data);
    });
  }

  public openDialogExtendPaypal(): void {
    const dialogRef = this.dialog.open(ExtendPaypalComponent, {
     width: '500px',
     height:'500px',
     data: this.totalprice
    });

    dialogRef.afterClosed().subscribe((result: Motel) => {
      if(localStorage.getItem(StorageService.totalMoneyStorage)){
        this.loadImage()
      }
    });
  }

  public async addBill(){
    var bill = new Bill();
    bill.motelId = this.motelUpdate.id;

    var usd = "0.000043";
    bill.payMoney =  Number(localStorage.getItem(StorageService.totalMoneyStorage));
  
    var t = this.timePublish.split(" ");
    bill.numberDatePublish = Number(t[0]);
    bill.timeChoice = this.time;
    console.log(bill)
    await this.billService.addbill(bill);
    localStorage.removeItem("money");
  }
}
