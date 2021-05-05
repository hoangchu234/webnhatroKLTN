import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../model/Post';
import { Comment } from '../model/Comment';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { LikeCommentPost } from '../model/LikeCommentPost';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private urlAPI = 'https://localhost:44324';

  constructor(private http: HttpClient) { }

  public postPost(newPost: Post): Observable<Post>{
    return this.http.post<Post>(this.urlAPI + "/api/Posts", newPost, httpOptions).pipe(
      tap((post: Post) => post),
      catchError(error => of(new Post()))
    );
  }

  public postComment(newComment: Comment): Observable<Comment>{
    return this.http.post<Comment>(this.urlAPI + "/api/Comments", newComment, httpOptions).pipe(
      tap((comment: Comment) => comment),
      catchError(error => of(new Comment()))
    );
  }

  public postLikeCommentPost(newLike: LikeCommentPost): Observable<LikeCommentPost>{
    return this.http.post<LikeCommentPost>(this.urlAPI + "/api/LikeCommentPosts", newLike, httpOptions).pipe(
      tap((like: LikeCommentPost) => like),
      catchError(error => of(new LikeCommentPost()))
    );
  }

  /*public getPost(id: number, skipNumber: number): Observable<any>{
    const url = `${this.urlAPI + "/api/Posts/GetPosts"}/${id}/${skipNumber}`;
    return this.http.get<Post[]>(url).pipe(
      tap(receivedPosts => receivedPosts),
      catchError(error => of([]))
    );
  }*/

  public getPostById = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Posts/GetPost"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  public getMorePost = async (number: number, skipNumber: number) => {
    try {
      const url = `${this.urlAPI + "/api/Posts/GetPosts"}/${number}/${skipNumber}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  public getSomePost = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Posts/GetSomePosts").toPromise();
    }
    catch (e) {
      console.log(e);
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
      console.log(error);
    }
  }

  public getCountParentComment = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Comments/GetCountParentComment").toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }


  public getLikePost = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Posts/GetCountLikePost"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  public getLikeComment = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/GetCountLikeComment"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  public totalPost = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Posts/TotalPost").toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }
  public totalComment = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Comments/TotalComment").toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  public getRecentlyPost = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Posts/GetRecentlyPost").toPromise();
    }
    catch (e) {
      console.log(e);
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
      console.log(error);
    }
  }

  public getCommentFirstsById = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/GetCommentFirsts"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  public getCountComment = async (id: string, idParent: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/CountComment"}/${id}/${idParent}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  public getCountCommentPost = async (id: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/CountCommentPost"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  public getCountCommentParent = async (id: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/CountCommentParent"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  public getCountChildCommentPost = async (id: string, idParentComment: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/CountChildCommentPost"}/${id}/${idParentComment}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  public getCommentPosts = async (id: string, number: string, skip: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/GetCommentPosts"}/${id}/${number}/${skip}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  public getCommentComments = async (id: string, idParentComment: string, number: string, skip: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/GetCommentComments"}/${id}/${idParentComment}/${number}/${skip}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }
}
