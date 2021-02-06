import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Motel } from '../../../../model/Motel';
import { Image } from '../../../../model/Image';
import { Account } from '../../../../model/Account';
import { MotelService } from '../../../../services/motel.service';
import { ServicePriceService } from '../../../../services/service-price.service';

import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService} from '../../../../services/authentication.service'

import { Router } from '@angular/router';
import { BehaviorSubjectClass } from '../../../../services/behaviorsubject'
import { NewType } from 'src/app/model/NewType';
import { TypeofnewService } from 'src/app/services/newstype.service';
import { CitiesService } from 'src/app/services/cities.service';
import { ProvincesService } from 'src/app/services/provinces.service';
import { City } from 'src/app/model/City';
import { Province } from 'src/app/model/Province';
import { PaypalComponent } from '../../publish/paypal/paypal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-thanh-toan-dong',
  templateUrl: './thanh-toan-dong.component.html',
  styleUrls: ['./thanh-toan-dong.component.css']
})
export class ThanhToanDongComponent implements OnInit {

  currentAccount:Account;
  money:string;
  checkImage = false;
  loadDataToSee: Motel;
  loadDataType:string = "";
  loadDataCity:string = "";
  loadDataProvince:string = "";
  constructor(public dialog: MatDialog,private cityService: CitiesService, private provinceService: ProvincesService,private typeservice:TypeofnewService,private behaviorSubjectClass: BehaviorSubjectClass,private priceService: ServicePriceService,private router: Router,private authenticationService: AuthenticationService,private _sanitizer: DomSanitizer,private storage: AngularFireStorage,private http:HttpClient,public motelService:MotelService) {
  
    this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
    this.loadData();
    this.money = localStorage.getItem('totalMoney'); 
    if(this.currentAccount.user.userImage != null)
    {
      this.checkImage = true;
    }
  }

  

  ngOnInit(): void {
    
  }

  public loadData(){
    this.loadDataToSee = JSON.parse(localStorage.getItem('PublishMotel'));
    console.log(this.loadDataToSee)
    this.behaviorSubjectClass.getNewTypes().subscribe(getnewtypemotel => {
      this.loadDataType = getnewtypemotel.name
    });
    this.cityService.getCityFromId(Number(this.loadDataToSee.cityId)).subscribe(getcity => {
      this.loadDataCity = getcity.name;

    })
    this.provinceService.getProvinceById(Number(this.loadDataToSee.provinceId)).subscribe(getprovince => {
      this.loadDataProvince = getprovince.name;

    })
  }

  public prevous(){
    this.router.navigateByUrl('/user/goi-thanh-toan');
  }
  
  //Thanh toán
  public openDialogUser(): void {
    const dialogRef = this.dialog.open(PaypalComponent, {
     width: '400px',
     height:'400px'
    });

    dialogRef.afterClosed().subscribe((result: Motel) => { 
      localStorage.removeItem('totalMoney'); 
      var file: File[];
      var newType: NewType;
      this.behaviorSubjectClass.setDataImages(file);
      localStorage.removeItem('PublishMotel')
      this.behaviorSubjectClass.setNewTypes(newType);
      this.router.navigateByUrl('/user/danh-muc');
    });
  }
}
