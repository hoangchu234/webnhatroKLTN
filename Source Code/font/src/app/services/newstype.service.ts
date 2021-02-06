import { Injectable } from '@angular/core';
import { NewType } from '../model/NewType';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { CountNewTypeViewModel } from '../model/CountNewTypeViewModel';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class TypeofnewService {

  private urlAPI = 'https://localhost:44324';

  constructor( private http: HttpClient) { }

  public getTypes(): Observable<NewType[]> {
    return this.http.get<NewType[]>(this.urlAPI + "/api/Typeofnews").pipe(
      tap(receivedTypeofnews => receivedTypeofnews),
      catchError(error => of([]))
    );
  }

  public getTypeByID(id:number): Observable<NewType> {
    const url = `${this.urlAPI + "/api/Typeofnews"}/${id}`;
    return this.http.get<NewType>(url).pipe(
      tap(selectNewType => selectNewType),
      catchError(error => of(new NewType()))
    );
  }

  public getTypeExcepts(): Observable<NewType[]> {
    return this.http.get<NewType[]>(this.urlAPI + "/api/Typeofnews/GetNewTypeExcept").pipe(
      tap(receivedTypeofnews => receivedTypeofnews),
      catchError(error => of([]))
    );
  }

  public getCountTypes(): Observable<CountNewTypeViewModel[]> {
    return this.http.get<CountNewTypeViewModel[]>(this.urlAPI + "/api/Typeofnews/CountTypeofMotel").pipe(
      tap(receivedCountTypes=> receivedCountTypes),
      catchError(error => of([]))
    );
  }

}
