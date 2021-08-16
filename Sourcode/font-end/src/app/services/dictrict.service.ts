import { Injectable } from '@angular/core';
import { District } from '../model/District';
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
export class DictrictService {

  private urlAPI = environment.urlAPI;

  constructor( private http: HttpClient) { }

  /*public getDistricts(): Observable<District[]> {
    return this.http.get<District[]>(this.urlAPI + "/api/Districts").pipe(
      tap(receivedDistricts => receivedDistricts),
      catchError(error => of([]))
    );
  }*/

  public getDistricts = async () => {
    try {
        const Districts = await fetch(`${this.urlAPI}/api/Districts`);
        return await Districts.json();
    }
    catch (error) {
       //console.log(error);
    }  
  }

  /*public getDistrictFromId(id: number): Observable<District>{
    const url = `${this.urlAPI + "/api/Districts/GetDistrictByID"}/${id}`;
    return this.http.get<District>(url).pipe(
      tap(selectDistrict => selectDistrict),
      catchError(error => of(new District()))
    );
  }*/
  public getDistrictFromId = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Districts/GetDistrictByID"}/${id}`;      
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  /*public getDistrictByProvince(id: number): Observable<District[]>{
    const url = `${this.urlAPI + "/api/Districts/GetDistrictByProvince"}/${id}`;
    return this.http.get<District[]>(url).pipe(
      tap(selectDistrictByCity => selectDistrictByCity),
      catchError(error => of([]))
    );
  }*/
  public getDistrictByProvince = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Districts/GetDistrictByProvince"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }
}
