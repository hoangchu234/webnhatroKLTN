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
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-detail-motel-publish-magement',
  templateUrl: './detail-motel-publish-magement.component.html',
  styleUrls: ['./detail-motel-publish-magement.component.css']
})
export class DetailMotelPublishMagementComponent implements OnInit {

  //currentAccount: Account;
  motel: Motel;
  motelImage: Image[] = [];
  image0 = "";
  constructor(private toast: ToastService,public provinceService:ProvincesService,private userService:UserService,private sanitizer: DomSanitizer,private router: ActivatedRoute,private route: Router,public dangtinService:MotelService ,private authenticationService: AuthenticationService) { 
    //this.authenticationService.currentAccount.subscribe(x => this.currentAccount = x);
    this.init();

  }

  async ngOnInit(): Promise<void> {
    const id = this.router.snapshot.paramMap.get("id");

    this.motel = await this.dangtinService.getMotelFromId(Number(id)) as Motel;
    this.image0 = this.motel.images[0].imageMotel;
    for(let i=1;i<this.motel.images.length;i++)
    {
      var imageone = new Image();
      imageone.imageMotel = this.motel.images[i].imageMotel
      this.motelImage.push(imageone);
      
    }
  }

  init(){
    this.motel = {
      id:null,
      title: "",
      price: null,
      priceType:"",
      dateUpdate:null,
      dateDue:null,
      status:"",
      verify:null,
      address:"",
      description:"",
      phone:"",
      time:"",
      typemotel:"",
      areaZone:"",
      areaZoneType:"",
      cityId: "",
      city: null,
      district:null,
      districtId:"",
      street:null,
      streetId:"",
      liveTypeId: "",
      liveType:null,
      userId: null,
      user: null,
      typeservice:"",
      images: null,
      bill: null,
      detail:null,
      provinceId: "",
      province: null,
      latitude: "",
      longitude: "",
    }
  }

  public getHTML(html: string): SafeHtml
  {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  public onNoClick(): void {
    // if(Number(this.authenticationService.currentAccountValue.roleId) == 4){
    //   window.location.reload()
    //   this.route.navigate(['/admin/quan-ly-duyet-tin']);
     
    // }
    // if(Number(this.authenticationService.currentAccountValue.roleId) == 2 || Number(this.authenticationService.currentAccountValue.roleId) == 3){
    //   window.location.reload()
    //   this.route.navigate(['/admin/nhan-vien-quan-ly-duyet-tin']); 
     
    // }
    window.location.reload()
  }

  public onDuyetTin(motel: Motel){
    if((this.motel.verify == true && Number(this.authenticationService.currentAccountValue.roleId) == 2) || Number(this.authenticationService.currentAccountValue.roleId) == 4){
      // alert("Đã xác thực nhà trọ này");
      this.toast.toastError('Đã xác thực nhà trọ này');
    }
    else{
      var motelupdate = new Motel();
      motelupdate = motel;
      motelupdate.verify = true;
      motelupdate.status = "Tin đang hiển thị";
      this.dangtinService.updateNVMotel(motelupdate).subscribe(update => {
        console.log(update)
      })
      this.toast.toastSuccess('Xác thực thành công');

      // alert("Xác thực thành công")
    }
   
  }

  get isAdmin() {
    try{
      var role = Number(this.authenticationService.currentAccountValue.roleId);
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
