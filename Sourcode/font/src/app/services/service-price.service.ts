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
export class ServicePriceService {

  private urlAPI = environment.urlAPI;

  constructor( private http: HttpClient) { }

  public updateServiceprice(serviceprice: Serviceprice): Observable<any>{
    return this.http.put(`${this.urlAPI + "/api/Serviceprices"}/${serviceprice.id}`, serviceprice, httpOptions).pipe(
      tap(updateServiceprice => updateServiceprice),
      catchError(error => of(new Serviceprice()))
    );
  }

  /*public getServiceprices(): Observable<Serviceprice[]> {
    return this.http.get<Serviceprice[]>(this.urlAPI + "/api/Serviceprices").pipe(
      tap(receivedServiceprices => receivedServiceprices),
      catchError(error => of([]))
    );
  }*/
  public getServiceprices = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Serviceprices").toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  public geterviceById = async (id: string) => {
    try {
      return await this.http.get(this.urlAPI + "/api/Serviceprices/" + id).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }
}
