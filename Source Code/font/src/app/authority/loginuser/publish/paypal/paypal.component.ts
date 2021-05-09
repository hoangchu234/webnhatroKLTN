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

export interface Type{
  id:number;
  text:string;
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
  imageMotels: File [] = [];
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

  constructor(private authenticationService: AuthenticationService,private router: Router,public dialogRef: MatDialogRef<PaypalComponent>,@Inject(MAT_DIALOG_DATA) public data: Motel,public dangtinService:MotelService,private billService:BillService,private storage: AngularFireStorage,private http:HttpClient,public motelService:MotelService) {
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);    
    this.money = Number(localStorage.getItem(StorageService.totalMoneyStorage)); 
    this.loadDataToSee = JSON.parse(localStorage.getItem(StorageService.motelStorage));
  }

  ngOnInit(): void {
    this.initConfig();
  }

  private initConfig(): void {
    // Gía tiền
    console.log(this.money);
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

     //Lưu tiền motel
  public loadImage = async () => {

    for(let i=0; i< this.imageMotels.length;i++){
      var temp = this.imageMotels.length;
      var filePath = `${this.saveNewMotel.title}/${this.imageMotels[i].name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.imageMotels[i]).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.imagesURLFirebare.push(url);
            console.log(url)
            if(Number(this.imageMotels.length) == Number(this.imagesURLFirebare.length)){
              this.save();
            }
          })
        })
      ) .subscribe();
    } 
      
  }
  
  public save = async () => {
    try 
    {
      if(this.imagesURLFirebare.length){
        this.saveNewMotel.detail.typeofnewId = this.newTypeMotel.id;  
        this.saveNewMotel.userId = this.authenticationService.currentAccountValue.user.id;
        this.saveNewMotel.status = "Tin đang ẩn";
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
          await this.billService.addbill(bill);

          //this.billService.addbill(bill).subscribe(data => console.log(data))
        });
        localStorage.removeItem(StorageService.motelStorage)
        alert('Đăng tin thành công');
        
      }
      else{
        alert('Đăng tin thất bại');
      }
    }
    catch (e) {
      alert('Đăng tin thất bại');
      console.log(e)
    }
  }
  
  public onSubmit = async () => {
    this.imageMotels = JSON.parse(localStorage.getItem(StorageService.ImageStorage));
    this.newTypeMotel = JSON.parse(localStorage.getItem(StorageService.TypeMotelStorage));

    // this.behaviorSubjectClass.getDataImages().subscribe(getimagemotel => this.imageMotels = getimagemotel);
    // this.behaviorSubjectClass.getNewTypes().subscribe(getnewtypemotel => this.newTypeMotel = getnewtypemotel);
    this.saveNewMotel = JSON.parse(localStorage.getItem(StorageService.motelStorage));
    this.loadImage();
  };


  /*public tinhTien(){
    var time = this.time.split(" ");
    this.bill.numberDatePublish = Number(time[0]);
    this.bill.motelId = this.data.id;
    if(this.data.typeservice == "Tin Hot"){
      if(time[1].toString() == "Ngày"){
        this.price = 50000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[0].text;
      }
      if(time[1].toString() == "Tuần"){
        this.price = 315000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[1].text;
      }
      if(time[1].toString() == "Tháng"){
        this.price = 120000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[2].text;
      }
    }
    if(this.data.typeservice == "Tin VIP 3"){
      if(time[1].toString() == "Ngày"){
        this.price = 30000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[0].text;
      }
      if(time[1].toString() == "Tuần"){
        this.price = 190000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[1].text;
      }
      if(time[1].toString() == "Tháng"){
        this.price = 800000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[2].text;
      }
    }
    if(this.data.typeservice == "Tin VIP 2"){
      if(time[1].toString() == "Ngày"){
        this.price = 20000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[0].text;
      }
      if(time[1].toString() == "Tuần"){
        this.price = 133000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[1].text;
      }
      if(time[1].toString() == "Tháng"){
        this.price = 540000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[2].text;
      }
    }
    if(this.data.typeservice == "Tin VIP 1"){
      if(time[1].toString() == "Ngày"){
        this.price = 10000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[0].text;
      }
      if(time[1].toString() == "Tuần"){
        this.price = 63000

        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[1].text;
      }
      if(time[1].toString() == "Tháng"){
        this.price = 240000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[2].text;
      }
    }
    if(this.data.typeservice == "Tin thường"){
      if(time[1].toString() == "Ngày"){
        this.price = 2000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[0].text;
      }
      if(time[1].toString() == "Tuần"){
        this.price = 12000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[1].text;
      }
      if(time[1].toString() == "Tháng"){
        this.price = 48000
        this.bill.payMoney = Number(time[0])*this.price;
        this.bill.timeChoice = this.times[2].text;
      }
    }
  }*/

}

