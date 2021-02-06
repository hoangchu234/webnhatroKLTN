import { Component, OnInit } from '@angular/core';
import { TypeofnewService } from '../../../../services/newstype.service'
import { NewType } from '../../../../model/NewType';
import { Input } from '@angular/core';
import { Router } from '@angular/router';
import { MotelService } from '../../../../services/motel.service';
import { Motel } from '../../../../model/Motel';
import { BehaviorSubjectClass } from '../../../../services/behaviorsubject'

@Component({
  selector: 'app-danh-muc',
  templateUrl: './danh-muc.component.html',
  styleUrls: ['./danh-muc.component.css']
})
export class DanhMucComponent implements OnInit {

  newTypes: NewType [];
  newType: NewType;

  constructor(private behaviorSubjectClass: BehaviorSubjectClass,private router: Router,private typeservice:TypeofnewService,public motelService:MotelService) { }

  ngOnInit(): void {
    this.getNewTypes();
  }

  public next(type){
    this.newType = type;
    this.behaviorSubjectClass.setNewTypes(this.newType);
    this.router.navigateByUrl('/user/thong-tin-vi-tri');
  }

  public getNewTypes = async () => {
    this.typeservice.getTypeExcepts().subscribe(gettypes => this.newTypes = gettypes);
  }
}
