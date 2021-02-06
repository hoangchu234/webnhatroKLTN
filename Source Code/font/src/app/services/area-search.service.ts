import { Injectable } from '@angular/core';
import { AreaSearch } from '../model/AreaSearch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AreaSearchService {

  private urlAPI = 'https://localhost:44324';

  constructor( private http: HttpClient) { }
  
  public getAreaSearch(): Observable<AreaSearch[]> {
    return this.http.get<AreaSearch[]>(this.urlAPI + "/api/AreaSearches").pipe(
      tap(receivedAreaSearchs => receivedAreaSearchs),
      catchError(error => of([]))
    );
  }
}
