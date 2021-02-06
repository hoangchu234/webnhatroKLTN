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

@Component({
  selector: 'app-detail-motel',
  templateUrl: './detail-motel.component.html',
  styleUrls: ['./detail-motel.component.css']
})
export class DetailMotelComponent implements OnInit {

  motel = new Motel();
  motelImage: Image[] = [];
  countimage; // đếm image
  motelrecommendation:Motel[]; //Các nhà trọ liên quan đến motel theo quận
  provincename; //tên province
  provinces:Province[]; // danh sách province

  constructor(private route: Router,private provinceService:ProvincesService,public dialog: MatDialog,private userService:UserService,private sanitizer: DomSanitizer,private router: ActivatedRoute,private motelService:MotelService) {
    this.getMotelById();
    console.log(this.motelImage)
   }

  ngOnInit(): void {
  }

  public getMotelById(){
    const id = this.router.snapshot.paramMap.get("id");
    this.motelService.getMotelFromId(Number(id)).subscribe(getdetailmotel => {
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
    })
  }

  public linkRouter(name, id) {
    //this.router.navigate( [{name: name, id: id}]);
    this.route.navigate( ['/home/chi-tiet',name,id]);
  }

  public getProvinces(){
    this.provinceService.getProvinces().subscribe(getprovince =>{
      this.provinces = getprovince;
      var a = this.provinces.find(a => a.id == this.motel.provinceId);
      this.provincename = a.name;
      this.motelService.getmotelprovinces(this.provincename).subscribe(getmotellist =>{
      this.motelrecommendation = getmotellist;
    })
    })
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogDetailMotelSendComponent, {
      direction: "ltr",
      width: '400px',
      data: this.motel
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
