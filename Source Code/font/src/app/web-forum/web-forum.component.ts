import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPostComponent } from './dialog-post/dialog-post.component';
import { Post } from '../model/Post';
import { Comment } from '../model/Comment';
import { PostService } from '../services/post.service';
import { AuthenticationService } from '../services/authentication.service';
import { LikeCommentPost } from '../model/LikeCommentPost';
import { ICheckChildComment, IListCheckParentComment } from '../model/interface/ICheckChildComment';
import { ICountComment } from '../model/interface/ICountComment';
import { ClipboardService } from 'ngx-clipboard';
import { ActivatedRoute, Router } from '@angular/router';
import { ILike } from '../model/interface/ILike';
import { DialogInformComponent } from '../dialog-inform/dialog-inform.component';
import { IRecentlyPost } from '../model/interface/IRecentlyPost';
import { User } from '../model/User';
import { ICommentParent } from '../model/interface/ICommentParent';

@Component({
  selector: 'app-web-forum',
  templateUrl: './web-forum.component.html',
  styleUrls: ['./web-forum.component.css']
})
export class WebForumComponent implements OnInit {

  post = new Post();
  posts: Post[];
  comment = new Comment();
  // showComments:boolean[] = [];
  showChildCommentArray:Array<IListCheckParentComment> = [];

  // countComment: number[] = [];
  // countChildComment: number[] = [];
  countCommentPost: number[] = [];
  countComment: Array<ICountComment> = [];
  countCommentParent: Array<ICommentParent> = [];
  likePost: Array<ILike> = [];
  likePostData: number[] = [];
  likeComment: Array<ILike> = [];
  likeCommentData: number[] = [];
  latestNodesPerLevel;

  dataComment:Comment[] = [];
  totalPost: number = 0;
  totalComment: number = 0;
  dataRecently: Array<IRecentlyPost> = [];
  dataUser:User;
  constructor(private router: ActivatedRoute,private route: Router,private clipboardService: ClipboardService,public postService:PostService,public dialog: MatDialog,private authenticationService: AuthenticationService) { 
    this.getPosts();
    if(this.authenticationService.currentAccountValue){
      this.dataUser = this.authenticationService.currentAccountValue.user;
    }
    else{
      var user: User ={
        id: null,
        hovaTen: "",
        gender: "",
        doB: null,
        email: "",
        facebook: "",
        userImage: "../../assets/forum/images1/resources/admin.jpg",
        createdDate:null,
        lastLogOnDate:null,
        account:null,
        accountid:""
      }
      this.dataUser = user;
    }
  }

  async ngOnInit(): Promise<void> {
    this.likePost = await this.getDataCountPost();
    this.likeComment = await this.getDataCountComment();
    this.totalPost = await this.postService.totalPost() as number;
    this.totalComment = await this.postService.totalComment() as number;
    this.dataRecently = await this.postService.getRecentlyPost() as IRecentlyPost[];
    this.getCountParentComment();
  }

  showChildComments(idPost, idComment, idParent){
    try{
      let indexParent = this.showChildCommentArray.findIndex(a => a.idPost === idPost);
      let indexChild = this.showChildCommentArray[indexParent].childCommentCheck.findIndex(a => a.idComment === idComment && a.idParent === idParent);
      var result = this.showChildCommentArray[indexParent].childCommentCheck[indexChild];
      if(result.checkChildComment == false){
        return false;
      }
      else{
        return true;
      }
    }
    catch(err){

    } 
  }

  showParentComments(idPost){
    try{
      let result = this.showChildCommentArray.find(a => a.idPost == idPost);
      if(result.checkParentComment == false){
        return false;
      }
      else{
        return true;
      }
    }
    catch(err){

    }
    
  }

  countCommentComment(idPost, idComment){
    try{
      var length = 0;
      this.dataComment.forEach(element => {
        if(element.postId == idPost && element.parentCommentId == idComment){
          length++;
        }
      })
      let result = this.countComment.find(a => a.idPost == idPost && a.idComment == idComment);
      if(result.count > length){
        return true;
      }
      else{
        return false;
      }
    }
    catch(err){

    }
  }

