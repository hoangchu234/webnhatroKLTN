import { Injectable } from '@angular/core';
import { Image } from '../model/Image';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { Motel } from '../model/Motel';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private urlAPI = 'https://localhost:44324';

  constructor( private http: HttpClient) { }

  public postImageMotel(newImageMotel: Motel): Observable<Motel>{
    return this.http.post<Motel>(this.urlAPI + "/api/Images", newImageMotel, httpOptions).pipe(
      tap((motel: Motel) => console.log(`inserted Motel = ${JSON.stringify(motel)}`)),
      catchError(error => of(new Motel()))
    );
  }
  
  public updateImage(image: Image): Observable<any>{
    return this.http.put(`${this.urlAPI + "/api/Images"}/${image.id}`, image, httpOptions).pipe(
      tap(updateImage => updateImage),
      catchError(error => of(new Image()))
    );
  }

  public deleteImage(id: number): Observable<any>{
    const url = `${this.urlAPI + "/api/Images"}/${id}`;
    return this.http.delete<Image>(url, httpOptions).pipe(
      tap(deleteImage => console.log(`deleteImage = ${JSON.stringify(deleteImage)}`)),
      catchError(error => of(null))
    );

  }
}
