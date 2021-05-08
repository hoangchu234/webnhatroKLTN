import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/storage.service';
@Component({
  selector: 'app-dialog-search-motel-area',
  templateUrl: './dialog-search-motel-area.component.html',
  styleUrls: ['./dialog-search-motel-area.component.css']
})
export class DialogSearchMotelAreaComponent implements OnInit {

  @Input() areaTypeSearch:string;
  @Input() areaData;

  @Output() areanotify: EventEmitter<string> = new EventEmitter<string>();

  @Output() areatick: EventEmitter<string> = new EventEmitter<string>();
  tickChoice;
  choice = "Tất cả"
  choiceArea
  constructor() { 
    if(localStorage.getItem(StorageService.AreaSearchStorage) && localStorage.getItem(StorageService.AreaSearchStorage) != "Tất cả"){
      this.choiceArea = localStorage.getItem(StorageService.AreaSearchStorage);
    }
  }

  ngOnInit(): void {
  }

  public onClick() {
    this.areanotify.emit('area');
  }

  public onClickChoice(data: any) {
    if(data == "Tất cả"){
      this.areatick.emit(data);
    }
    else{
      this.areatick.emit(data);
    }
    localStorage.setItem(StorageService.AreaSearchStorage, data);
    this.areanotify.emit('area');
  }

}
