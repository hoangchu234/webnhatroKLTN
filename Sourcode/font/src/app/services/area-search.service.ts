import { Injectable } from '@angular/core';
import { AreaSearch } from '../model/AreaSearch';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AreaSearchService {

  private urlAPI = environment.urlAPI;

  constructor( private http: HttpClient) { }
  
  /*public getAreaSearch(): Observable<AreaSearch[]> {
    return this.http.get<AreaSearch[]>(this.urlAPI + "/api/AreaSearches").pipe(
      tap(receivedAreaSearchs => receivedAreaSearchs),
      catchError(error => of([]))
    );
  }*/

  public getAreaSearch = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/AreaSearches").toPromise();
    }
    catch (e) {
      // console.log(e);
    }
  }
}
