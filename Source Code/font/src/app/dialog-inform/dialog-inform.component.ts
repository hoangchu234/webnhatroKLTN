import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-inform',
  templateUrl: './dialog-inform.component.html',
  styleUrls: ['./dialog-inform.component.css']
})
export class DialogInformComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogInformComponent>,private route: Router) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
    this.route.navigate( ['/login']);
  }
}
