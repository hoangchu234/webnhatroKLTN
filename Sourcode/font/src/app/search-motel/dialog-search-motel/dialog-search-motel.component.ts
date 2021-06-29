import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AreaSearch } from 'src/app/model/AreaSearch';
import { Direct } from 'src/app/model/Direct';
import { User } from 'src/app/model/User';
import { MotelService } from 'src/app/services/motel.service';
import { StorageService } from 'src/app/storage.service';
import { AreaSearchService } from '../../services/area-search.service'

@Component({
  selector: 'app-dialog-search-motel',
  templateUrl: './dialog-search-motel.component.html',
  styleUrls: ['./dialog-search-motel.component.css']
})
export class DialogSearchMotelComponent implements OnInit {

  wasArea: any;
  wasDirect: any;

  openDetailSearch = "";
  areas: AreaSearch[] = [];
  area: string = "";
  areaId: string = "";
  directs:Direct[] = []
  direct: string = "";

  tickArea = false;
  tickDirect = false;

  constructor(private route: Router,private router: ActivatedRoute,public motelService:MotelService,public dialog: MatDialog,
    private areaSearchService:AreaSearchService,
    public dialogRef: MatDialogRef<DialogSearchMotelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  async ngOnInit(): Promise<void> {
    
    await this.getDirect();
    await this.getArea();
    await this.url();
  }

  async url(){

    if(localStorage.getItem(StorageService.AreaSearchStorage) != undefined){
      var AREA = await this.areaSearchService.getAreaSearch() as AreaSearch[];
      var index = AREA.findIndex(a => Number(a.id) === Number(localStorage.getItem(StorageService.AreaSearchStorage)));
      console.log(index)
      if(AREA[index].id == "1"){
        var data = AREA[index].numberOne;
        this.areaId = "";
      }
      else{
        data = AREA[index].numberOne + " " + AREA[index].type + " - " + AREA[index].numberTwo + " " + AREA[index].type;
        this.areaId = AREA[index].id;
      }
      this.area = data;
      this.tickArea = true;
    }
    if(localStorage.getItem(StorageService.DirectSearchStorage) != undefined){
      var DIRECT = await this.motelService.getDirect() as Direct[];
      var index = DIRECT.findIndex(a => a.directName.toString() === localStorage.getItem(StorageService.DirectSearchStorage));
      this.direct = DIRECT[index].directName;
      this.tickDirect = true;
    }


   
   
  }

  public deleteData(){
    // localStorage.removeItem(StorageService.AreaSearchStorage);
    // localStorage.removeItem(StorageService.DirectSearchStorage);
  }

  public openAreaOrDirect(message: string): void { 
    if(message == "area"){
      this.wasArea = "";
    }
    else if(message == "direct"){
      this.wasDirect = "";   
    }
  }


  public onTickArea(message: string): void { 
    var index = this.areas.findIndex(a => a.id === message);
    if(message == "1"){
      this.area = "";
      this.tickArea = false;
    }
    else{
      if(this.areas[index].id == "1"){
        var data = this.areas[index].numberOne;
        this.areaId = "";
      }
      else{
        data = this.areas[index].numberOne + " " + this.areas[index].type + " - " + this.areas[index].numberTwo + " " + this.areas[index].type;
        this.areaId = this.areas[index].id;
      }
      this.area = data;
      this.tickArea = true;
      // localStorage.setItem(StorageService.AreaSearchStorage, this.areas[index].id);
    }
  }
  
  public onTickDirect(message: string): void { 
    var index = this.directs.findIndex(a => a.id.toString() === message);
    if(message == "1"){
      this.direct = "";
      this.tickDirect = false;
    }
    else{
      this.direct = this.directs[index].directName;
      this.tickDirect = true;
      // localStorage.setItem(StorageService.DirectSearchStorage, this.direct);
    }
  }

  public onNoClick(){
    if(this.direct == ""){
      var direct = " ";
    }
    else{
      direct = this.direct;
      localStorage.setItem(StorageService.DirectSearchStorage, direct);
    }
    if(this.areaId == ""){
      var area = " ";
    }
    else{
      area = this.areaId;
      localStorage.setItem(StorageService.AreaSearchStorage, area);
    }
    var data = direct + "@" + area
    this.dialogRef.close({ event: 'close', data: data});
  }

  async getDirect(){
    this.directs = await this.motelService.getDirect() as Direct[];
    // this.direct = this.directs[0].directName.toString();
  }
  async getArea(){
    this.areas = await this.areaSearchService.getAreaSearch() as AreaSearch[];
    // this.area = this.directs[0].directName.toString();
  }

  public async onChoiceArea(){
    this.wasArea = "Xac Thuc";
    this.openDetailSearch = "Diện tích";
    // this.areas = await this.areaSearchService.getAreaSearch() as AreaSearch[];
    // this.areaSearch = await this.areaSearchService.getAreaSearch() as AreaSearch[];
    /*this.areaSearchService.getAreaSearch().subscribe(getareasaerch => {
      this.areaSearch = getareasaerch
      this.area = getareasaerch;
    });*/
  }

  public async onChoiceDirect(){
    this.wasDirect = "Xac Thuc";
    this.openDetailSearch = "Hướng";

    // this.directSearch = this.directs;
  }

}
