import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tophead',
  templateUrl: './tophead.component.html',
  styleUrls: ['./tophead.component.css']
})
export class TopheadComponent implements OnInit {
  @Input() name: string;
  constructor() { }

  ngOnInit(): void {
  }

}