  openComment(idPost, idComment, idParent){
    // console.log(this.showChildCommentArray)
    // console.log(idPost, idComment, idParent)
    let indexParent = this.showChildCommentArray.findIndex(a => a.idPost === idPost);
    let indexChild = this.showChildCommentArray[indexParent].childCommentCheck.findIndex(a => a.idComment === idComment);
    this.showChildCommentArray[indexParent].childCommentCheck[indexChild].checkChildComment = !this.showChildCommentArray[indexParent].childCommentCheck[indexChild].checkChildComment;

    this.getComment(idPost, idComment,idParent);
  }

  addAItem(a,n,vitrithem,phantuthem){
    for(let i=n; i> vitrithem; i--){
      a[i] = a[i-1];
    }
    a[vitrithem] = phantuthem;
    n++;
  }

  async getComment(idPost,idComment,idParent){
    var index = this.posts.findIndex(a => a.id === idPost);
    // var indexComment = this.posts[index].comments.findIndex(a => a.id === idComment);
    var result = await this.postService.getChildCommentById(idComment) as Comment[];
    var data: Comment[] = [];
    for(let i=0;i<this.dataComment.length;i++){
      if(this.dataComment[i].postId == idPost){
        data.push(this.dataComment[i]);
      }
    }
    this.posts[index].comments.splice(0, this.posts[index].comments.length);
    var vitrithemdata = data.findIndex(a => a.id === idComment);
    var vitrithemdatacomment = this.dataComment.findIndex(a => a.id === idComment);
    if(result){
      for(let i=0; i< result.length; i++){
        result[i].childComments.length = 0;
        var indexFind = data.findIndex(a => a.id === result[i].id);
        vitrithemdata++;
        vitrithemdatacomment++;
        if(indexFind == -1){
          //data.push(result[i]);
          this.addAItem(data,data.length,vitrithemdata,result[i]);
          this.addAItem(this.dataComment,this.dataComment.length,vitrithemdatacomment,result[i]);
          
          // this.dataComment.push(result[i]);
          //this.addAItem(this.dataComment,this.dataComment.length,)
          this.countComment.push(await this.pushCountComment(idPost, result[i].id))
          var indexParent = this.showChildCommentArray.findIndex(a => a.idPost === idPost);
          this.showChildCommentArray[indexParent].childCommentCheck.push(this.pushArrayShowCommentChild(result[i].id,idComment));
        }
        // this.pushArrayShowCommentChild(this.posts[index].id,result[i].id,this.posts[index].comments[indexComment].id);
      } 

      //var sortedData = data.sort((a, b) => Number(a.parentCommentId) - Number(b.parentCommentId));
      this.latestNodesPerLevel = [{id: "root",commentUser: "",user: "",data: "",parentCommentId:"", childComments:[]}]
      var sortedData = data;
      //console.log(data)
      for(let i=0; i< sortedData.length; i++){
        var level = 1; 
        if (sortedData[i].parentCommentId == null) { 
          level = 1;
        }   
        else{
          var parentId = sortedData[i].parentCommentId;
          while (parentId != null) {
            level++;
            var indexSort = sortedData.findIndex(a => a.id == parentId);
            parentId = sortedData[indexSort].parentCommentId;
          }
        }
  
        var node = {
          id: sortedData[i].id,
          commentUser: `${sortedData[i].commentUser}`,
          user: sortedData[i].user,
          data: sortedData[i].createDate,
          parentCommentId: sortedData[i].parentCommentId,
          childComments: [],
  
        }
  
        // if(sortedData[i].parentCommentId == null){
        //   // this.latestNodesPerLevel.push(node);
        // } 
        if(this.latestNodesPerLevel[level - 1] === undefined){

        }
        else {  
          this.latestNodesPerLevel[level - 1].childComments.push(node);
          this.latestNodesPerLevel[level] = node;
        }
        
  
      }

      // this.latestNodesPerLevel.shift();
      // this.latestNodesPerLevel.forEach(element => {
      //   this.posts[index].comments.push(element)
      // });
      this.latestNodesPerLevel[0].childComments.forEach(element => {
        this.posts[index].comments.push(element)
      });
    }
   
    // if(idParent != null){
    //   if(this.posts[index].comments[indexComment].childComments.length == 0)
    //   {
    //     for(let i=0; i< result.length; i++){
    //       result[i].childComments.length = 0;
    //       this.posts[index].comments[indexComment].childComments.unshift(result[i]);
    //       // this.pushArrayShowCommentChild(this.posts[index].id,result[i].id,this.posts[index].comments[indexComment].id);
    //       var indexParent = this.showChildCommentArray.findIndex(a => a.idPost === idPost);
    //       this.showChildCommentArray[indexParent].childCommentCheck.push(this.pushArrayShowCommentChild(result[i].id,idComment))
    //     }  
    //   }
    // }
    // else{
    //   if(this.posts[index].comments[indexComment].childComments.length == 0)
    //   {
    //     for(let i=0; i< result.length; i++){
    //       result[i].childComments.length = 0;
    //       this.posts[index].comments[indexComment].childComments.unshift(result[i]);
    //       // this.pushArrayShowCommentChild(this.posts[index].id,result[i].id,this.posts[index].comments[indexComment].id);
    //       var indexParent = this.showChildCommentArray.findIndex(a => a.idPost === idPost);
    //       this.showChildCommentArray[indexParent].childCommentCheck.push(this.pushArrayShowCommentChild(result[i].id,idComment))
    //     }  
    //   }
    // }




    // console.log(this.showChildCommentArray);
  }

