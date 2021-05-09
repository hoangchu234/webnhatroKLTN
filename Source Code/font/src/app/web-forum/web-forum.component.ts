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
import { INotifyComment } from '../model/interface/INotifyComment';
import { ReportPost } from '../model/ReportPost';
import { DialogReportComponent } from './dialog-report/dialog-report.component';

@Component({
  selector: 'app-web-forum',
  templateUrl: './web-forum.component.html',
  styleUrls: ['./web-forum.component.css']
})
export class WebForumComponent implements OnInit {

  postUser = ""
  posts: Post[];
  comment = new Comment();
  // showComments:boolean[] = [];
  showChildCommentArray:Array<IListCheckParentComment> = [];

  // countComment: number[] = [];
  // countChildComment: number[] = [];
  countCommentPost: number[] = [];
  countComment: Array<ICountComment> = [];
  countCommentParent: Array<ICommentParent> = [];

  likePostData: Array<ILike> = [];
  likeCommentData: Array<ILike> = [];
  countChildComment: Array<ILike> = [];
  latestNodesPerLevel;

  dataComment:Comment[] = [];
  totalPost: number = 0;
  totalComment: number = 0;
  dataRecently: Array<IRecentlyPost> = [];
  dataUser:User;

  notifys: Array<INotifyComment> = [];
  countNotifyNotSee = 0;
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
        userImage: "../../assets/forum/images1/admin.jpg",
        createdDate:null,
        lastLogOnDate:null,
        account:null,
        accountid:""
      }
      this.dataUser = user;
    }
  }

  async ngOnInit(): Promise<void> {
    // this.likePost = await this.getDataCountPost();
    // this.likeComment = await this.getDataCountComment();
    this.totalPost = await this.postService.totalPost() as number;
    this.totalComment = await this.postService.totalComment() as number;
    this.dataRecently = await this.postService.getRecentlyPost() as IRecentlyPost[];
    this.getCountParentComment();

    if(this.checkLogin()){
      this.notifys = await this.postService.getCommentNotifyByOneUser(this.authenticationService.currentAccountValue.user.id.toString()) as INotifyComment[];
      this.countNotifyNotSee = await this.postService.countCommentNotifyByOneUser(this.authenticationService.currentAccountValue.user.id.toString()) as number;
    }
  }

  
  ///////////////////////////////////////////////////////////////////////////////////////////////
  // get data post and comment
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
      // this.countLikeComment(this.posts[i].comments);

      //
      /*var commentPost: CommentPost;
      commentPost.idPost = Number(this.posts[i].id);
      for(let j=0; j<this.posts[i].comments.length; j++){
        commentPost.check.push(true);
        this.showChildComments.push(commentPost);
      }*/
    }

    //this.countLikePost(this.posts);
    this.countLikeComment(this.dataComment);
    this.countLikePost(this.posts);
    //this.countLikeComment();
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  checkReport(id){
    if(this.checkLogin()){
      this.openDialogReport(id);
    }
    else{
      this.openDialogInform();
    }
  }

  public openDialogReport(id): void {
    const dialogRef = this.dialog.open(DialogReportComponent, {
      direction: "ltr",
      width: '650px',
      height: '',
      data: id
    });

    dialogRef.afterClosed().subscribe((result: Post) => {
     
    });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  onClickDetailPostINotify(data,name,id){
    if(data.justSee == false){
      data.justSee = true;
      this.postService.updateCommentNotifyByOneUser(data).subscribe();
    }
    // var link = '/forum' + '/' + name + '/' + id
    this.route.navigate(['/forum',name,id]);

  }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  onClickDetailPost(name,id){
    // var link = '/forum' + '/' + name + '/' + id
    this.route.navigate(['/forum',name,id]);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // kiểm tra show tree lặp lại vòng for
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

  //////////////////////////////////////////////////////////////////////////////////////////////
  // open comment child
  openComment(idPost, idComment, idParent){
    // console.log(this.showChildCommentArray)
    // console.log(idPost, idComment, idParent)
    let indexParent = this.showChildCommentArray.findIndex(a => a.idPost === idPost);
    let indexChild = this.showChildCommentArray[indexParent].childCommentCheck.findIndex(a => a.idComment === idComment);
    this.showChildCommentArray[indexParent].childCommentCheck[indexChild].checkChildComment = !this.showChildCommentArray[indexParent].childCommentCheck[indexChild].checkChildComment;

    this.getComment(idPost, idComment,idParent);

  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // get data comment open child
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
      this.countLikeComment(this.dataComment);

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
          createDate: sortedData[i].createDate,
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
        this.posts[index].comments.push(element);
      });
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // kiểm tra coi đã click vào nút show comment chưa
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

  //////////////////////////////////////////////////////////////////////////////////////////////
  // kiểm tra show comment child chữ more comment child
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

  ////Display value like comment child
  displayCountCommentChild(idPost,idComment){
    const index = this.countComment.findIndex(a => a.idPost == idPost && a.idComment == idComment);
    if(index == -1){
      return 0;
    }
    else{
      return this.countComment[index].count;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  addAItem(a,n,vitrithem,phantuthem){
    for(let i=n; i> vitrithem; i--){
      a[i] = a[i-1];
    }
    a[vitrithem] = phantuthem;
    n++;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  myCondition(id){
    if(id < 4){
      return true;
    }
    else{
      return false;
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  // count comment parent for each post
  async getCountCommentPost(id) {
    this.countCommentPost.push(await this.postService.getCountCommentPost(id) as number);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  //// show more comment parent
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

  //////////////////////////////////////////////////////////////////////////////////////////////
  /// get count comment child for mỗi comment parent
  async getCountChildComment(id,idComment) {
    return await this.postService.getCountChildCommentPost(id,idComment) as number;
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

  //////////////////////////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////////////////////////
  // open comment parent
  onselecte(idPost): void{
    let index = this.showChildCommentArray.findIndex(a => a.idPost === idPost);
    this.showChildCommentArray[index].checkParentComment = !this.showChildCommentArray[index].checkParentComment;
    // this.getComments(id);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Lưu comment parent
  saveComment(postId){
    if(this.comment.commentUser){
      this.comment.postId = postId;
      // this.comment.userId = "26";
      this.comment.userId  = this.authenticationService.currentAccountValue.user.id.toString();
      this.postService.postComment(this.comment,Number(this.authenticationService.currentAccountValue.user.id)).subscribe(async data => {
        //this.showComments.splice(0, this.showComments.length);
        //this.countComment.splice(0, this.countComment.length);
        //this.getPosts();
        data.childComments.length = 0;
        var index = this.posts.findIndex(a => a.id == postId);
        this.posts[index].comments.unshift(data);

        this.dataComment.unshift(data);
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
        this.countLikeComment(this.dataComment);
      })
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // lưu comment child
  saveChildComment(postId,idComment){
    if(this.comment.commentUser){
      this.comment.postId = postId;
      // this.comment.userId = "26";
      this.comment.userId  = this.authenticationService.currentAccountValue.user.id.toString();
      this.comment.parentCommentId = idComment;
      this.postService.postComment(this.comment,Number(this.authenticationService.currentAccountValue.user.id)).subscribe(async data => {
        var indexPost = this.posts.findIndex(a => a.id == postId)
        var indexComment = this.posts[indexPost].comments.findIndex(a => a.id == idComment);
        data.childComments.length = 0;
        this.posts[indexPost].comments[indexComment].childComments.unshift(data);
        ////////////////
        this.dataComment.push(data)
        const count = await this.postService.getCountCommentPost(postId) as number;
        // this.getCountChildComment(postId);
        this.countCommentPost[this.posts.findIndex(a => a.id == postId)] = count;

        var indexParent = this.showChildCommentArray.findIndex(a => a.idPost === postId)
        this.showChildCommentArray[indexParent].childCommentCheck.push(this.pushArrayShowCommentChild(data.id,data.parentCommentId))
        this.comment.commentUser = "";
        this.countLikeComment(this.dataComment);
        this.getCountCommentPost(data.id);
      })
      alert("Thành công");
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  checkLogin(){
    if(this.authenticationService.checkLogin()){
      return true;
    }
    else{
      return false;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  createPost(idPost){
    if(this.authenticationService.checkLogin()){
      if(idPost == 0){
        this.postUser = "";
        this.openDialog();
      }
      else if(idPost != 0){
        var index = this.posts.findIndex(a => a.id === idPost);
        this.postUser = this.posts[index].postUser
        this.openDialogEdit(idPost);
      }
    }
    else{
      this.openDialogInform();
    }
  }

  public openDialogEdit(idPost): void {
    const dialogRef = this.dialog.open(DialogPostComponent, {
      direction: "ltr",
      width: '400px',
      height:'auto',
      data: this.postUser
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if(result != undefined){
        var post = new Post();
        post.id = idPost;
        post.postUser = result;
        post.hiddenOrNotHidden = false;
        post.userId = this.authenticationService.currentAccountValue.user.id.toString();
        // result.userId = "26"
        this.postService.updatPostById(post).subscribe(data => {

        });
        var index = this.posts.findIndex(a => a.id === idPost);
        this.posts[index].postUser = result;
        alert("Sửa bài thành công")
      }
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogPostComponent, {
      direction: "ltr",
      width: '400px',
      height:'auto',
      data: this.postUser
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      if(result != undefined){
        var post = new Post();
        post.postUser = result;
        post.hiddenOrNotHidden = false;
        post.userId = this.authenticationService.currentAccountValue.user.id.toString();
        // result.userId = "26"
        this.postService.postPost(post).subscribe(data => {
         
          this.posts.unshift(data);
          var arrayChildCommentCheck = Array<ICheckChildComment>();
          this.showChildCommentArray.push(this.pushArrayShowCommentParent(data.id,arrayChildCommentCheck));
          this.countLikePost(this.posts);

          alert("Đăng bài thành công")
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // more comment child
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
    this.countLikeComment(this.dataComment);


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
          createDate: sortedData[i].createDate,
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // more comment parent
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
    this.countLikeComment(this.dataComment);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // more post when click
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
    this.countLikePost(this.posts);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // like post
  async livePost(idPost){
    if(this.checkLogin()){
      const index = await this.postService.getCheckLike(idPost,this.authenticationService.currentAccountValue.user.id);
      if(index == true){
        this.postService.deleteLike(Number(idPost),Number(this.authenticationService.currentAccountValue.user.id)).subscribe(a => {
          this.countLikePost(this.posts);
        });

      }
      else{
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
    }
    else{
      this.openDialogInform();
    }
  }

  async getDataCountPost(id){
    return await this.postService.getLikePost(id) as number;
  }

  async countLikePost(posts){
    //this.likePost = result.slice();
    this.likePostData.splice(0, this.likePostData.length);
    var ilike = {id: 0 ,count: 0};
    for(let i=0;i<posts.length;i++){
      var count = await this.postService.getLikePost(posts[i].id) as number;
      ilike = {
        id: Number(posts[i].id),
        count:count
      }
      this.likePostData.push(ilike)
    }
  }

  ////Display value like post
  displayLikePost(idPost){
    const index = this.likePostData.findIndex(a => a.id === idPost);
    if(index == -1){
      return 0;
    }
    else{
      return this.likePostData[index].count;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // like comment
  async liveComment(idComment){
    if(this.checkLogin()){
      const index = await this.postService.getCheckLikeComment(idComment,this.authenticationService.currentAccountValue.user.id);
      if(index == true){
        this.postService.deleteLikeComment(Number(idComment),Number(this.authenticationService.currentAccountValue.user.id)).subscribe(a => {
          this.countLikeComment(this.dataComment);
        });
      }
      else{
        var like: LikeCommentPost = {
          idPost : null,
          likePost : null,
          idCommnent: idComment,
          likeComment: true,
          userId : this.authenticationService.currentAccountValue.user.id
        }
        this.postLikeCommentPost(like);
        // like.userId = 26;
      }
    }
    else{
      this.openDialogInform();
    }
  }

  // async getDataCountComment(id){
  //   return await this.postService.getLikeComment(id) as number;
  // }
  async countLikeComment(comments){
    // const result = await this.postService.getLikeComment() as any[];
    // this.likeComment = result.slice();
    this.likeCommentData.splice(0,this.likeCommentData.length);
    var ilike = {id: 0 ,count: 0};
    for(let i=0;i<comments.length;i++){
      var count = await this.postService.getLikeComment(comments[i].id) as number;
      ilike = {
        id: Number(comments[i].id),
        count:count
      }
      this.likeCommentData.push(ilike);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // lưu like
  postLikeCommentPost(like){
    this.postService.postLikeCommentPost(like).subscribe(data => {
      var index = this.posts.findIndex(a =>  Number(a.id) === data.idPost);
      this.countLikePost(this.posts);
      this.countLikeComment(this.dataComment);
    })
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  copyContent() {
    var link = window.location.href;
    this.clipboardService.copyFromContent(link);
    alert("Đã sao chép link chia sẽ")
  }

  ////Display value like comment
  displayLikeComment(idComment){
    const index = this.likeCommentData.findIndex(a => a.id === idComment);
    if(index == -1){
      return 0;
    }
    else{
      return this.likeCommentData[index].count;
    }
  }
}
