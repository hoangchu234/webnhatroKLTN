import { Component, Inject, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { MotelService } from '../../../../services/motel.service';
import { BillService } from '../../../../services/bill.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { Bill } from 'src/app/model/Bill';
import { Motel } from 'src/app/model/Motel';
import { Image } from 'src/app/model/Image';
import { Account } from 'src/app/model/Account';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { finalize } from 'rxjs/operators';
import { NewType } from 'src/app/model/NewType';
import { StorageService } from 'src/app/storage.service';
import { City } from 'src/app/model/City';
import { Province } from 'src/app/model/Province';
import { District } from 'src/app/model/District';
import { Street } from 'src/app/model/Street';
import { CitiesService } from 'src/app/services/cities.service';
import { DictrictService } from 'src/app/services/dictrict.service';
import { StreetService } from 'src/app/services/street.service';
import { ProvincesService } from 'src/app/services/provinces.service';
import { ToastService } from 'src/app/services/toast.service';

export interface Type{
  id:number;
  text:string;
}

export interface Data{
  lastModified:string;
  name:string;
  size:string;
  type:string
}

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  payPalConfig?: IPayPalConfig;
  showSuccess: boolean;

  //Lấy data lưu
  imageMotels : Array<Data> = [];
  load : Array<string> = [];
  loadImages: Array<string> = [];
  saveNewMotel: Motel;
  imagesURLFirebare:Array<string> = [];
  newTypeMotel;
  //currentAccount:Account;
  resultSaveMotel:Motel;

  //Xét tính tiền
  numberPayPal:number;
  money:number;

  //Load data
  loadDataToSee: Motel;
 
  constructor(private toast: ToastService,private provinceService:ProvincesService,public streetService:StreetService,public dictrictService:DictrictService,private cityService: CitiesService,private authenticationService: AuthenticationService,private router: Router,public dialogRef: MatDialogRef<PaypalComponent>,@Inject(MAT_DIALOG_DATA) public data: boolean,public dangtinService:MotelService,private billService:BillService,private storage: AngularFireStorage,private http:HttpClient,public motelService:MotelService) {
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);    
    this.money = Number(localStorage.getItem(StorageService.totalMoneyStorage)); 
    this.loadDataToSee = JSON.parse(localStorage.getItem(StorageService.motelStorage));
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    // Gía tiền
    var usd = "0.000043";
    this.numberPayPal = this.money * Number(usd);
    this.numberPayPal = Number((this.numberPayPal).toFixed(1));
    
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.numberPayPal.toString() ,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.numberPayPal.toString() // Gía tiền
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: this.numberPayPal.toString() ,// Gía tiền
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);

        console.log("Bạn phải thanh toán là:",this.money.toString());// Gía tiền
        this.onSubmit();
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

  public onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/user/quan-ly-dang-tin']);
  }

  // change base64 to file
  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });    
    return blob;
 }

  //Lưu tiền motel
  public loadImage = async () => {
    for(let i=0; i< this.imageMotels.length;i++){
      var temp = this.imageMotels.length;
      var filePath = `${this.saveNewMotel.title}/${this.imageMotels[i].name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.dataURItoBlob(this.load[i])).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.imagesURLFirebare.push(url);
            if(Number(this.imageMotels.length) == Number(this.imagesURLFirebare.length)){
              this.save();
            }
          })
        })
      ) .subscribe();
    } 
      
  }
  
  async getDataCititesById(id){
    return await this.cityService.getCityFromId(Number(id)) as City;
  }

  async getDataProvinceById(id){
    return await this.provinceService.getProvinceById(Number(id)) as Province;
  }

  async getDataDistrictById(id){
    return await this.dictrictService.getDistrictFromId(Number(id)) as District;
  }

  async getDataStreetById(id){
    return await this.streetService.getStreetFromId(Number(id)) as Street;
  }
  
  public save = async () => {
    try 
    {
      if(this.imagesURLFirebare.length){
        this.saveNewMotel.detail.typeofnewId = this.newTypeMotel.id;  
        this.saveNewMotel.userId = this.authenticationService.currentAccountValue.user.id;
        this.saveNewMotel.status = "2";

        // const city = await this.getDataCititesById(this.saveNewMotel.cityId);
        // const provicnce = await this.getDataProvinceById(this.saveNewMotel.provinceId);
        // const district = await this.getDataDistrictById(this.saveNewMotel.districtId);
        // const street = await this.getDataStreetById(this.saveNewMotel.streetId);
        // const data = street.name + ", " + district.name + ", " + provicnce.name + ", " + city.name;
        // const a = await this.motelService.getAPI(data);

        //this.motelnew.typeservice = this.new;
        //this.motelnew.time = this.datatime;

        let Finall:Image[] = [];
        for(let i=0;i<this.imagesURLFirebare.length;i++)
        {
          var image = new Image();
          image.imageMotel = this.imagesURLFirebare[i]
          Finall.push(image);
        }
        this.saveNewMotel.images = Finall;
        this.motelService.postMotel(this.saveNewMotel).subscribe(async newMotel => {
          this.resultSaveMotel = newMotel;
          var bill = new Bill();
          bill = this.saveNewMotel.bill;
          bill.motelId = newMotel.id;
          bill.payMoney=this.money;
          await this.billService.addbill(bill);
          //this.billService.addbill(bill).subscribe(data => console.log(data))
        });
        this.data = true;

        // localStorage.removeItem(StorageService.totalMoneyStorage); 
        // localStorage.removeItem(StorageService.ImageStorage); 
        // localStorage.removeItem(StorageService.loadImageStorage)
        // localStorage.removeItem(StorageService.motelStorage)
        // localStorage.removeItem(StorageService.TypeMotelStorage)
        StorageService.removeLocalPubish();

        // alert('Đăng tin thành công');
        this.toast.toastSuccess('Đăng tin thành công');

        this.dialogRef.close();
      }
      else{
        this.toast.toastError('Đăng tin thất bại');

        // alert('Đăng tin thất bại');
      }
    }
    catch (e) {
      this.toast.toastError('Đăng tin thất bại');

      // alert('Đăng tin thất bại');
      console.log(e)
    }
  }

  public onSubmit = async () => {
    this.imageMotels = JSON.parse(localStorage.getItem(StorageService.ImageStorage));
    this.loadImages = JSON.parse(localStorage.getItem(StorageService.loadImageStorage));
    for(let i=0;i < this.loadImages.length;i++){
      var link = this.loadImages[i].split(/,(.+)/)[1];
      this.load.push(link);
    }

    this.newTypeMotel = JSON.parse(localStorage.getItem(StorageService.TypeMotelStorage));

    // this.behaviorSubjectClass.getDataImages().subscribe(getimagemotel => this.imageMotels = getimagemotel);
    // this.behaviorSubjectClass.getNewTypes().subscribe(getnewtypemotel => this.newTypeMotel = getnewtypemotel);
    this.saveNewMotel = JSON.parse(localStorage.getItem(StorageService.motelStorage));
    this.loadImage();
  };


  

}

