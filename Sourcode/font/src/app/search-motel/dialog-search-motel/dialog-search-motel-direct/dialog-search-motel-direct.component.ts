import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Direct } from 'src/app/model/Direct';
import { MotelService } from 'src/app/services/motel.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-dialog-search-motel-direct',
  templateUrl: './dialog-search-motel-direct.component.html',
  styleUrls: ['./dialog-search-motel-direct.component.css']
})
export class DialogSearchMotelDirectComponent implements OnInit {

  @Input() directTypeSearch:string;
  @Input() directChooce:string;
  directs:Direct[] = []

  @Output() directnotify: EventEmitter<string> = new EventEmitter<string>();
  @Output() directtick: EventEmitter<string> = new EventEmitter<string>();

  constructor(public motelService:MotelService) { 

  }

  async ngOnInit(): Promise<void> {
    // if(localStorage.getItem(StorageService.DirectSearchStorage) && localStorage.getItem(StorageService.DirectSearchStorage) != "Tất cả"){
    //   this.choiceDirect = localStorage.getItem(StorageService.DirectSearchStorage);
    // }
    await this.getDirect();

  }

  async getDirect(){
    this.directs = await this.motelService.getDirect() as Direct[];
    // this.direct = this.directs[0].directName.toString();
  }

  public onClick() {
    this.directnotify.emit('direct');
  }

  public onClickChoice(data: Direct) {
    // if(data.directName == "Tất cả"){
    //   this.directtick.emit(data);
    // }
    // else{
      
    // }
    this.directtick.emit(data.id.toString());
    this.directnotify.emit('direct');
  }

}
