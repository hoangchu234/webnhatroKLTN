import { Component, Input, OnInit } from '@angular/core';
import { Event ,Router, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-notlogin',
  templateUrl: './notlogin.component.html',
  styleUrls: ['./notlogin.component.css']
})
export class NotloginComponent implements OnInit {

  

  constructor(private router:Router) {
    
   }

  ngOnInit(): void {
  }

}
