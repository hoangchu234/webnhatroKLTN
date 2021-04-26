import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    if(localStorage.getItem('areaName')){
      this.choiceArea = localStorage.getItem('areaName');
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
      localStorage.setItem('areaName', data);
    }

    this.areanotify.emit('area');
  }

}