  myCondition(id){
    if(id < 4){
      return true;
    }
    else{
      return false;
    }
  }

  async getPostForUse(){
    return await this.postService.getSomePost() as Post[]; 
  }

  // conditionShowAddCommentChild(idPost,idComment,idParent,lenght,j){
  //   console.log(j)
  //   var indexPost = this.posts.findIndex(a => a.id == idPost)
  //   if(idParent == null){
  //     var length = this.posts[indexPost].comments.length;
  //     if(lenght  == length){
  //       return true;
  //     }
  //     else{
  //       return false;
  //     }
  //   }
  //   else{
  //     var indexComment = this.posts[indexPost].comments.findIndex(a => a.id == idComment);
  //     var length = this.posts[indexPost].comments[indexComment].childComments.length;
  //     if(lenght  == length){
  //       return true;
  //     }
  //     else{
  //       return false;
  //     }
  //   }
  // }

  async getCountChildComment(id,idComment) {
    return await this.postService.getCountChildCommentPost(id,idComment) as number;
  }
  async getCountCommentPost(id) {
    this.countCommentPost.push(await this.postService.getCountCommentPost(id) as number);
  }
  async getCountParentComment() {
    const result = await this.postService.getCountParentComment() as ICommentParent[];
    this.countCommentParent = result.slice();
  }

  checkShowMoreCommentParent(idPost,length){
    try{
      var index = this.countCommentParent.findIndex(a => a.id === idPost);
      if(this.countCommentParent[index].count > length){
        return true;
      }
      else{
        return false;
      }
    }
    catch(err){

    }
  }

  async pushCountComment(idPost, idComment){
    var countComment: ICountComment={
      idPost:idPost,
      idComment:idComment,
      count: await this.getCountChildComment(idPost, idComment)
    }
    return countComment;
    // this.showChildCommentArray.push(array);
  }

  pushArrayShowCommentChild(idComment, idParent){
    var arrayChildCommentCheck: ICheckChildComment={
      idComment:idComment,
      idParent:idParent,
      checkChildComment: true
    }
    return arrayChildCommentCheck;
    // this.showChildCommentArray.push(array);
  }

  pushArrayShowCommentParent(idPost,arrayChildCommentCheck){
    var arrayParentCommentCheck:IListCheckParentComment = {
      idPost:idPost,
      checkParentComment: true,
      childCommentCheck: arrayChildCommentCheck
    };
    return arrayParentCommentCheck;
  }

