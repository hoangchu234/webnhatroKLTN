import { Injectable } from '@angular/core';
import { Province } from '../model/Province';
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
export class ProvincesService {

  private urlAPI = environment.urlAPI;

  constructor( private http: HttpClient) { }


  /*public getProvinces(): Observable<Province[]> {
    return this.http.get<Province[]>(this.urlAPI + "/api/Provinces").pipe(
      tap(receivedProvinces => receivedProvinces),
      catchError(error => of([]))
    );
  }*/
  public getProvinces = async () => {
    try {
      return await this.http.get(this.urlAPI + "/api/Provinces").toPromise();
    }
    catch (e) {
      // console.log(e);
    }
  }
  

  /*public getProvinceById(id: number): Observable<Province> {
    const url = `${this.urlAPI + "/api/Provinces/GetProvinceByID"}/${id}`;
    return this.http.get<Province>(url).pipe(
      tap(selectProvince => selectProvince),
      catchError(error => of(new Province()))
    );
  }*/
  public getProvinceById = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Provinces/GetProvinceByID"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  /*public getCityFromId(id: number): Observable<Province>{
    const url = `${this.urlAPI + "/api/Provinces"}/${id}`;
    return this.http.get<Province>(url).pipe(
      tap(selectProvince => selectProvince),
      catchError(error => of(new Province()))
    );
  }*/
  /*public getCityFromId = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Provinces"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }*/

  public updateCity(province: Province): Observable<any>{
    return this.http.put(`${this.urlAPI + "/api/Provinces"}/${province.id}`, province, httpOptions).pipe(
      tap(updateProvince => updateProvince),
      catchError(error => of(new Province()))
    );
  }

  public addcity(newprovince: Province): Observable<Province>{
    return this.http.post<Province>(this.urlAPI + "/api/Provinces", newprovince, httpOptions).pipe(
      tap((province: Province) => console.log(`inserted Province = ${JSON.stringify(province)}`)),
      catchError(error => of(new Province()))
    );
  }

  /*public getProvincesByCity(id: number): Observable<Province[]>{
    const url = `${this.urlAPI + "/api/Provinces/GetProvince"}/${id}`;
    return this.http.get<Province[]>(url).pipe(
      tap(selectProvinceByCity => selectProvinceByCity),
      catchError(error => of([]))
    );
  }*/
  public getProvincesByCity = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Provinces/GetProvince"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }

  /*public getProvincesByCityName(name: string): Observable<Province[]>{
    const url = `${this.urlAPI + "/api/Provinces/GetProvinceByName"}/${name}`;
    return this.http.get<Province[]>(url).pipe(
      tap(selectProvinceByCity => selectProvinceByCity),
      catchError(error => of([]))
    );
  }*/
  public getProvincesByCityName = async (name: string) => {
    try {
      const url = `${this.urlAPI + "/api/Provinces/GetProvinceByName"}/${name}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      //console.log(error);
    }
  }
}

