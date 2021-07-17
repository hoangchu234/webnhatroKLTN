import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Image } from '../model/Image';
import { Motel } from '../model/Motel';
import { UserPublishViewModel } from '../model/UserPublishViewModel';
import { LiveType } from '../model/LiveType';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};


@Injectable({
  providedIn: 'root'
})
export class MotelService {

  private urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  /*public getMotels(): Observable<Motel[]> { // vì chưa chắc sẵn sàng nên để trong observable
    return this.http.get<Motel[]>(this.urlAPI + "/api/Motels/GetMotels").pipe(
      tap(receivedMotels => receivedMotels),
      catchError(error => of([]))
    );
  }*/
  public getMotels = async () => {
    try {
        const Motels = await fetch(`${this.urlAPI}/api/Motels/GetMotels`);
        return await Motels.json();
    }
    catch (error) {
       console.log(error);
    }  
  }
  

  /*public getHighlightsMotels(): Observable<Motel[]> {
    return this.http.get<Motel[]>(this.urlAPI + "/api/Motels/Highlights").pipe(
      tap(receivedHighlightsMotels => receivedHighlightsMotels),
      catchError(error => of([]))
    );
  }*/
  public getHighlightsMotels = async () => {
    try {
        const Motels = await fetch(`${this.urlAPI}/api/Motels/Highlights`);
        return await Motels.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  /*public getNowsMotels(): Observable<Motel[]> {
    return this.http.get<Motel[]>(this.urlAPI + "/api/Motels/Nows").pipe(
      tap(receivedNowsMotels => receivedNowsMotels),
      catchError(error => of([]))
    );
  }*/
  public getNowsMotels = async () => {
    try {
        const Motels = await fetch(`${this.urlAPI}/api/Motels/Nows`);
        return await Motels.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  /*public getMotelFromId(id: number): Observable<Motel>{
    const url = `${this.urlAPI + "/api/Motels"}/${id}`;
    return this.http.get<Motel>(url).pipe(
      tap(selectMotel => selectMotel),
      catchError(error => of(new Motel()))
    );
  }*/
  public getMotelFromId = async (id: number) => {
      try {
        const url = `${this.urlAPI + "/api/Motels"}/${id}`;
        return await this.http.get(url).toPromise();
      }
      catch (error) {
        console.log(error);
      }
  }

  /*public searchmoteluser(motelsearch: Motel): Observable<Motel[]>{
    const url = `${this.urlAPI + "/api/Motels/GetMotelForSearch"}/${motelsearch}`;
    return this.http.get<Motel[]>(url).pipe(
      tap(searchmoteluserByHome => console.log(`searchmoteluserByHome = ${JSON.stringify(searchmoteluserByHome)}`)),
      catchError(error => of([]))
    );
  }*/


  /*public getmotelbytype(name: string): Observable<Motel[]>{
    const url = `${this.urlAPI + "/api/Motels/GetMotelByType"}/${name}`;
    return this.http.get<Motel[]>(url).pipe(
      tap(getmotelbytype => getmotelbytype),
      catchError(error => of([]))
    );
  }*/
   // ko dùng
  public getmotelbytype = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Motels/GetMotelByType"}/${name}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  /*public getmoteloutofdate(): Observable<any>{
    return this.http.get<Motel[]>(this.urlAPI + "/api/Motels/GetMotelOutOfDate").pipe(
      tap(receivedOutMotels => receivedOutMotels),
      catchError(error => of([]))
    );
  }*/
  // ko dùng
  public getmoteloutofdate = async () => {
    try {
        const Motels = await fetch(`${this.urlAPI}/api/Motels/GetMotelOutOfDate`);
        return await Motels.json();
    }
    catch (error) {
      //  console.log(error);
    }  
  }


  /*public getmotelbyorder(city: Number, province: Number, district: Number, street: Number, type: Number): Observable<Motel[]>{
    const url = `${this.urlAPI + "/api/Motels/GetMotelByOrder"}/${city}/${province}/${district}/${street}/${type}`;
    console.log(url)
    return this.http.get<Motel[]>(url).pipe(
      tap(getmotelbyorder => getmotelbyorder),
      catchError(error => of([]))
    );
  }*/
  public getmotelbyorder = async (city: Number, province: Number, district: Number, street: Number, price: Number, type: Number) => {
    try {
      const url = `${this.urlAPI + "/api/Motels/GetMotelByOrder"}/${city}/${province}/${district}/${street}/${price}/${type}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
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

  /*public getmotelbyuser(id: number): Observable<Motel[]>{
    const url = `${this.urlAPI + "/api/Motels/GetMotelUser"}/${id}`;
    return this.http.get<Motel[]>(url).pipe(
      tap(getmotelbyuser => console.log(`getmotelbyuser = ${JSON.stringify(getmotelbyuser)}`)),
      catchError(error => of([]))
    );
  }*/
  public getmotelbyuser = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Motels/GetMotelUser"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  /*public getmoteladmin(): Observable<Motel[]>{
    return this.http.get<Motel[]>(this.urlAPI + "/api/Motels/GetMotelAdmin").pipe(
      tap(receivedMotels => receivedMotels),
      catchError(error => of([]))
    );
  }*/
  public getmoteladmin = async (status: string, type: string, newT: string) => {
    try {
        const Motels = await fetch(`${this.urlAPI}/api/Motels/GetMotelAdmin/${newT}/${status}/${type}`);
        return await Motels.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  /*public getmotelNV(): Observable<Motel[]>{
    return this.http.get<Motel[]>(this.urlAPI + "/api/Motels/GetMotelNV").pipe(
      tap(receivedMotels => receivedMotels),
      catchError(error => of([]))
    );
  }*/
  public getmotelNV = async (status: string, type: string, newT: string) => {
    try {
        const Motels = await fetch(`${this.urlAPI}/api/Motels/GetMotelNV/${newT}/${status}/${type}`);
        return await Motels.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  /*public getmoteluserpublish(): Observable<UserPublishViewModel[]>{
    return this.http.get<UserPublishViewModel[]>(this.urlAPI + "/api/Motels/CountUserPublish").pipe(
      tap(receivedMotels => receivedMotels),
      catchError(error => of([]))
    );
  }*/
  public getmoteluserpublish = async () => {
    try {
        const Motels = await fetch(`${this.urlAPI}/api/Motels/CountUserPublish`);
        return await Motels.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  //ko xài
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

 
  /*public getmotelprovinces(name: string): Observable<Motel[]>{
    const url = `${this.urlAPI + "/api/Motels/GetMotelByProvince"}/${name}`;
    return this.http.get<Motel[]>(url).pipe(
      tap(searchmotelprovinces => console.log(`searchmotelprovinces = ${JSON.stringify(searchmotelprovinces)}`)),
      catchError(error => of([]))
    );
  }*/
  public getmotelReommendation = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Motels/GetMotelByListId"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }


  //Typelive
  /*public getLiveTypes(): Observable<LiveType[]> {
    return this.http.get<LiveType[]>(this.urlAPI + "/api/LiveTypes").pipe(
      tap(receivedLiveTypes => receivedLiveTypes),
      catchError(error => of([]))
    );
  }*/
  public getLiveTypes = async () => {
    try {
        const LiveTypes = await fetch(`${this.urlAPI}/api/LiveTypes`);
        return await LiveTypes.json();
    }
    catch (error) {
       console.log(error);
    }  
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


  public totalHot = async () => {
    try {
        const count = await fetch(`${this.urlAPI}/api/Motels/GetTotalMotelHot`);
        return await count.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  public totalUser = async () => {
    try {
        const count = await fetch(`${this.urlAPI}/api/Users/GetTotalUser`);
        return await count.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  public totalMoney = async () => {
    try {
        const count = await fetch(`${this.urlAPI}/api/Bills/GetTotalMoney`);
        return await count.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  public getDirect = async () => {
    try {
        const count = await fetch(`${this.urlAPI}/api/Motels/GetDataDirect`);
        return await count.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  public getNew = async () => {
    try {
        const count = await fetch(`${this.urlAPI}/api/Motels/GetDataNew`);
        return await count.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  public getTime = async () => {
    try {
        const count = await fetch(`${this.urlAPI}/api/Motels/GetDataTime`);
        return await count.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  public getChangeTime = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Motels/GetDataChangeTime"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }

  // public getAPI = async (query: string) => {
  //   try {
  //     const params = {
  //       access_key: 'd03ccb4bf5c1ffa8d13f5eec4a83a7f0',
  //       query: query
  //     }
  //     const url = "http://api.positionstack.com/v1/forward";
  //     return await this.http.get(url,{params}).toPromise();
  //   }
  //   catch (error) {
  //     console.log(error);
  //   }
  // }

  getRecommendation = async (id) => {
    try 
    {

      // const url = "http://127.0.0.1:5000/";
      const url = environment.urlPython;
      const formData: FormData = new FormData();
      formData.append('id',id);
      formData.append('linktitle', this.urlAPI + "/api/Motels/GetDataTitlePython/");
      formData.append('linkdata', this.urlAPI + "/api/Motels/GetDataPython/");
      return await this.http.post(url, formData).toPromise();
    }
    catch (e) {
      console.log(e);
    }
  }

  public getStatus = async () => {
    try {
        const count = await fetch(`${this.urlAPI}/api/Motels/GetStatus`);
        return await count.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  public getDistance = async () => {
    try {
        const count = await fetch(`${this.urlAPI}/api/Motels/GetDataDistance`);
        return await count.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  getLocation = async (searchText :string) => {
    try 
    {
      var urlVietMap = environment.urlVietMap;
      const params = {
        apikey: environment.keyVietMap,
        text: searchText
      };
      const url = urlVietMap + 'api-version=1.1';
      console.log(url);
      console.log(params)
      // "api-version=1.1&apikey=8f1ec1ae46c3a1ea966640cf0077f1ea8b6950a3030d9d47&text=Phường 12,Quận Tân Bình,Thành phố Hồ Chí Minh, Chung cư k300"
      return await this.http.get(url,{params}).toPromise();
    }
    catch (e) {
      // console.log(e);
    }
  }

  getLocationSearch = async (searchText :string) => {
    try 
    {
      var urlVietMap = environment.urlVietMapSearch;
      const params = {
        apikey: environment.keyVietMap,
        text: searchText
      };
      const url = urlVietMap + 'api-version=1.1';
      console.log(url);
      console.log(params)
      // "api-version=1.1&apikey=8f1ec1ae46c3a1ea966640cf0077f1ea8b6950a3030d9d47&text=Phường 12,Quận Tân Bình,Thành phố Hồ Chí Minh, Chung cư k300"
      return await this.http.get(url,{params}).toPromise();
    }
    catch (e) {
      // console.log(e);
    }
  }

  public getMotelDistance = async (city: Number, province: Number, district: Number, street: Number, price: Number, type: Number, distance: string, log: string, lat: string) => {
    try {
      const url = `${this.urlAPI + "/api/Motels/GetMotelByOrderAddDistance"}/${city}/${province}/${district}/${street}/${price}/${type}/${distance}/${log}/${lat}`;
      console.log(url)

      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }
}