  async getPosts() {
    this.posts = await this.postService.getSomePost() as Post[]; 
    for(let i =0;i<this.posts.length;i++){
      // this.showComments.push(true);
      //count comment
      this.getCountCommentPost(this.posts[i].id);
      // this.getCountChildComment(this.posts[i].id);
      //
      this.posts[i].comments.forEach(element => {
        this.dataComment.push(element);
        this.countLikeComment(element);
      })
      //Hidden and display comment
      var arrayChildCommentCheck = Array<ICheckChildComment>();
      for(let j=0; j<this.posts[i].comments.length; j++){
        
        this.posts[i].comments[j].childComments.length = 0;
        this.countComment.push(await this.pushCountComment(this.posts[i].id, this.posts[i].comments[j].id))
        // this.pushArrayShowCommentChild(this.posts[i].id,this.posts[i].comments[j].id,this.posts[i].comments[j].parentCommentId);
        arrayChildCommentCheck.push(this.pushArrayShowCommentChild(this.posts[i].comments[j].id,this.posts[i].comments[j].parentCommentId));
      }
      this.showChildCommentArray.push(this.pushArrayShowCommentParent(this.posts[i].id,arrayChildCommentCheck));
      
      //
      /*var commentPost: CommentPost;
      commentPost.idPost = Number(this.posts[i].id);
      for(let j=0; j<this.posts[i].comments.length; j++){   
        commentPost.check.push(true);
        this.showChildComments.push(commentPost);
      }*/
    }
    this.countLikePost(this.posts);
    //this.countLikeComment();
  }
  

  // async getComments(id) {
  //   const result = await this.postService.getSomePost() as Post[]; 
  //   var index = result.findIndex(a => a.id == id);
  //   // this.showComments[index] = !this.showComments[index];  
  // }

  /*async getChildComments(id,j) {
    const result = await this.postService.getSomePost() as Post[]; 
    var index = result.findIndex(a => a.id == id);
    //this.showComments[index] = !this.showComments[index];  
    this.showChildComments[index].check[j] = !this.showChildComments[index].check[j];
  }*/

  onselecte(idPost): void{
    let index = this.showChildCommentArray.findIndex(a => a.idPost == idPost);
    this.showChildCommentArray[index].checkParentComment = !this.showChildCommentArray[index].checkParentComment;
    // this.getComments(id);
  }

  /*onSelecteParentComment(id,j): void{
    this.getChildComments(id,j);
  }*/

  
  saveComment(postId){
    if(this.comment.commentUser){
      this.comment.postId = postId;
      // this.comment.userId = "26";
      this.comment.userId  = this.authenticationService.currentAccountValue.user.id.toString();
      this.postService.postComment(this.comment).subscribe(async data => {
        //this.showComments.splice(0, this.showComments.length);
        //this.countComment.splice(0, this.countComment.length);
        //this.getPosts();
        data.childComments.length = 0;
        var index = this.posts.findIndex(a => a.id == postId);
        this.posts[index].comments.unshift(data);

        /*for(let i =0;i<this.posts.length;i++){
          this.showComments.push(true);
          this.countComment.push(await this.postService.getCountCommentPost(this.posts[i].id) as number);
        }*/
        //this.getComments(postId);
        //
        const count = await this.postService.getCountCommentPost(this.posts[index].id) as number;
        // this.getCountChildComment(this.posts[index].id);
        this.countCommentPost[index] = count;
        //
        var indexParent = this.showChildCommentArray.findIndex(a => a.idPost === postId)
        this.showChildCommentArray[indexParent].childCommentCheck.push(this.pushArrayShowCommentChild(data.id,data.parentCommentId))
        this.comment.commentUser = "";
      })
    }
  }

  saveChildComment(postId,idComment){
    if(this.comment.commentUser){
      this.comment.postId = postId;
      // this.comment.userId = "26";
      this.comment.userId  = this.authenticationService.currentAccountValue.user.id.toString();
      this.comment.parentCommentId = idComment;
      this.postService.postComment(this.comment).subscribe(async data => {
        var indexPost = this.posts.findIndex(a => a.id == postId)
        var indexComment = this.posts[indexPost].comments.findIndex(a => a.id == idComment);
        data.childComments.length = 0;
        this.posts[indexPost].comments[indexComment].childComments.unshift(data);

        const count = await this.postService.getCountCommentPost(postId) as number;
        // this.getCountChildComment(postId);
        this.countCommentPost[this.posts.findIndex(a => a.id == postId)] = count;

        var indexParent = this.showChildCommentArray.findIndex(a => a.idPost === postId)
        this.showChildCommentArray[indexParent].childCommentCheck.push(this.pushArrayShowCommentChild(data.id,data.parentCommentId))
        this.comment.commentUser = "";
      })
      alert("Thành công");
    }
  }

  checkLogin(){
    if(this.authenticationService.checkLogin()){
      return true;
    }
    else{
      return false;
    }
  }

