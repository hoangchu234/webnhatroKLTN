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
import { IRecommendation } from '../model/interface/IRecommendation';
import { ClipboardService } from 'ngx-clipboard';
import { Status } from '../model/Status';
import { ToastService } from '../services/toast.service';

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
  motelrecommendation:IRecommendation[] = []; 
  listImage: String[] = []
  provincename; //tên province
  phone:string = ""

  outOfOrder = false;
  constructor(private toast: ToastService,private clipboardService: ClipboardService,private route: Router,private provinceService:ProvincesService,public dialog: MatDialog,private userService:UserService,private sanitizer: DomSanitizer,private router: ActivatedRoute,private motelService:MotelService) {
    
   }

  async ngOnInit(): Promise<void> {
    await this.getMotelById();
    await this.getRecommend();
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
    if(this.motel.status == "3"){
      this.outOfOrder = true;
    }
  }

  public linkRouter(name, id) {
    //this.router.navigate( [{name: name, id: id}]);
    // this.route.navigate( ['/home/chi-tiet',name,id]);
    var link = '/home/chi-tiet/' + name + '/' + id
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate([link]);
      
    }); 
  }
  
  public async getRecommend(){
    // const result = await this.provinceService.getProvinces() as Province[];
    // var name = result.find(a => a.id == this.motel.provinceId);
    // this.provincename = name.name;
    const id = this.router.snapshot.paramMap.get("id");
    var data = await this.motelService.getRecommendation(Number(id)) as IRecommendation[];
    this.motelrecommendation = data.slice();
    if(data.length != 0){
      for(let i=0; i <data.length; i++){
        var image = await this.motelService.getmotelReommendation(Number(data[i].Id)) as Image;
        this.listImage.push(image.imageMotel)
      }
    }

  }

  checkRecommendation(){
    if(this.motelrecommendation.length !=0){
      return true;
    }
    else{
      return false;
    }
  }

  checkRecommendationLengthOne(id){
    if(id >= 0 && id < 5){
      return true;
    }
    else{
      return false;
    }
  }

  checkRecommendationLengthTwo(id){
    if(id >= 5 && id < 10){
      return true;
    }
    else{
      return false;
    }
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
        // this.toast.toastInfo('Tài khoản không tồn tại!');
        // alert('The dialog was closed');
        //if (!this.isEdit) this.createNewExam(result);
        //else this.updateExam(result);
      }
        
    });
  }

  public getHTML(html: string): SafeHtml
  {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  copyContent() {
    var link = window.location.href;
    this.clipboardService.copyFromContent(link);
    // alert("Đã sao chép link chia sẽ")
    this.toast.toastInfo('Đã sao chép link chia sẽ');
  }
}
