import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { IRecentlyPost } from 'src/app/model/interface/IRecentlyPost';
import { Post } from 'src/app/model/Post';
import { Comment } from 'src/app/model/Comment';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PostService } from 'src/app/services/post.service';
import { ICheckChildComment, IListCheckParentComment } from 'src/app/model/interface/ICheckChildComment';
import { ICommentParent } from 'src/app/model/interface/ICommentParent';
import { ICountComment } from 'src/app/model/interface/ICountComment';
import { LikeCommentPost } from 'src/app/model/LikeCommentPost';
import { ILike } from 'src/app/model/interface/ILike';
import { DialogInformComponent } from 'src/app/dialog-inform/dialog-inform.component';
import { INotifyComment } from 'src/app/model/interface/INotifyComment';
import { DialogReportComponent } from '../dialog-report/dialog-report.component';
import { DialogPostComponent } from '../dialog-post/dialog-post.component';

@Component({
  selector: 'app-detail-post-forum',
  templateUrl: './detail-post-forum.component.html',
  styleUrls: ['./detail-post-forum.component.css']
})
export class DetailPostForumComponent implements OnInit {

  dataRecently: Array<IRecentlyPost> = [];
  totalPost: number = 0;
  totalComment: number = 0;
  dataUser:User;

  showChildCommentArray:Array<IListCheckParentComment> = [];

  latestNodesPerLevel;
  commentUser = "";
  comments: Array<Comment> = [];
  countCommentPost = 0;
  countComment: Array<ICountComment> = [];
  dataComment:Comment[] = [];
  user: User = {id: 0, hovaTen:"", gender:"", doB:null, email:"",facebook: "", userImage:"", createdDate:null, lastLogOnDate:null,account:null, accountid:"", pubishFree:null}
  dataPost: Post= {id: "", postUser: '', createDate: null, user: this.user, userId: "", comment: null, comments: null, hiddenOrNotHidden: null};

  countParentComment = 0;
  likePostData: number = 0;
  likeCommentData: Array<ILike> = [];

