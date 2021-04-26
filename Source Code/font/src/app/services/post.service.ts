import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from '../model/Post';
import { Comment } from '../model/Comment';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';

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
      tap((post: Post) => console.log(`inserted Post = ${JSON.stringify(post)}`)),
      catchError(error => of(new Post()))
    );
  }

  public postComment(newComment: Comment): Observable<Comment>{
    return this.http.post<Comment>(this.urlAPI + "/api/Comments", newComment, httpOptions).pipe(
      tap((comment: Comment) => console.log(`inserted Comment = ${JSON.stringify(comment)}`)),
      catchError(error => of(new Comment()))
    );
  }

  /*public getPost(id: number, skipNumber: number): Observable<any>{
    const url = `${this.urlAPI + "/api/Posts/GetPosts"}/${id}/${skipNumber}`;
    return this.http.get<Post[]>(url).pipe(
      tap(receivedPosts => receivedPosts),
      catchError(error => of([]))
    );
  }*/
  public getPostById = async (id: number, skipNumber: number) => {
    try {
      const url = `${this.urlAPI + "/api/Posts/GetPosts"}/${id}/${skipNumber}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
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


  public getCountComment = async (id: string, idParent: string) => {
    try {
      const url = `${this.urlAPI + "/api/Comments/CountComment"}/${id}/${idParent}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }
}
