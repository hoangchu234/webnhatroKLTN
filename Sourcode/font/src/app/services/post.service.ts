import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../model/Post';
import { Comment } from '../model/Comment';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { LikeCommentPost } from '../model/LikeCommentPost';
import { INotifyComment } from '../model/interface/INotifyComment';
import { ReportPost } from '../model/ReportPost';
import { environment } from 'src/environments/environment';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  public postPost(newPost: Post): Observable<Post>{
    return this.http.post<Post>(this.urlAPI + "/api/Posts", newPost, httpOptions).pipe(
      tap((post: Post) => post),
      catchError(error => of(new Post()))
    );
  }

  public postComment(newComment: Comment,id: number): Observable<Comment>{
    const url = `${this.urlAPI + "/api/Comments/PostComment"}/${id}`;
    return this.http.post<Comment>(url, newComment, httpOptions).pipe(
      tap((comment: Comment) => comment),
      catchError(error => of(new Comment()))
    );
  }

  // public postLikeCommentPost(newLike: LikeCommentPost): Observable<LikeCommentPost>{
  //   return this.http.post<LikeCommentPost>(this.urlAPI + "/api/LikeCommentPosts", newLike, httpOptions).pipe(
  //     tap((like: LikeCommentPost) => like),
  //     catchError(error => of(new LikeCommentPost()))
  //   );
  // }
  postLikeCommentPost = async (newLike: LikeCommentPost) => {
    try {
      const url = `${this.urlAPI + "/api/LikeCommentPosts"}`;
      return await this.http.post(url, newLike, httpOptions).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  // public deleteLike(idPost: number,idUser: number): Observable<any>{
  //   const url = `${this.urlAPI + "/api/LikeCommentPosts/DeleteLikeCommentPost"}/${idPost}/${idUser}`;
  //   return this.http.delete<LikeCommentPost>(url, httpOptions).pipe(
  //     tap(deleteLike => deleteLike),
  //     catchError(error => of(null))
  //   );

  // }

  deleteLike = async (idPost: number,idUser: number) =>{
    try {
      const url = `${this.urlAPI + "/api/LikeCommentPosts/DeleteLikeCommentPost"}/${idPost}/${idUser}`;
      return await this.http.delete(url, httpOptions).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  // public deleteLikeComment(idComment: number,idUser: number): Observable<any>{
  //   const url = `${this.urlAPI + "/api/LikeCommentPosts/DeleteLikeCommentPostver2"}/${idComment}/${idUser}`;
  //   return this.http.delete<LikeCommentPost>(url, httpOptions).pipe(
  //     tap(deleteLike => deleteLike),
  //     catchError(error => of(null))
  //   );

  // }

  deleteLikeComment = async (idComment: number,idUser: number) =>{
    try {
      const url = `${this.urlAPI + "/api/LikeCommentPosts/DeleteLikeCommentPostver2"}/${idComment}/${idUser}`;
      return await this.http.delete(url, httpOptions).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  updateCommentNotifyByOneUser = async (notifyComment,id) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/PutCommentNotifyByOneUser"}/${id}`;
      return await this.http.put(url, notifyComment, httpOptions).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  // public updateCommentNotifyByOneUser(notifyComment: INotifyComment): Observable<any>{
  //   return this.http.put(`${this.urlAPI + "/api/Comments/PutCommentNotifyByOneUser"}/${notifyComment.id}`, notifyComment, httpOptions).pipe(
  //     tap(updatenotifyComment => updatenotifyComment),
  //     catchError(error => of())
  //   );
  // }

  public updatPostById(post: Post): Observable<any>{
    return this.http.put(`${this.urlAPI + "/api/Posts/PutPostById"}/${post.id}`, post, httpOptions).pipe(
      tap(updatePost => updatePost),
      catchError(error => of())
    );
  }

  /*public getPost(id: number, skipNumber: number): Observable<any>{
    const url = `${this.urlAPI + "/api/Posts/GetPosts"}/${id}/${skipNumber}`;
    return this.http.get<Post[]>(url).pipe(
      tap(receivedPosts => receivedPosts),
      catchError(error => of([]))
    );
  }*/

  public getCheckLike = async (idPost: number, idUser: number) => {
    try {
      const url = `${this.urlAPI + "/api/LikeCommentPosts/GetCheckLikeOneTime"}/${idPost}/${idUser}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public getCheckLikeComment = async (idComment: number, idUser: number) => {
    try {
      const url = `${this.urlAPI + "/api/LikeCommentPosts/GetCheckLikeOneTimever2"}/${idComment}/${idUser}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public getPostById = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Posts/GetPost"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public getMorePost = async (number: number, skipNumber: number) => {
    try {
      const url = `${this.urlAPI + "/api/Posts/GetPosts"}/${number}/${skipNumber}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public getSomePost = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Posts/GetSomePosts").toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  /*public getChildCommentById(id: string): Observable<Comment[]>{
    const url = `${this.urlAPI + "/api/Comments/GetChildComments"}/${id}`;
    return this.http.get<Comment[]>(url).pipe(
      tap(getChildComments => getChildComments),
      catchError(error => of([]))
    );
  }*/
  public getChildCommentById = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/GetChildComments"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public getCountParentComment = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Comments/GetCountParentComment").toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }


  public getLikePost = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Posts/GetCountLikePost"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  public getLikeComment = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/GetCountLikeComment"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  public totalPost = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Posts/TotalPost").toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }
  public totalComment = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Comments/TotalComment").toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  public getRecentlyPost = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Posts/GetRecentlyPost").toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }
  /*public getParentCommentById(id: string): Observable<Comment[]>{
    const url = `${this.urlAPI + "/api/Comments/GetParentComments"}/${id}`;
    return this.http.get<Comment[]>(url).pipe(
      tap(getChildComments => getChildComments),
      catchError(error => of([]))
    );
  }*/
  public getParentCommentById = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/GetParentComments"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public getCommentFirstsById = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/GetCommentFirsts"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  public getCountComment = async (id: string, idParent: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/CountComment"}/${id}/${idParent}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  public getCountCommentPost = async (id: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/CountCommentPost"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  public getCountCommentParent = async (id: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/CountCommentParent"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  public getCountChildCommentPost = async (id: string, idParentComment: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/CountChildCommentPost"}/${id}/${idParentComment}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  public getCommentPosts = async (id: string, number: string, skip: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/GetCommentPosts"}/${id}/${number}/${skip}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  public getCommentComments = async (id: string, idParentComment: string, number: string, skip: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/GetCommentComments"}/${id}/${idParentComment}/${number}/${skip}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  public getCommentNotifyByOneUser = async (id: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/GetCommentNotifyByOneUser"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

  public countCommentNotifyByOneUser = async (id: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/CountCommentNotifyByOneUser"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }


  ///report
  public postReportPost(reportPost: ReportPost): Observable<ReportPost>{
    const url = `${this.urlAPI + "/api/ReportPosts"}`;
    return this.http.post<ReportPost>(url, reportPost, httpOptions).pipe(
      tap((reportPost: ReportPost) => reportPost),
      catchError(error => of(new ReportPost()))
    );
  }

  public getReportPosts = async () => {
    try {
      const url = `${this.urlAPI + "/api/ReportPosts/GetReportPosts"}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      //console.log(e);
    }
  }

}
