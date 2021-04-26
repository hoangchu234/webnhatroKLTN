import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { NewType } from '../model/NewType';
import { Motel } from '../model/Motel';
import { Account } from '../model/Account';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable,of, from } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectClass {

  messageSource = new BehaviorSubject<string>("default message");
  currentMessage = this.messageSource.asObservable();


  private newTypes: BehaviorSubject<NewType> = new BehaviorSubject(null);

  private imagesFile: BehaviorSubject<File[]> = new BehaviorSubject(null);
  
  constructor() { }

  //
  getNewTypes(): Observable<NewType> {
    return this.newTypes.asObservable();
  }

  setNewTypes(profile: NewType) {
    this.newTypes.next(profile);
  }

  getDataImages(): Observable<File[]> {
    return this.imagesFile.asObservable();
  }

  setDataImages(image: File[]) {
    this.imagesFile.next(image);
  }

}
