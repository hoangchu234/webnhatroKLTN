import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { ReportPost } from 'src/app/model/ReportPost';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-management-forum',
  templateUrl: './management-forum.component.html',
  styleUrls: ['./management-forum.component.css']
})
export class ManagementForumComponent implements OnInit {

  reports: Array<ReportPost> = [];
  //pagination
  totalRecord: Number;
  page:Number = 1;
  constructor(public postService:PostService) { }

  ngOnInit(): void {
    this.getDataReport();
    this.totalRecord = this.reports.length;
  }

  async getDataReport(){
    this.reports = await this.postService.getReportPosts() as ReportPost[];
  }

  public handlePageChange(event) {
    this.page = event;
  }

  async hiddenPost(idPost){
    const post = await this.postService.getPostById(idPost) as Post;
    post.hiddenOrNotHidden = false;
    this.postService.updatPostById(post).subscribe();
  }
}
