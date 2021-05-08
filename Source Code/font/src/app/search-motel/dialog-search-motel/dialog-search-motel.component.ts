import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AreaSearch } from 'src/app/model/AreaSearch';
import { User } from 'src/app/model/User';
import { StorageService } from 'src/app/storage.service';
import { AreaSearchService } from '../../services/area-search.service'

export interface Type{
  id:number;
  name:string;
}

@Component({
  selector: 'app-dialog-search-motel',
  templateUrl: './dialog-search-motel.component.html',
  styleUrls: ['./dialog-search-motel.component.css']
})
export class DialogSearchMotelComponent implements OnInit {

  wasArea: any;
  wasDirect: any;

  openDetailSearch;

  areaSearch;
  directSearch;

  area: AreaSearch[];
  directs:Array<Type> = [
    {id: 0, name:'Đông'},
    {id: 1, name:'Tây'},
    {id: 2, name:'Nam'},
    {id: 3, name:'Bắc'},
    {id: 4, name:'Đông Bắc'},
    {id: 5, name:'Đông Nam'},
    {id: 6, name:'Tây Bắc'},
    {id: 7, name:'Tây Nam'},
  ];

  tickArea = "";
  tickDirect = "";

  choiceDirect;
  choiceArea;
  constructor(public dialog: MatDialog,
    private areaSearchService:AreaSearchService,
    public dialogRef: MatDialogRef<DialogSearchMotelComponent>) {

    }

  ngOnInit(): void {
    if(localStorage.getItem(StorageService.AreaSearchTickStorage)){
      this.tickArea = "Tick xanh";
    }
    else{
      this.tickArea = "";
    }
    if(localStorage.getItem(StorageService.DirectSearchTickStorage)){
      this.tickDirect = "Tick xanh";
    }
    else{
      this.tickDirect = "";
    }
  }

  public deleteData(){
    localStorage.removeItem(StorageService.AreaSearchStorage);
    localStorage.removeItem(StorageService.DirectSearchStorage);
    localStorage.removeItem(StorageService.AreaSearchTickStorage);
    localStorage.removeItem(StorageService.DirectSearchTickStorage);
    this.tickDirect = "";
    this.tickArea = "";
  }

  public onNotify(message: string): void { 
    if(message == "area"){
      this.wasArea = "";
    }
    else if(message == "direct"){
      this.wasDirect = "";   
    }
  }


  public onTickArea(message: string): void { 
    if(message == "Tất cả"){
      this.tickArea = "";
    }
    else{
      var dataArea = this.area.find(a => a.name == message);
      console.log(dataArea)
      if(dataArea)
      {
        this.choiceArea = dataArea.name;
        this.tickArea = "Tick xanh";
        localStorage.setItem(StorageService.AreaSearchTickStorage, "Tick xanh");
      }
    }
   

  }


  public onTickDirect(message: string): void { 
    if(message == "Tất cả"){
      this.tickDirect = "";
    }
    else{
      var dataDirect = this.directs.find(a => a.name == message);
      if(dataDirect)
      {
        this.choiceDirect = dataDirect.name;
        this.tickDirect = "Tick xanh";
        localStorage.setItem(StorageService.DirectSearchTickStorage, "Tick xanh");
      }
    }
   

  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public async onChoiceArea(){
    this.wasArea = "Xac Thuc";
    this.openDetailSearch = "Diện tích";
    this.area = await this.areaSearchService.getAreaSearch() as AreaSearch[];
    this.areaSearch = await this.areaSearchService.getAreaSearch() as AreaSearch[];
    /*this.areaSearchService.getAreaSearch().subscribe(getareasaerch => {
      this.areaSearch = getareasaerch
      this.area = getareasaerch;
    });*/
  }

  public onChoiceDirect(){
    this.wasDirect = "Xac Thuc";
    this.openDetailSearch = "Hướng";
    this.directSearch = this.directs;
  }

}
