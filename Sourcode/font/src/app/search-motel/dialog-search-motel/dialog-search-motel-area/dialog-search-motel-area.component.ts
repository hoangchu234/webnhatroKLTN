import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AreaSearch } from 'src/app/model/AreaSearch';
import { AreaSearchService } from 'src/app/services/area-search.service';
import { MotelService } from 'src/app/services/motel.service';
import { StorageService } from 'src/app/storage.service';
@Component({
  selector: 'app-dialog-search-motel-area',
  templateUrl: './dialog-search-motel-area.component.html',
  styleUrls: ['./dialog-search-motel-area.component.css']
})
export class DialogSearchMotelAreaComponent implements OnInit {

  @Input() areaTypeSearch:string;
  @Input() areaChooce:string;
  areas: AreaSearch[] = [];
  dataOut: String[] = [];

  @Output() areanotify: EventEmitter<string> = new EventEmitter<string>();
  @Output() areatick: EventEmitter<string> = new EventEmitter<string>();
  
  constructor(private areaSearchService:AreaSearchService) { 
    // if(localStorage.getItem(StorageService.AreaSearchStorage) && localStorage.getItem(StorageService.AreaSearchStorage) != "Tất cả"){
    //   this.choiceArea = localStorage.getItem(StorageService.AreaSearchStorage);
    // }
    
  }

  async ngOnInit(): Promise<void> {
    await this.getArea();
  }

  public onClick() {
    this.areanotify.emit('area');
  }

  async getArea(){
    this.areas = await this.areaSearchService.getAreaSearch() as AreaSearch[];
    for(let i=0; i<this.areas.length; i++){
      if(this.areas[i].id == "1"){
        this.dataOut.push(this.areas[i].numberOne);
      }
      else if(this.areas[i].id == "2" || this.areas[i].id == "10"){
        var data = this.areas[i].numberOne + " " + this.areas[i].numberTwo + " " + this.areas[i].type;
        this.dataOut.push(data);
      }
      else{
        var data = this.areas[i].numberOne + " " + this.areas[i].type + " - " + this.areas[i].numberTwo + " " + this.areas[i].type;
        this.dataOut.push(data);
      }
    }
    // this.area = this.directs[0].directName.toString();
  }

  public onClickChoice(data: AreaSearch) {
    // if(data.name == "Tất cả"){
    //   this.areatick.emit(data.id);
    // }
    // else{
    //   this.areatick.emit(data.id);
    // }
    this.areatick.emit(data.id);
    this.areanotify.emit('area');
  }

}
