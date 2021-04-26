import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPostComponent } from './dialog-post/dialog-post.component';
import { Post } from '../model/Post';
import { Comment } from '../model/Comment';
import { PostService } from '../services/post.service';
import { AuthenticationService } from '../services/authentication.service';
import { LikeCommentPost } from '../model/LikeCommentPost';

export interface CommentPost{
  idPost:number;
  check:boolean[];
}

@Component({
  selector: 'app-web-forum',
  templateUrl: './web-forum.component.html',
  styleUrls: ['./web-forum.component.css']
})
export class WebForumComponent implements OnInit {

  post = new Post();
  posts: Post[];

  comment = new Comment();
  showComments:boolean[] = [];
  showChildComments:CommentPost[] = [];

  countComment: number[] = [];
  countChildComment: number[] = [];
  likePost: string[] = [];
  likeComment: string[] = [];

  constructor(public postService:PostService,public dialog: MatDialog,private authenticationService: AuthenticationService) { 
    this.getPosts();
    //this.countLikePost();
    /*this.comments = [
      {
        "id": "30",
        "content": "Comment 1",
        "parent": "0",
      },
      {
        "id": "31",
        "content": "Comment 2",
        "parent": "0",
      },
      {
        "id": "32",
        "content": "comment 3",
        "parent": "0",
      },
      {
        "id": "33",
        "content": "sub comment 1-1",
        "parent": "30",
      },
      {
        "id": "34",
        "content": "sub comment 2-1",
        "parent": "31",
      },
      {
        "id": "35",
        "content": "sub sub comment 1-1-1",
        "parent": "33",
      },
      {
        "id": "36",
        "content": "sub comment 1-2",
        "parent": "30",
      }
    ];*/
  }

  ngOnInit(): void {
  }

  async getCountChildComment(id) {
    this.countChildComment.push(await this.postService.getCountChildCommentPost(id) as number);
  }

  async getPosts() {
    this.posts = await this.postService.getSomePost() as Post[]; 
    for(let i =0;i<this.posts.length;i++){
      this.showComments.push(true);
      this.countComment.push(await this.postService.getCountCommentPost(this.posts[i].id) as number);
      this.getCountChildComment(this.posts[i].id);
      /*var commentPost: CommentPost;
      commentPost.idPost = Number(this.posts[i].id);
      for(let j=0; j<this.posts[i].comments.length; j++){   
        commentPost.check.push(true);
        this.showChildComments.push(commentPost);
      }*/
    }
  }

  async getComments(id) {
    const result = await this.postService.getSomePost() as Post[]; 
    var index = result.findIndex(a => a.id == id);
    this.showComments[index] = !this.showComments[index];  
  }

  /*async getChildComments(id,j) {
    const result = await this.postService.getSomePost() as Post[]; 
    var index = result.findIndex(a => a.id == id);
    //this.showComments[index] = !this.showComments[index];  
    this.showChildComments[index].check[j] = !this.showChildComments[index].check[j];
  }*/

  onselecte(id): void{
    this.getComments(id);
  }

  /*onSelecteParentComment(id,j): void{
    this.getChildComments(id,j);
  }*/

  saveComment(postId){
    if(this.comment.commentUser){
      this.comment.postId = postId;
      this.comment.userId = "26";
      //this.comment.userId  = this.authenticationService.currentAccountValue.user.id.toString();
      this.postService.postComment(this.comment).subscribe(async data => {
        //this.showComments.splice(0, this.showComments.length);
        //this.countComment.splice(0, this.countComment.length);
        //this.getPosts();
        var index = this.posts.findIndex(a => a.id == postId);
        this.posts[index].comments.unshift(data);

        /*for(let i =0;i<this.posts.length;i++){
          this.showComments.push(true);
          this.countComment.push(await this.postService.getCountCommentPost(this.posts[i].id) as number);
        }*/
        //this.getComments(postId);
        const count = await this.postService.getCountCommentPost(this.posts[index].id) as number;
        this.getCountChildComment(this.posts[index].id);
        this.countComment[index] = count;
        this.comment.commentUser = "";
      })
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogPostComponent, {
      direction: "ltr",
      width: '400px',
      height: '500px',
      data: this.post
    });

    dialogRef.afterClosed().subscribe((result: Post) => {
      if(result.postUser){
        //result.userId = this.authenticationService.currentAccountValue.user.id.toString();
        result.userId = "26"
        this.postService.postPost(this.post).subscribe(data => {
          /*this.showComments.splice(0, this.showComments.length);
          this.countComment.splice(0, this.countComment.length);
          this.countChildComment.splice(0, this.countChildComment.length);
          this.getPosts();*/
          //var index = this.posts.findIndex(a => a.id == postId);
          //this.posts.unshift(data);

        });
      }
     
    });
  }

  moreComment(id){
    var number = 3;
    var index = this.posts.findIndex(a => a.id == id);
    var skip = this.posts[index].comments.length;
    this.getMoreComments(id, number, skip);
  }

  async getMoreComments(id, number, skip){
    const result = await this.postService.getCommentPosts(id,number,skip) as Comment[]
    var index = this.posts.findIndex(a => a.id == id);
    for(let i=0; i< result.length; i++){
      this.posts[index].comments.push(result[i]);
    }
  }

  morePosts(id){
    var number = 5;
    var skip = this.posts.length;
    this.getMorePosts(number, skip);
  }

  async getMorePosts(number, skip){
    const result = await this.postService.getMorePost(number,skip) as Post[]
    for(let i=0; i< result.length; i++){
      this.posts.push(result[i]);
      this.showComments.push(true);
      this.countComment.push(await this.postService.getCountCommentPost(result[i].id) as number);
      this.getCountChildComment(this.posts[i].id);
    }
  }

  takeUrlShare(){
    
  }

  livePost(idPost){
    var like: LikeCommentPost;
    like.idPost = idPost;
    like.like = true;
    //like.userId = this.authenticationService.currentAccountValue.user.id;
    like.userId = 26;
    this.postLikeCommentPost(like);
  }
  async countLikePost(){
    const result = await this.postService.getLikePost() as any[];
    for(let i=0 ;i<result.length;i++){
      for(let j=0; j<this.posts.length; j++){
        if(result[i].id == Number(this.posts[j].id)){
          this.likePost.push(result[i].count);
        }
        else{
          this.likePost.push("");
        }
      }
    }
    console.log(this.likePost)
  }

  liveComment(IdComment){
    var like: LikeCommentPost;
    like.idCommnent = IdComment;
    like.like = true;
    //like.userId = this.authenticationService.currentAccountValue.user.id;
    like.userId = 26;
    this.postLikeCommentPost(like);
  }
  async countLikeComment(){
    /*const result = await this.postService.getLikeComment() as any[];
    for(let i=0 ;i<result.length;i++){
      for(let j=0; j<this.posts.length; j++){
        if(result[i].id == Number(this.posts[j].id)){
          this.likePost.push(result[i].count);
        }
        else{
          this.likePost.push("");
        }
      }
    }*/
  }

  postLikeCommentPost(like){
    const result = this.postService.postLikeCommentPost(like);
  }
}
