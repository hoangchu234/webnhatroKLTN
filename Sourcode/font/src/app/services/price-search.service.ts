import { Injectable } from '@angular/core';
import { Serviceprice } from '../model/Serviceprice';
import { PriceSearch } from '../model/PriceSearch';
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
export class PriceSearchService {

  private urlAPI = environment.urlAPI;

  constructor( private http: HttpClient) { }

 

  /*public getprices(): Observable<PriceSearch[]> {
    return this.http.get<PriceSearch[]>(this.urlAPI + "/api/PriceSearches").pipe(
      tap(receivedPrices => receivedPrices),
      catchError(error => of([]))
    );
  }*/

  public getprices = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/PriceSearches").toPromise();
    }
    catch (e) {
      // console.log(e);
    }
  }

}