  notifys: Array<INotifyComment> = [];
  countNotifyNotSee = 0;
  postUser = "";
  image = "";
  id = 0;
  constructor(private router: ActivatedRoute,private route: Router,private clipboardService: ClipboardService,public postService:PostService,public dialog: MatDialog,private authenticationService: AuthenticationService) { 
    this.image = "../../assets/forum/images1/resources/friend-avatar2.jpg";
    if(this.authenticationService.currentAccountValue){
      this.id = this.authenticationService.currentAccountValue.user.id;
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
        userImage: "../../assets/forum/images1/resources/friend-avatar2.jpg",
        createdDate:null,
        lastLogOnDate:null,
        account:null,
        accountid:"",
        pubishFree:null
      }
      this.dataUser = user;
    }
  }

  async ngOnInit(): Promise<void> {
    const id = this.router.snapshot.paramMap.get("id");
    //get data post 
    this.getDataPost(id);
    // this.countLikePost(id)
    //get data comment
    this.getDataComment(id);
    //count comment
    this.getCountCommentPost(id);
    this.countParentComment = await this.postService.getCountCommentParent(id) as number;
    this.dataRecently = await this.postService.getRecentlyPost() as IRecentlyPost[];
    this.totalPost = await this.postService.totalPost() as number;
    this.totalComment = await this.postService.totalComment() as number;
    this.likePostData = await this.postService.getLikePost(Number(id)) as number;

    if(this.checkLogin()){
      this.notifys = await this.postService.getCommentNotifyByOneUser(this.authenticationService.currentAccountValue.user.id.toString()) as INotifyComment[];
      for(let i=0; i< this.notifys.length;i++){
        if(this.notifys[i].imageUser == null){
          this.notifys[i].imageUser = this.image;
        }
      }
      this.countNotifyNotSee = await this.postService.countCommentNotifyByOneUser(this.authenticationService.currentAccountValue.user.id.toString()) as number;
    }
  }

  ///////////////////////////////////////////////////////////////////////////////
  createPost(){
    if(this.authenticationService.checkLogin()){
      this.postUser = this.dataPost.postUser
      this.openDialogEdit(this.dataPost.id);
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
        this.dataPost.postUser = result;
        alert("Sửa bài thành công")
      }
    });
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
  async onClickDetailPostINotify(data){
    if(data.justSee == false){
      data.justSee = true;
      var update = {id: data.id,idUserReceiced: data.idUserReceiced,justSee: data.justSee,commentId: data.idComment};
      const result = await this.postService.updateCommentNotifyByOneUser(update,data.id)
    }
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/forum',data.postUser,data.idPost]);
    }); 
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////
  onClickDetailPost(name,id){
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/forum',name,id]);
    }); 
    //this.route.navigate(['/forum',name,id]);
    //window.location.replace(link);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  async getDataPost(id){
    try{
      var result = await this.postService.getPostById(id) as Post;
      this.user = result.user;
      this.dataPost = result;
      if(this.dataPost.user.userImage == null){
        this.dataPost.user.userImage = this.image;
      }
    }
    catch(err){

    }
  }

  async getDataComment(id){
    var result = await this.postService.getParentCommentById(id) as Comment[];
    for(let i=0;i<result.length;i++){
      if(result[i].user.userImage == null){
        result[i].user.userImage = this.image;
      }
      this.countComment.push(await this.pushCountComment(id, result[i].id))
    }
    this.comments = result.slice();
    this.dataComment = result.slice();

    var arrayChildCommentCheck = Array<ICheckChildComment>();
    for(let j=0; j<result.length; j++){
      result[j].childComments.length = 0;
      arrayChildCommentCheck.push(this.pushArrayShowCommentChild(result[j].id,result[j].parentCommentId));
    }
    this.showChildCommentArray.push(this.pushArrayShowCommentParent(this.dataPost.id,arrayChildCommentCheck));  

    this.countLikeComment(this.comments);
  }

  async getCountCommentPost(id) {
    this.countCommentPost = await this.postService.getCountCommentPost(id) as number;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Lưu comment parent
  saveComment(postId){
    if(this.commentUser){
      var comment = new Comment;
      comment.postId = postId;
      // this.comment.postId = postId;
      // this.comment.userId = "26";
      comment.userId  = this.authenticationService.currentAccountValue.user.id.toString();
      this.postService.postComment(comment,Number(this.authenticationService.currentAccountValue.user.id)).subscribe(async data => {
       
        data.childComments.length = 0;
        if(data.user.userImage == null)
        {
          data.user.userImage = this.image;
        }
        this.comments.unshift(data);
        this.dataComment.unshift(data);
        this.getCountCommentPost(postId);
        //
        var indexParent = this.showChildCommentArray.findIndex(a => a.idPost === postId)
        this.showChildCommentArray[indexParent].childCommentCheck.push(this.pushArrayShowCommentChild(data.id,data.parentCommentId))
        this.commentUser = "";
      })
    }
    this.countLikeComment(this.comments);
  }
 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // more comment parent
  moreComment(id){
    var number = 3;
    var skip = this.comments.length;
    this.getMoreComments(id, number, skip);
  }

  async getMoreComments(id, number, skip){
    const result = await this.postService.getCommentPosts(id,number,skip) as Comment[]
    for(let i=0; i< result.length; i++){
      result[i].childComments.length = 0;
      if(result[i].user.userImage == null)
      {
        result[i].user.userImage = this.image;
      }
      this.comments.push(result[i]);
      this.dataComment.push(result[i]);
      // this.countComment.push(await this.pushCountComment(id, result[i].id));
      var indexshowChildCommentArray = this.showChildCommentArray.findIndex(a => a.idPost === id);
      this.showChildCommentArray[indexshowChildCommentArray].childCommentCheck.push(this.pushArrayShowCommentChild(result[i].id,result[i].parentCommentId));
    }
    this.countLikeComment(this.comments);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Share link
  copyContent() {
    var link = window.location.href;
    this.clipboardService.copyFromContent(link);
    alert("Đã sao chép link chia sẽ")
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // show more comment parent
  checkShowMoreCommentParent(length){
    try{
      
      if(this.countParentComment > length){
        return true;
      }
      else{
        return false;
      }
    }
    catch(err){

    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // lưu comment child
  saveChildComment(postId,idComment){
    if(this.commentUser){
      var comment = new Comment;
      comment.postId = postId;
      // this.comment.userId = "26";
      comment.userId  = this.authenticationService.currentAccountValue.user.id.toString();
      comment.parentCommentId = idComment;
      this.postService.postComment(comment,Number(this.authenticationService.currentAccountValue.user.id)).subscribe(async data => {
        var indexComment = this.comments.findIndex(a => a.id === idComment);
        data.childComments.length = 0;
        if(data.user.userImage == null)
        {
          data.user.userImage = this.image;
        }
        this.comments[indexComment].childComments.unshift(data);
        this.dataComment.push(data)
        this.getCountCommentPost(postId);

        var indexParent = this.showChildCommentArray.findIndex(a => a.idPost === postId)
        this.showChildCommentArray[indexParent].childCommentCheck.push(this.pushArrayShowCommentChild(data.id,data.parentCommentId));
        this.countLikeComment(this.comments);

        this.commentUser = "";
      })
      alert("Thành công");
    }
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

  ///////////////////////////////////////////////////////////////////////////////////////////////
  // more comment child
  addAItem(a,n,vitrithem,phantuthem){
    for(let i=n; i> vitrithem; i--){
      a[i] = a[i-1];
    }
    a[vitrithem] = phantuthem;
    n++;
  }

  moreCommentComment(id, idParentComment){
    var number = 2;
    var skip = 0;
    this.dataComment.forEach(element => {
      if(element.parentCommentId == idParentComment){
        skip++;
      }
    })
    this.getMoreCommentComments(id, idParentComment, number, skip);
  }

  async getMoreCommentComments(id, idParentComment, number, skip){
    const result = await this.postService.getCommentComments(id,idParentComment,number,skip) as Comment[]

    var data: Comment[] = [];
    for(let i=0;i<this.dataComment.length;i++){
      if(this.dataComment[i].postId === id){
        data.push(this.dataComment[i]);
      }
    }
    this.comments.splice(0, this.comments.length);
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
          if(result[i].user.userImage == null)
          {
            result[i].user.userImage = this.image;
          }
          this.addAItem(data,data.length,vitrithemdata,result[i]);
          this.addAItem(this.dataComment,this.dataComment.length,vitrithemdatacomment,result[i]);
          // this.countLikeComment(element);  
          /// get count comment child for mỗi comment parent    
          this.countComment.push(await this.pushCountComment(id, result[i].id))
          //////////////////////////////////////////////////
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
        this.comments.push(element)
      });
      this.countLikeComment(this.dataComment);
    }

  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  // open comment child
  openComment(idPost, idComment, idParent){
    let indexParent = this.showChildCommentArray.findIndex(a => a.idPost === idPost);
    let indexChild = this.showChildCommentArray[indexParent].childCommentCheck.findIndex(a => a.idComment === idComment);
    this.showChildCommentArray[indexParent].childCommentCheck[indexChild].checkChildComment = !this.showChildCommentArray[indexParent].childCommentCheck[indexChild].checkChildComment;

    this.getComment(idPost, idComment,idParent);
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

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // get data comment open child
  async getComment(idPost,idComment,idParent){
    var result = await this.postService.getChildCommentById(idComment) as Comment[];
    var data: Comment[] = [];
    for(let i=0;i<this.dataComment.length;i++){
      if(this.dataComment[i].postId == idPost){
        data.push(this.dataComment[i]);
      }
    }
    this.comments.splice(0, this.comments.length);
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
          if(result[i].user.userImage == null)
          {
            result[i].user.userImage = this.image;
          }
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
        this.comments.push(element)
      });
      this.countLikeComment(this.comments);
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////////
  // kiểm tra show comment child chữ more comment child
  countCommentComment(idComment){
    try{
      
      var length = 0;
      this.dataComment.forEach(element => {
        if(element.parentCommentId == idComment){
          length++;
        }
      })
      let result = this.countComment.find(a => a.idComment == idComment);
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

  ///////////////////////////////////////////////////////////////////////////////////////////////
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

  ///////////////////////////////////
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
  }

  ///////////////////////////////////////
  checkLogin(){
    if(this.authenticationService.checkLogin()){
      return true;
    }
    else{
      return false;
    }
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // like post
  public openDialogInform(): void {
    const dialogRef = this.dialog.open(DialogInformComponent, {
      direction: "ltr",
      width: '400px',
      height: '300px'
    });

    dialogRef.afterClosed().subscribe((result: Post) => {   
    });
  }

  async livePost(idPost){
    if(this.checkLogin()){
      const index = await this.postService.getCheckLike(idPost,this.authenticationService.currentAccountValue.user.id);
      if(index == true){
        const result = await this.postService.deleteLike(Number(idPost),Number(this.authenticationService.currentAccountValue.user.id))
        
        
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
        await this.postLikeCommentPost(like);
      }
      this.likePostData = await this.postService.getLikePost(Number(idPost)) as number;
    }
    else{
      this.openDialogInform();
    }
  }

  async postLikeCommentPost(like){
    const result = await this.postService.postLikeCommentPost(like)
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // like comment
  async liveComment(idComment){
    if(this.checkLogin()){
      const index = await this.postService.getCheckLikeComment(idComment,this.authenticationService.currentAccountValue.user.id);
      if(index == true){
        const result = await this.postService.deleteLikeComment(Number(idComment),Number(this.authenticationService.currentAccountValue.user.id))        
      }
      else{
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
      this.countLikeComment(this.dataComment);
    }
    else{
      this.openDialogInform();
    }
  }
  async countLikeComment(comments){
    // const result = await this.postService.getLikeComment() as any[];
    // this.likeComment = result.slice();
    this.likeCommentData.splice(0, this.likeCommentData.length);
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

  ////Display value like comment
  displayLikePost(){
    return this.likePostData;
  }

  displayLikeComment(idComment){
    const index = this.likeCommentData.findIndex(a => a.id === idComment);
    if(index == -1){
      return 0;
    }
    else{
      return this.likeCommentData[index].count;
    }
   
  }

  ////
  onLogout = () => {
    this.authenticationService.logout();
    window.location.reload();
  }  
}
