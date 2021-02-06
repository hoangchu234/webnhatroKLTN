import { Component, Inject, OnInit } from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { MotelService } from '../../../../../services/motel.service';
import { BillService } from '../../../../../services/bill.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { Bill } from 'src/app/model/Bill';
import { Motel } from 'src/app/model/Motel';
import { Image } from 'src/app/model/Image';
import { Account } from 'src/app/model/Account';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubjectClass } from 'src/app/services/behaviorsubject';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { finalize } from 'rxjs/operators';
import { NewType } from 'src/app/model/NewType';

@Component({
  selector: 'app-extend-paypal',
  templateUrl: './extend-paypal.component.html',
  styleUrls: ['./extend-paypal.component.css']
})
export class ExtendPaypalComponent implements OnInit {

  payPalConfig?: IPayPalConfig;
  showSuccess: boolean;

  //Xét tính tiền
  numberPayPal:number;
  money:number;
  constructor(private authenticationService: AuthenticationService,private behaviorSubjectClass: BehaviorSubjectClass,private router: Router,public dialogRef: MatDialogRef<ExtendPaypalComponent>,@Inject(MAT_DIALOG_DATA) public data: number,public dangtinService:MotelService,private billService:BillService,private storage: AngularFireStorage,private http:HttpClient,public motelService:MotelService) { 
    this.money = this.data;

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
    localStorage.setItem("money",this.numberPayPal.toString());
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
        this.onNoClick();
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
  }

}
