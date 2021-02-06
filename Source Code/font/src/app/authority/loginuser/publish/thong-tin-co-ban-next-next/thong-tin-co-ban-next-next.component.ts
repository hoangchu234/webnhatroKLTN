import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MotelService } from '../../../../services/motel.service';
import { Motel } from '../../../../model/Motel';
import { Detail } from '../../../../model/Detail';
import { LiveType } from '../../../../model/LiveType';
import { BehaviorSubjectClass } from '../../../../services/behaviorsubject'

@Component({
  selector: 'app-thong-tin-co-ban-next-next',
  templateUrl: './thong-tin-co-ban-next-next.component.html',
  styleUrls: ['./thong-tin-co-ban-next-next.component.css']
})
export class ThongTinCoBanNextNextComponent implements OnInit {

  liveType: string;
  numberBath: string;
  numberLiving: string;
  liveTypes:LiveType[];

  btnDisabledBath = true;
  btnDisabledLiving = true;
  motelprevous:Motel;
  constructor(private behaviorSubjectClass: BehaviorSubjectClass,private router: Router,public motelService:MotelService) {
    this.motelprevous = JSON.parse(localStorage.getItem('PublishMotel'));
    if(this.motelprevous.detail.numberBath){
      this.numberBath = this.motelprevous.detail.numberBath.toString();
      this.numberLiving = this.motelprevous.detail.numberLiving.toString();

    }
   }

  ngOnInit(): void {
    this.getLiveType();
    this.numberBath = "0";
    this.numberLiving = "0";
  }

  public getLiveType(){
    this.motelService.getLiveTypes().subscribe(getlivetype => this.liveTypes = getlivetype)
  }

  public increaseNumberBath()
  {
    this.numberBath = (Number(this.numberBath) + 1).toString();
    this.btnDisabledBath = false;
  }

  public decreaseNumberBath()
  {
    this.numberBath = (Number(this.numberBath) - 1).toString();
    if(Number(this.numberBath) == 0){
      this.btnDisabledBath = true;
    }
    
  }

  public prevous(){
    this.router.navigateByUrl('/user/thong-tin-nha-tro');
  }

  public increaseNumberLiving()
  {
    this.numberLiving = (Number(this.numberLiving) + 1).toString();
    this.btnDisabledLiving = false;
  }

  public decreaseNumberLiving()
  {
    this.numberLiving = (Number(this.numberLiving) - 1).toString();
    if(Number(this.numberLiving) == 0){
      this.btnDisabledLiving = true;
    }
    
  }

  public next(){
    let motelnew = new Motel();
    motelnew = JSON.parse(localStorage.getItem('PublishMotel'));

    let detail = new Detail();
    
    detail.liveTypeId = this.liveType;

    detail.numberBath = Number(this.numberBath);
    detail.numberLiving = Number(this.numberLiving);
    detail.director = motelnew.detail.director;
    motelnew.detail = detail;

    localStorage.removeItem('PublishMotel')
    localStorage.setItem('PublishMotel', JSON.stringify(motelnew));
    this.router.navigateByUrl('/user/thong-tin-hinh-anh');
  }

  
  
}
