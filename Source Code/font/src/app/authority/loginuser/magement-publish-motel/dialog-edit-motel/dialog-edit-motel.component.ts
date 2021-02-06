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
import { DialogDetailMotelPublishComponent } from 'src/app/authority/loginadmin/dialog-detail-motel-publish/dialog-detail-motel-publish.component';

export interface Data{
  id:number;
  text:string;
}

@Component({
  selector: 'app-dialog-edit-motel',
  templateUrl: './dialog-edit-motel.component.html',
  styleUrls: ['./dialog-edit-motel.component.css']
})
export class DialogEditMotelComponent implements OnInit {

  motel: Motel[] = [];
  newTypes: NewType [] = [];
  newType;

  currentAccount:Account;
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

  directs:Array<Data> = [
    {id: 0, text:'Đông'},
    {id: 1, text:'Tây'},
    {id: 2, text:'Nam'},
    {id: 3, text:'Bắc'},
    {id: 4, text:'Đông Bắc'},
    {id: 5, text:'Đông Nam'},
    {id: 6, text:'Tây Bắc'},
    {id: 7, text:'Tây Nam'},
  ];
  directsShow: Data[] = [];
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

  checkSaveImage = false;
  constructor(public dialog: MatDialog,public streetService:StreetService,public dictrictService:DictrictService,private storage: AngularFireStorage,private imageService: ImageService,private cityService: CitiesService, private provinceService: ProvincesService,private authenticationService: AuthenticationService,private typeservice:TypeofnewService,public dialogRef: MatDialogRef<DialogEditMotelComponent>,@Inject(MAT_DIALOG_DATA) public data: Motel,public motelService:MotelService) {
    this.getNewTypes();
    this.getCities();
    this.getLiveType();
    this.getTypePrice();
    this.getDirect();

    this.address = this.data.address;
    this.price = this.data.price;
    this.areaZone = this.data.areaZone;
    this.title = this.data.title;
    this.decription = this.data.description;


    if(this.data.status == "Tin đã hết hạn"){
      this.checkOutOfDate = true;
    }

    this.motelUpdate = this.data;
    // load image
    for(let i=0 ;i< this.data.images.length;i++){
      this.loadImageFromPC.push(this.data.images[i].imageMotel)
    }

    this.oldImage = this.data.images;

    this.numberBath = this.data.detail.numberBath.toString();
    this.numberLiving = this.data.detail.numberLiving.toString();

    this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);    
    this.phoneMotel = this.data.phone;
  }

  ngOnInit(): void {

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
      if(this.data.priceType == this.typePriceMotels[i].text){
        this.typePriceShowMotels.push(this.typePriceMotels[i])
        break;
      }
    }
    for(let i=0 ;i<this.typePriceMotels.length; i++){
      if(this.data.priceType != this.typePriceMotels[i].text){
        this.typePriceShowMotels.push(this.typePriceMotels[i])
      }
    }
  }

  public getDirect(){
    for(let i=0 ;i<this.directs.length; i++){
      if(this.data.detail.director == this.directs[i].text){
        this.directsShow.push(this.directs[i])
        break;
      }
    }
    for(let i=0 ;i<this.directs.length; i++){
      if(this.data.detail.director != this.directs[i].text){
        this.directsShow.push(this.directs[i])
      }
    }
  }

  public getLiveType(){
    this.motelService.getLiveTypes().subscribe(getlivetype => {
      this.liveTypes = getlivetype
      for(let i=0;i<getlivetype.length;i++){
        if(this.data.detail.liveTypeId == getlivetype[i].id)
        {
          this.arrayTrue.push(true);
        }
        else{
          this.arrayTrue.push(false);
        }
      }
    })
  }

  public getCities(){
    this.cityService.getCitys().subscribe(getcity => {
      for(let i=1; i< getcity.length; i++){
        if(getcity[i].id == this.data.cityId){
          this.cities.push(getcity[i]);
          this.city = getcity[i];
          this.getProvinceById(getcity[i].id)
          break;
        }
      }

      for(let i=1; i< getcity.length; i++){
        if(getcity[i].id != this.data.cityId){
          this.cities.push(getcity[i]);
        }
      }
    })
  }

  public getProvinceById(ID){
    const list = this.provinceService.getProvincesByCity(Number(ID)).subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        if(data[i].id == this.data.provinceId){
          this.provinces.push(data[i]);
          this.procince = data[i];
          this.getStreetById(data[i].id)
          this.getDistricteById(data[i].id)
          break;
        }
      }

      for (let i = 1; i < data.length; i++) {
        if(data[i].id != this.data.provinceId){
          this.provinces.push(data[i]);
        }
      }

    })
  }

  public getStreetById(ID){
      const list = this.streetService.getStreetByProvince(Number(ID)).subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          if(data[i].id == this.data.streetId){
            this.streets.push(data[i]);
            this.street = data[i];
            break;
          }
        }
        for (let i = 1; i < data.length; i++) {
          if(data[i].id != this.data.streetId){
            this.streets.push(data[i]);
          }
        }
        if(data.length == 0){
          this.motelUpdate.streetId = "0"
        }
      })
  }

  public getDistricteById(ID){
        const list = this.dictrictService.getDistrictByProvince(Number(ID)).subscribe((data) => {
          for (let i = 0; i < data.length; i++) {
            if(data[i].id == this.data.districtId){
              this.districts.push(data[i]);
              this.district = data[i];
              break;
            }
          }
          for (let i = 1; i < data.length; i++) {
            if(data[i].id != this.data.districtId){
              this.districts.push(data[i]);
            }
          }
        
      })
  }

  public getNewTypes = async () => {
    this.typeservice.getTypeExcepts().subscribe(gettypes => {
      for (let i = 0; i < gettypes.length; i++) {
        if(this.data.detail.typeofnewId.toString() == gettypes[i].id){
          this.newTypes.push(gettypes[i]);

          break;
        }
      }
      for (let i = 0; i < gettypes.length; i++) {
        if(this.data.detail.typeofnewId.toString() != gettypes[i].id){
          this.newTypes.push(gettypes[i]);
        }
      }
    });
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

  public onChangeLiveType(event, liveTypes: LiveType)
  {
    this.liveType = liveTypes.nameType;
    this.motelService.getLiveTypes().subscribe(getlivetype => {
      var id = getlivetype.find(a => a.nameType == this.liveType)
      this.motelUpdate.detail.liveTypeId = id.id;
    })
   
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
    //console.log(this.motelImageDelete)//hình cũ đã xóa
    //console.log(this.oldImage) //hình cũ
    //console.log(this.image) //hình mới

    
    
      
    if(this.image.length != 0 && this.motelImageDelete.length != 0){
      for(let i=0; i< this.image.length;i++){
        var temp = this.image.length;
        var filePath = `${this.data.title}/${this.image[i].name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
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
                alert("Sửa thành công")
                this.dialogRef.close();
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
      alert("Sửa thành công")
      this.dialogRef.close();
      window.location.reload();
    }

    if(this.image.length != 0 && this.motelImageDelete.length == 0){
      for(let i=0; i< this.image.length;i++){
        var temp = this.image.length;
        var filePath = `${this.data.title}/${this.image[i].name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.image[i]).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.imagesURLFirebare.push(url);
              console.log(url)
              if(Number(this.image.length) == Number(this.imagesURLFirebare.length)){
                console.log("1 0")
                this.updateMotel();
                this.addImageNew();
                alert("Sửa thành công")
                this.dialogRef.close();
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
      this.motelService.updateNVMotel(this.motelUpdate).subscribe(data => {
        console.log(data);
      });
      alert("Sửa thành công")
      this.dialogRef.close();
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
      this.imageService.postImageMotel(motel).subscribe();
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
    this.motelService.updateNVMotel(this.motelUpdate).subscribe(data => {
      console.log(data);
    });
  }
  
}
