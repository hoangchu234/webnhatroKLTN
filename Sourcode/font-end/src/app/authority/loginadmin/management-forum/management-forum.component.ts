import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/Post';
import { ReportPost } from 'src/app/model/ReportPost';
import { PostService } from 'src/app/services/post.service';
import { ToastService } from 'src/app/services/toast.service';

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
  constructor(private toast: ToastService,public postService:PostService) { }

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
    var post = await this.postService.getPostById(idPost) as Post;
    if(post.hiddenOrNotHidden == true){
      // alert("Bài viết này đã được ẩn");
      this.toast.toastSuccess('Bài viết này đã được ẩn');

    }
    else{
      var postUpdate:Post={
        id:post.id,
        postUser:post.postUser, 
        createDate:post.createDate, 
        hiddenOrNotHidden: true, 
        user:null,
        userId:post.userId, 
        comment:null, 
        comments:null
      }
      this.postService.updatPostById(postUpdate).subscribe(a => {
        // alert("Ẩn bài thành công");
        this.toast.toastSuccess('Ẩn bài thành công');

      });
    }
    
  }
}
