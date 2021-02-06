import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../model/Image';
import { Motel } from '../model/Motel';
import { UserPublishViewModel } from '../model/UserPublishViewModel';
import { LiveType } from '../model/LiveType';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class MotelService {

  private urlAPI = 'https://localhost:44324';

  constructor(private http: HttpClient) { }

  public getMotels(): Observable<Motel[]> { // vì chưa chắc sẵn sàng nên để trong observable
    return this.http.get<Motel[]>(this.urlAPI + "/api/Motels/GetMotels").pipe(
      tap(receivedMotels => receivedMotels),
      catchError(error => of([]))
    );
  }
  

  public getHighlightsMotels(): Observable<Motel[]> {
    return this.http.get<Motel[]>(this.urlAPI + "/api/Motels/Highlights").pipe(
      tap(receivedHighlightsMotels => receivedHighlightsMotels),
      catchError(error => of([]))
    );
  }

  public getNowsMotels(): Observable<Motel[]> {
    return this.http.get<Motel[]>(this.urlAPI + "/api/Motels/Nows").pipe(
      tap(receivedNowsMotels => receivedNowsMotels),
      catchError(error => of([]))
    );
  }

  public getMotelFromId(id: number): Observable<Motel>{
    const url = `${this.urlAPI + "/api/Motels"}/${id}`;
    return this.http.get<Motel>(url).pipe(
      tap(selectMotel => selectMotel),
      catchError(error => of(new Motel()))
    );
  }

  public searchmoteluser(motelsearch: Motel): Observable<Motel[]>{
    const url = `${this.urlAPI + "/api/Motels/GetMotelForSearch"}/${motelsearch}`;
    return this.http.get<Motel[]>(url).pipe(
      tap(searchmoteluserByHome => console.log(`searchmoteluserByHome = ${JSON.stringify(searchmoteluserByHome)}`)),
      catchError(error => of([]))
    );
  }

  public getmotelbytype(name: string): Observable<Motel[]>{
    const url = `${this.urlAPI + "/api/Motels/GetMotelByType"}/${name}`;
    return this.http.get<Motel[]>(url).pipe(
      tap(getmotelbytype => getmotelbytype),
      catchError(error => of([]))
    );
  }

  public getmoteloutofdate(): Observable<any>{
    return this.http.get<Motel[]>(this.urlAPI + "/api/Motels/GetMotelOutOfDate").pipe(
      tap(receivedOutMotels => receivedOutMotels),
      catchError(error => of([]))
    );
  }
  /*
  public getmotelbytype = (name: string) => {
    const getUrl = `${this.urlAPI}/api/Motels/GetMotelByType/${name}`;
        return this.http.get<Motel[]>(getUrl).pipe(
            map((motels) => {
                if(motels != null)
                {
                    const getmotels = [];
                    motels.forEach(element => {
                      getmotels.push(element);
                    });
                    return getmotels;
                }
                else{
                    return null;
                }
            })
        )
  }
*/

  public postMotel(newMotel: Motel): Observable<Motel>{
    return this.http.post<Motel>(this.urlAPI + "/api/Motels", newMotel, httpOptions).pipe(
      tap((motel: Motel) => console.log(`inserted Motel = ${JSON.stringify(motel)}`)),
      catchError(error => of(new Motel()))
    );
  }

  public getmotelbyuser(id: number): Observable<Motel[]>{
    const url = `${this.urlAPI + "/api/Motels/GetMotelUser"}/${id}`;
    return this.http.get<Motel[]>(url).pipe(
      tap(getmotelbyuser => console.log(`getmotelbyuser = ${JSON.stringify(getmotelbyuser)}`)),
      catchError(error => of([]))
    );
  }

  public getmoteladmin(): Observable<Motel[]>{
    return this.http.get<Motel[]>(this.urlAPI + "/api/Motels/GetMotelAdmin").pipe(
      tap(receivedMotels => receivedMotels),
      catchError(error => of([]))
    );
  }

  public getmotelNV(): Observable<Motel[]>{
    return this.http.get<Motel[]>(this.urlAPI + "/api/Motels/GetMotelNV").pipe(
      tap(receivedMotels => receivedMotels),
      catchError(error => of([]))
    );
  }

  public getmoteluserpublish(): Observable<UserPublishViewModel[]>{
    return this.http.get<UserPublishViewModel[]>(this.urlAPI + "/api/Motels/CountUserPublish").pipe(
      tap(receivedMotels => receivedMotels),
      catchError(error => of([]))
    );
  }

  public getmotelchart = async () => {
    try {
      const url = `${this.urlAPI + "/api/Motels/GetMotelAdmin"}`;
      return await this.http.get(url).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  /*public postEmail(newemail: Email): Observable<Email>{
    return this.http.post<Email>(this.urlAPI + "/api/Emails/Sendemail", newemail, httpOptions).pipe(
      tap((email: Email) => email),
      catchError(error => of(new Email()))
    );
  }*/

 
  public getmotelprovinces(name: string): Observable<Motel[]>{
    const url = `${this.urlAPI + "/api/Motels/GetMotelByProvince"}/${name}`;
    return this.http.get<Motel[]>(url).pipe(
      tap(searchmotelprovinces => console.log(`searchmotelprovinces = ${JSON.stringify(searchmotelprovinces)}`)),
      catchError(error => of([]))
    );
  }


  //Typelive
  public getLiveTypes(): Observable<LiveType[]> {
    return this.http.get<LiveType[]>(this.urlAPI + "/api/LiveTypes").pipe(
      tap(receivedLiveTypes => receivedLiveTypes),
      catchError(error => of([]))
    );
  }

  public updateExtendMotel(motel: Motel): Observable<any>{
    return this.http.put(`${this.urlAPI + "/api/Motels/PutMotelExtend"}/${motel.id}`, motel, httpOptions).pipe(
      tap(updateMotel => updateMotel),
      catchError(error => of(new Motel()))
    );
  }

  public updateNVMotel(motel: Motel): Observable<any>{
    return this.http.put(`${this.urlAPI + "/api/Motels/PutMotelNV"}/${motel.id}`, motel, httpOptions).pipe(
      tap(updateMotel => updateMotel),
      catchError(error => of(new Motel()))
    );
  }
}
