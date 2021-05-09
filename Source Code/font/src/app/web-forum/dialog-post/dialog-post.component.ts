import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../model/Post';

@Component({
  selector: 'app-dialog-post',
  templateUrl: './dialog-post.component.html',
  styleUrls: ['./dialog-post.component.css']
})
export class DialogPostComponent implements OnInit {

  check = true;
  constructor(public dialogRef: MatDialogRef<DialogPostComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit(): void {
    if(this.data == ""){
      this.check = false;
    }
  }
}
