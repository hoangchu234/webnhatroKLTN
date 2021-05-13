import { Component, OnInit } from '@angular/core';
import { MotelService } from '../services/motel.service';
import { Motel } from '../model/Motel';
import { Province } from '../model/Province';
import { Router, ActivatedRoute } from '@angular/router'
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../services/user.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDetailMotelSendComponent } from './dialog-detail-motel-send/dialog-detail-motel-send.component';
import { ProvincesService } from '../services/provinces.service';
import { Image } from '../model/Image';
import { User } from '../model/User';

@Component({
  selector: 'app-detail-motel',
  templateUrl: './detail-motel.component.html',
  styleUrls: ['./detail-motel.component.css']
})
export class DetailMotelComponent implements OnInit {

  imageMotel: Image[] = [];
  motel: Motel;
  user: string = "";
  urlImageFirst:string = "";
  motelrecommendation:Motel[]; //Các nhà trọ liên quan đến motel theo quận
  provincename; //tên province
  phone:string = ""

  constructor(private route: Router,private provinceService:ProvincesService,public dialog: MatDialog,private userService:UserService,private sanitizer: DomSanitizer,private router: ActivatedRoute,private motelService:MotelService) {
    this.getMotelById();
   }

  ngOnInit(): void {
  }

  async getDataMotelById(id){
    return await this.motelService.getMotelFromId(Number(id)) as Motel;
  }

  public async getMotelById(){
    const id = this.router.snapshot.paramMap.get("id");
    this.motel = await this.getDataMotelById(id);
    this.urlImageFirst = this.motel.images[0].imageMotel;
    this.imageMotel = this.motel.images.slice();
    this.imageMotel.shift();
    this.user = this.motel.user.hovaTen;
    this.phone = this.motel.phone;
    // for(let i=0;i<this.motel.images.length;i++)
    // {
    //   var imageone = new Image();
    //   if(i !=0){
    //     imageone.imageMotel = this.motel.images[i].imageMotel;
    //     this.motelImage.push(imageone);
    //   }
      
    // }      
    // this.countimage = this.motel.images.length;

    this.getRecommend();  

    /*this.motelService.getMotelFromId(Number(id)).subscribe(getdetailmotel => {
      this.motel = getdetailmotel
      console.log(getdetailmotel)
      for(let i=0;i<getdetailmotel.images.length;i++)
      {
        var imageone = new Image();
        if(i !=0){
          imageone.imageMotel = getdetailmotel.images[i].imageMotel;
          this.motelImage.push(imageone);
        }
        
      }
      console.log(this.motelImage)
      
      this.countimage = this.motel.images.length;
      this.getProvinces();  
    })*/
  }

  public linkRouter(name, id) {
    //this.router.navigate( [{name: name, id: id}]);
    this.route.navigate( ['/home/chi-tiet',name,id]);
  }

  public async getRecommend(){
    /*this.provinceService.getProvinces().subscribe(getprovince =>{
      this.provinces = getprovince;
      var a = this.provinces.find(a => a.id == this.motel.provinceId);
      this.provincename = a.name;
      this.motelService.getmotelprovinces(this.provincename).subscribe(getmotellist =>{
      this.motelrecommendation = getmotellist;
    })
    })*/
    const result = await this.provinceService.getProvinces() as Province[];
    var name = result.find(a => a.id == this.motel.provinceId);
    this.provincename = name.name;
    this.motelrecommendation = await this.motelService.getmotelprovinces(Number(this.motel.provinceId)) as Motel[];
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogDetailMotelSendComponent, {
      direction: "ltr",
      width: '400px',
      data: this.imageMotel
    });

    dialogRef.afterClosed().subscribe((result: Motel) => {
      if (result)
      {
        alert('The dialog was closed');
        //if (!this.isEdit) this.createNewExam(result);
        //else this.updateExam(result);
      }
        
    });
  }

  public getHTML(html: string): SafeHtml
  {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
