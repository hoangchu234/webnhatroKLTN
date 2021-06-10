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
import { NewType } from 'src/app/model/NewType';
import { TypeofnewService } from 'src/app/services/newstype.service';
import { CitiesService } from 'src/app/services/cities.service';
import { ProvincesService } from 'src/app/services/provinces.service';
import { City } from 'src/app/model/City';
import { Province } from 'src/app/model/Province';
import { PaypalComponent } from '../../publish/paypal/paypal.component';
import { MatDialog } from '@angular/material/dialog';
import { StorageService } from 'src/app/storage.service';

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
  hasSave = false;
  loadImageFromPC: string [] = [];
  firstImage = "";

  constructor(public dialog: MatDialog,private cityService: CitiesService, private provinceService: ProvincesService,private typeservice:TypeofnewService,private priceService: ServicePriceService,private router: Router,private authenticationService: AuthenticationService,private _sanitizer: DomSanitizer,private storage: AngularFireStorage,private http:HttpClient,public motelService:MotelService) {
  
    this.currentAccount = this.authenticationService.currentAccountValue;
    this.loadData();
    this.money = localStorage.getItem(StorageService.totalMoneyStorage); 
    if(this.authenticationService.currentAccountValue.user.userImage != null)
    {
      this.checkImage = true;
    }
  }

  

  ngOnInit(): void {
    this.getImage();
  }

  public async loadData(){
    this.loadDataToSee = JSON.parse(localStorage.getItem(StorageService.motelStorage));

    const result = await this.cityService.getCityFromId(Number(this.loadDataToSee.cityId)) as City;
    this.loadDataCity = result.name;

    const province = await this.provinceService.getProvinceById(Number(this.loadDataToSee.provinceId)) as Province;
    this.loadDataProvince = province.name;

    var getnewtypemotel = JSON.parse(localStorage.getItem(StorageService.TypeMotelStorage));
    this.loadDataType = getnewtypemotel.name;


  }

  getImage(){
    var data = JSON.parse(localStorage.getItem(StorageService.loadImageStorage));
    this.loadImageFromPC = data.slice();
    this.firstImage = this.loadImageFromPC[0];
    this.loadImageFromPC.shift();
  }

  public step1(){
    this.router.navigateByUrl('/user/thong-tin-vi-tri');
  }
  public step2(){
    this.router.navigateByUrl('/user/thong-tin-nha-tro');
  }
  public step3(){
    this.router.navigateByUrl('/user/thong-tin-chi-tiet-nha-tro');
  }
  public step4(){
    this.router.navigateByUrl('/user/thong-tin-hinh-anh');
  }
  public step5(){
    this.router.navigateByUrl('/user/goi-thanh-toan');
  }
  
  //Thanh toán
  public openDialogUser(): void {
    const dialogRef = this.dialog.open(PaypalComponent, {
     width: '400px',
     height:'400px',
     data:this.hasSave
    });

    dialogRef.afterClosed().subscribe((result: boolean) => { 
      if(localStorage.getItem(StorageService.totalMoneyStorage) == undefined && 
      localStorage.getItem(StorageService.ImageStorage) == undefined && 
      localStorage.getItem(StorageService.loadImageStorage) == undefined && 
      localStorage.getItem(StorageService.motelStorage) == undefined && 
      localStorage.getItem(StorageService.TypeMotelStorage) == undefined){
        this.router.navigateByUrl('/user/thong-tin-vi-tri');
      }
      
    });
  }
}
