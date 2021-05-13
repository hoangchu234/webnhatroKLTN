import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MotelService } from '../../../../services/motel.service';
import { Motel } from 'src/app/model/Motel';
import { DialogThongBaoComponent } from '../dialog-thong-bao/dialog-thong-bao.component';
import { MatDialog } from '@angular/material/dialog';
import { Image } from 'src/app/model/Image';
import { StorageService } from 'src/app/storage.service';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Bill } from 'src/app/model/Bill';
import { HttpClient } from '@angular/common/http';

export interface Data{
  lastModified:string;
  name:string;
  size:string;
  type:string
}

@Component({
  selector: 'app-thong-tin-hinh-anh',
  templateUrl: './thong-tin-hinh-anh.component.html',
  styleUrls: ['./thong-tin-hinh-anh.component.css']
})
export class ThongTinHinhAnhComponent implements OnInit {

  image: File [] = [];
  checkLoad;

  loadImageFromPC: string [] = [];
  imageprevous:File [] = [];
  hasData = 0;
  dataUser: User;

  checkImage: Array<Data> = [];
  constructor(private http: HttpClient,public dialog: MatDialog,private router: Router,public motelService:MotelService,private authenticationService: AuthenticationService) { 
    this.dataUser = this.authenticationService.currentAccountValue.user;
    var jsonFile = localStorage.getItem(StorageService.loadImageStorage);
    var image = JSON.parse(jsonFile);
    if(image != undefined){
      this.imageprevous = image;
      if(this.imageprevous.length != null){
        this.image = this.imageprevous;
        this.hasData = this.imageprevous.length;
      }
      this.loadImageFromPC.splice(0,this.loadImageFromPC.length);
      this.loadImageFromPC = image.slice();
      this.checkLoad = "load";
    }

    var list = JSON.parse(localStorage.getItem(StorageService.ImageStorage));
    if(list != undefined){
      this.checkImage = JSON.parse(localStorage.getItem(StorageService.ImageStorage))
    }
  }

  ngOnInit(): void {
   
  }

  public handleFileInput(event) {

    var files: FileList;
    files = event.target.files;
    for(let i=0; i< files.length; i++)
    {
      this.image.push(files.item(i)) // lấy hình
      this.checkImage.push(this.createNewObject(files.item(i)));

      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (event: any) => {
        this.loadImageFromPC.push(event.target.result);
      }   

    }
    this.checkLoad = "load";

  }

  public onDelete(index){
    // if(this.image.length == 1){
    //   var fileNew : File[] =[];
    //   this.image = fileNew;
    // }

    this.image.splice(index,1);
    this.checkImage.splice(index,1);
    this.loadImageFromPC.splice(index,1);
    // this.loadImageFromPC = new Array<string>()
    // for(let i=0; i< this.image.length; i++)
    // {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(this.image[i]);
    //   reader.onload = (event: any) => {
    //     this.loadImageFromPC.push(event.target.result)
    //   }   
    // }

  }

  createNewObject(image){
    var newObject : Data = {
      lastModified      : image.lastModified,
      name              : image.name,
      size              : image.size,
      type              : image.type
    };
    return newObject;
  }

  public next(){
    if(this.image.length){
      
      // var images : Array<Object> = [];
      // for(let i=0; i<this.checkImage.length;i++){
      //   images.push(this.checkImage[i]);
      // }

      // for(let i=0; i<this.image.length;i++){
      //   var newObject  = {
      //     'lastModified'      : this.image[i].lastModified,
      //     'name'              : this.image[i].name,
      //     'size'              : this.image[i].size,
      //     'type'              : this.image[i].type
      //   };
      //   images.push(newObject);
      // }

      var setImage = JSON.stringify(this.checkImage);
      localStorage.setItem(StorageService.loadImageStorage, JSON.stringify(this.loadImageFromPC));
      localStorage.setItem(StorageService.ImageStorage, setImage);
      this.router.navigateByUrl('/user/goi-thanh-toan');

      // if(this.dataUser.pubishFree == 0){
      //   this.router.navigateByUrl('/user/goi-thanh-toan');
      // }
      // else{
      //   var motel = JSON.parse(localStorage.getItem(StorageService.motelStorage));
      //   motel.typeservice = "Tin thường";
      //   motel.time = '2 Tuần';
      //   let bill = new Bill();
      //   bill.payMoney = 0;
      //   bill.numberDatePublish = 2;
      //   bill.timeChoice = 'Đăng theo tuần';
      //   motel.bill = bill;
      //   localStorage.removeItem(StorageService.motelStorage)
      //   localStorage.setItem(StorageService.motelStorage, JSON.stringify(motel));
      //   localStorage.setItem(StorageService.totalMoneyStorage, "0");
      //   this.router.navigateByUrl('/user/thanh-toan-dong'); 
      // }

    }
    else{
      this.openDialog();
    }

  }

  public prevous(){
    this.router.navigateByUrl('/user/thong-tin-chi-tiet-nha-tro');
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogThongBaoComponent, {
      direction: "ltr",
      width: '400px'
    });
 
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}
