import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MotelService } from '../../../../services/motel.service';
import { BehaviorSubjectClass } from '../../../../services/behaviorsubject'
import { Motel } from 'src/app/model/Motel';
import { DialogThongBaoComponent } from '../dialog-thong-bao/dialog-thong-bao.component';
import { MatDialog } from '@angular/material/dialog';
import { Image } from 'src/app/model/Image';

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
  constructor(public dialog: MatDialog,private behaviorSubjectClass: BehaviorSubjectClass,private router: Router,public motelService:MotelService) { 
    this.behaviorSubjectClass.getDataImages().subscribe(data => {
      this.imageprevous = data;
      if(this.imageprevous.length != null){
        this.image = this.imageprevous;
        this.hasData = this.imageprevous.length;
      }
     
      for(let i=0; i< this.imageprevous.length; i++)
      {
        const reader = new FileReader();
        reader.readAsDataURL(this.imageprevous[i]);
        reader.onload = (event: any) => {
          this.loadImageFromPC.push(event.target.result)
        } 
        
      }
      this.checkLoad = "load";
    })
  }

  ngOnInit(): void {
   
  }

  public handleFileInput(event) {

    var files: FileList;
    files = event.target.files;
    /*if(this.hasData != 0){
      for(let i=0;i<this.imageprevous.length;i++){
        this.image.push(this.imageprevous[i]) 
      }
    }*/

    
    for(let i=0; i< files.length; i++)
    {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[i]);
      reader.onload = (event: any) => {
        this.loadImageFromPC.push(event.target.result)
      }   
      this.image.push(files.item(i)) // lấy hình
    }
    this.checkLoad = "load";

    console.log(this.image);
  }

  public onDelete(id){
    console.log(this.image)
    if(this.image.length == 1){
      var fileNew : File[] =[];
      this.image = fileNew;
    }
    this.image.forEach((element,index)=>{
      console.log(index)
      console.log(id)
      if(element.name == this.image[id].name) {
        this.image.splice(id,1);
      }
    });

    
    this.loadImageFromPC = new Array<string>()
    for(let i=0; i< this.image.length; i++)
    {
      const reader = new FileReader();
      reader.readAsDataURL(this.image[i]);
      reader.onload = (event: any) => {
        this.loadImageFromPC.push(event.target.result)
      }   
    }

  }

  public next(){
    if(this.image.length){
      var file: File[] = [];
      this.behaviorSubjectClass.setDataImages(this.image);
      this.router.navigateByUrl('/user/goi-thanh-toan');

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
