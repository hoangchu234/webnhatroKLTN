import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPostComponent } from './dialog-post/dialog-post.component';
import { Post } from '../model/Post';
import { PostService } from '../services/post.service';
import { data } from 'jquery';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-web-forum',
  templateUrl: './web-forum.component.html',
  styleUrls: ['./web-forum.component.css']
})
export class WebForumComponent implements OnInit {

  post = new Post();

  constructor(public postService:PostService,public dialog: MatDialog,private authenticationService: AuthenticationService) { 

  }

  ngOnInit(): void {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogPostComponent, {
      direction: "ltr",
      width: '400px',
      height: '500px',
      data: this.post
    });

    dialogRef.afterClosed().subscribe((result: Post) => {

      this.postService.postPost(this.post).subscribe(data => {
        if(data){
          alert("Gửi thành công")
        }
      });
    });
  }

}
