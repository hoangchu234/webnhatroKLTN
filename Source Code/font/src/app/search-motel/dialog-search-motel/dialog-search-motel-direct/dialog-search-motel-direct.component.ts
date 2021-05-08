import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-dialog-search-motel-direct',
  templateUrl: './dialog-search-motel-direct.component.html',
  styleUrls: ['./dialog-search-motel-direct.component.css']
})
export class DialogSearchMotelDirectComponent implements OnInit {

  @Input() directTypeSearch:string;
  @Input() directData;

  @Output() directnotify: EventEmitter<string> = new EventEmitter<string>();

  @Output() directtick: EventEmitter<string> = new EventEmitter<string>();
  tickChoice;
  choice = "Tất cả"
  choiceDirect
  constructor() { 
  }

  ngOnInit(): void {
    if(localStorage.getItem(StorageService.DirectSearchStorage) && localStorage.getItem(StorageService.DirectSearchStorage) != "Tất cả"){
      this.choiceDirect = localStorage.getItem(StorageService.DirectSearchStorage);
    }
  }

  public onClick() {
    this.directnotify.emit('direct');
  }

  public onClickChoice(data: any) {
    if(data == "Tất cả"){
      this.directtick.emit(data);
    }
    else{
      this.directtick.emit(data);
    }
    localStorage.setItem(StorageService.DirectSearchStorage, data);
    this.directnotify.emit('direct');

  }

}
