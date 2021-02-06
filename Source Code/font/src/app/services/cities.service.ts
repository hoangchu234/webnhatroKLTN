import { Injectable } from '@angular/core';
import { City } from '../model/City';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private urlAPI = 'https://localhost:44324';

  constructor( private http: HttpClient) { }

  /*public getCitys = async () => {
    try {
        const Cities = await fetch(`${this.urlAPI}/api/Cities`);
        return await Cities.json();
    }
    catch (error) {
       console.log(error);
    }  
  }*/

  public getCitys(): Observable<City[]> {
    return this.http.get<City[]>(this.urlAPI + "/api/Cities").pipe(
      tap(receivedCities => receivedCities),
      catchError(error => of([]))
    );
  }

  public getCityFromId(id: number): Observable<City>{
    const url = `${this.urlAPI + "/api/Cities"}/${id}`;
    return this.http.get<City>(url).pipe(
      tap(selectCity => selectCity),
      catchError(error => of(new City()))
    );
  }

  public getCityFromName(name: string): Observable<City>{
    const url = `${this.urlAPI + "/api/Cities/GetCity"}/${name}`;
    return this.http.get<City>(url).pipe(
      tap(selectCity => selectCity),
      catchError(error => of(new City()))
    );
  }

  public updateCity(city: City): Observable<any>{
    return this.http.put(`${this.urlAPI + "/api/Cities"}/${city.id}`, city, httpOptions).pipe(
      tap(updateCity => updateCity),
      catchError(error => of(new City()))
    );
  }

  public addcity(newcity: City): Observable<City>{
    return this.http.post<City>(this.urlAPI + "/api/Cities", newcity, httpOptions).pipe(
      tap((city: City) => city),
      catchError(error => of(new City()))
    );
  }
}
