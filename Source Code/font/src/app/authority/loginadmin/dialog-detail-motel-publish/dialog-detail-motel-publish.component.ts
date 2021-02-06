import { Component, Inject, OnInit } from '@angular/core';
import { MotelService } from '../../../services/motel.service';
import { Motel } from '../../../model/Motel';
import { Account } from '../../../model/Account';
import { Image } from '../../../model/Image';
import { Province } from '../../../model/Province';
import { Router, ActivatedRoute } from '@angular/router'
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { UserService } from '../../../services/user.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProvincesService } from 'src/app/services/provinces.service';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  selector: 'app-dialog-detail-motel-publish',
  templateUrl: './dialog-detail-motel-publish.component.html',
  styleUrls: ['./dialog-detail-motel-publish.component.css']
})
export class DialogDetailMotelPublishComponent implements OnInit {

  currentAccount: Account;
  motel: Motel;
  motelImage: Image[] = [];

  constructor(public dialogRef: MatDialogRef<DialogDetailMotelPublishComponent>,@Inject(MAT_DIALOG_DATA) public data: Motel,public provinceService:ProvincesService,private userService:UserService,private sanitizer: DomSanitizer,private router: Router,public dangtinService:MotelService ,private authenticationService: AuthenticationService) { 
    this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
    const id = this.data.id;
    this.dangtinService.getMotelFromId(Number(id)).subscribe(getdetailmotel => {
      this.motel = getdetailmotel
      for(let i=0;i<this.motel.images.length;i++)
      {
        var imageone = new Image();
        if(i !=0){
          imageone.imageMotel = this.motel.images[i].imageMotel
          this.motelImage.push(imageone);
        }
        
      }
    })

  }

  ngOnInit(): void {
    
  }

  public getHTML(html: string): SafeHtml
  {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  public onNoClick(): void {
    this.dialogRef.close();
    if(Number(this.currentAccount.roleId) == 4){
      window.location.reload()
      this.router.navigate(['/admin/quan-ly-duyet-tin']);
     
    }
    if(Number(this.currentAccount.roleId) == 2 || Number(this.currentAccount.roleId) == 3){
      window.location.reload()
      this.router.navigate(['/admin/nhan-vien-quan-ly-duyet-tin']); 
     
    }
  }

  public onDuyetTin(motel: Motel){
    if((this.motel.verify == true && Number(this.currentAccount.roleId) == 2) || Number(this.currentAccount.roleId) == 4){
      alert("Đã xác thực nhà trọ này");
    }
    else{
      var motelupdate = new Motel();
      motelupdate = motel;
      motelupdate.verify = true;
      motelupdate.status = "Tin đang hiển thị";
      this.dangtinService.updateNVMotel(motelupdate).subscribe(update => {
        console.log(update)
      })
    
      alert("Xác thực thành công")
    }
   
  }

  get isAdmin() {
    try{
      var role = Number(this.currentAccount.roleId);
      if(role == 4){
          return true;
      }
      return false;
    }
    catch(error)
    {
      
    } 
  }

}