  createPost(){
    if(this.authenticationService.checkLogin()){
      this.openDialog();     
    }
    else{
      this.openDialogInform();
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
        result.userId = this.authenticationService.currentAccountValue.user.id.toString();
        // result.userId = "26"
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

  public openDialogInform(): void {
    const dialogRef = this.dialog.open(DialogInformComponent, {
      direction: "ltr",
      width: '400px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe((result: Post) => {   
    });
  }

  moreCommentComment(id, idParentComment){
    var number = 2;
    var skip = 0;
    this.dataComment.forEach(element => {
      if(element.postId == id && element.parentCommentId == idParentComment){
        skip++;
      }
    })
    this.getMoreCommentComments(id, idParentComment, number, skip);
  }

  async getMoreCommentComments(id, idParentComment, number, skip){
    const result = await this.postService.getCommentComments(id,idParentComment,number,skip) as Comment[]
    var index = this.posts.findIndex(a => a.id === id);

    var data: Comment[] = [];
    for(let i=0;i<this.dataComment.length;i++){
      if(this.dataComment[i].postId === id){
        data.push(this.dataComment[i]);
      }
    }
    this.posts[index].comments.splice(0, this.posts[index].comments.length);
    var vitrithemdata = data.findIndex(a => a.id === idParentComment);
    var vitrithemdatacomment = this.dataComment.findIndex(a => a.id === idParentComment);

    for(let i=0; i< result.length; i++){
      result[i].childComments.length = 0;
      var indexFind = data.findIndex(a => a.id === result[i].id);
      vitrithemdata++;
      vitrithemdatacomment++;
      if(indexFind == -1){
      // data.push(result[i]);
          // this.dataComment.push(result[i]);
          this.addAItem(data,data.length,vitrithemdata,result[i]);
          this.addAItem(this.dataComment,this.dataComment.length,vitrithemdatacomment,result[i]);
          // this.countLikeComment(element);      
          this.countComment.push(await this.pushCountComment(id, result[i].id))
          var indexParent = this.showChildCommentArray.findIndex(a => a.idPost === id);
          this.showChildCommentArray[indexParent].childCommentCheck.push(this.pushArrayShowCommentChild(result[i].id,idParentComment));
      }  
    }

    if(result){
      // var sortedData = data.sort((a, b) => Number(a.parentCommentId) - Number(b.parentCommentId));
      this.latestNodesPerLevel = [{id: "root",commentUser: "",user: "",data: "",parentCommentId:"", childComments:[]}]
  
      var sortedData = data;
      for(let i=0; i< sortedData.length; i++){
        var level = 1; 
        if (sortedData[i].parentCommentId == null) { 
          level = 1;
        }   
        else{
          var parentId = sortedData[i].parentCommentId;
          while (parentId != null) {
            level++;
            var indexSort = sortedData.findIndex(a => a.id == parentId);
            parentId = sortedData[indexSort].parentCommentId;
          }
        }
  
        var node = {
          id: sortedData[i].id,
          commentUser: `${sortedData[i].commentUser}`,
          user: sortedData[i].user,
          data: sortedData[i].createDate,
          parentCommentId: sortedData[i].parentCommentId,
          childComments: [],
  
        }
  
        if(this.latestNodesPerLevel[level - 1] === undefined){

        }
        else {  
          this.latestNodesPerLevel[level - 1].childComments.push(node);
          this.latestNodesPerLevel[level] = node;
        }
  
      }
      this.latestNodesPerLevel[0].childComments.forEach(element => {
        this.posts[index].comments.push(element)
      });
      // this.latestNodesPerLevel.shift();
      
      // this.latestNodesPerLevel.forEach(element => {
      //   this.posts[index].comments.push(element)
      // });
    }

  }

  moreComment(id){
    var number = 3;
    var index = this.posts.findIndex(a => a.id === id);
    var skip = this.posts[index].comments.length;
    this.getMoreComments(id, number, skip);
  }

  async getMoreComments(id, number, skip){
    const result = await this.postService.getCommentPosts(id,number,skip) as Comment[]
    var index = this.posts.findIndex(a => a.id == id);
    for(let i=0; i< result.length; i++){
      result[i].childComments.length = 0;
      this.posts[index].comments.push(result[i]);
      this.dataComment.push(result[i]);
      this.countComment.push(await this.pushCountComment(id, result[i].id));
      var indexshowChildCommentArray = this.showChildCommentArray.findIndex(a => a.idPost === id);
      this.showChildCommentArray[indexshowChildCommentArray].childCommentCheck.push(this.pushArrayShowCommentChild(result[i].id,result[i].parentCommentId));
    }
  }

  morePosts(){
    var number = 5;
    var skip = this.posts.length;
    this.getMorePosts(number, skip);
  }

  async getMorePosts(number, skip){
    const result = await this.postService.getMorePost(number,skip) as Post[]
    for(let i=0; i< result.length; i++){
      this.getCountCommentPost(result[i].id);
      result[i].comments.forEach(element => {
        this.dataComment.push(element);
      })
      
      //Hidden and display comment
      var arrayChildCommentCheck = Array<ICheckChildComment>();
      for(let j=0; j<result[i].comments.length; j++){
        result[i].comments[j].childComments.length = 0;
        this.countComment.push(await this.pushCountComment(result[i].id, result[i].comments[j].id))
        // this.pushArrayShowCommentChild(this.posts[i].id,this.posts[i].comments[j].id,this.posts[i].comments[j].parentCommentId);
        arrayChildCommentCheck.push(this.pushArrayShowCommentChild(result[i].comments[j].id,result[i].comments[j].parentCommentId));
      }
      this.showChildCommentArray.push(this.pushArrayShowCommentParent(result[i].id,arrayChildCommentCheck));
      this.posts.push(result[i]);
      // this.showComments.push(true);
      // this.getCountChildComment(this.posts[i].id);
    }
    this.likePostData.splice(0, this.likePostData.length);
    this.countLikePost(this.posts);
  }

  livePost(idPost){
    var like: LikeCommentPost = {
      idPost : idPost,
      likePost : true,
      idCommnent: null,
      likeComment: null,
      userId : this.authenticationService.currentAccountValue.user.id
    }
    // like.userId = 26;
    this.postLikeCommentPost(like);
  }
  checkCountLikePost(idPost){
    try{
      var index = this.likePost.findIndex(a => a.id === idPost);
      if(index != -1){
        return true;
      }
      else{
        return false;
      }
    }
    catch(err){

    }
  }
  async getDataCountPost(){
    return await this.postService.getLikePost() as ILike[];
  }
  async countLikePost(posts){
    //this.likePost = result.slice();
    for(let i=0;i<posts.length;i++){
      var index = this.likePost.findIndex(a => a.id === Number(posts[i].id));
      if(index == -1){
        var ilike : ILike = {
          id: Number(posts[i].id),
          count:0
        }
        this.likePostData.push(ilike.count)
      }
      else{
        this.likePostData.push(this.likePost[index].count);
      }
    }
  }

  liveComment(idComment){
    var like: LikeCommentPost = {
      idPost : null,
      likePost : null,
      idCommnent: idComment,
      likeComment: true,
      userId : this.authenticationService.currentAccountValue.user.id
    }
    // like.userId = 26;
    this.postLikeCommentPost(like);
  }

  async getDataCountComment(){
    return await this.postService.getLikeComment() as ILike[];
  }
  async countLikeComment(comments){
    // const result = await this.postService.getLikeComment() as any[];
    // this.likeComment = result.slice();
    for(let i=0;i<comments.length;i++){
      var index = this.likeComment.findIndex(a => a.id === Number(comments[i].id));
      if(index == -1){
        var ilike : ILike = {
          id: Number(comments[i].id),
          count:0
        }
        this.likeCommentData.push(ilike.count)
      }
      else{
        this.likeCommentData.push(this.likeComment[index].count);
      }
    }
  }
  checkCountLikeComment(idComment){
    try{
      var index = this.likePost.findIndex(a => a.id === idComment);
      if(index != -1){
        return true;
      }
      else{
        return false;
      }
    }
    catch(err){

    }
  }

  postLikeCommentPost(like){
    this.postService.postLikeCommentPost(like).subscribe(data => {
      var index = this.posts.findIndex(a =>  Number(a.id) == data.idPost);
      this.likePostData[index]++;
    })
  }

  copyContent() {
    var link = window.location.href;
    this.clipboardService.copyFromContent(link);
    alert("Đã sao chép link chia sẽ")
  }
}
