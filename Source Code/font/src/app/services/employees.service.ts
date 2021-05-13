import { Injectable } from '@angular/core';
import { Employee } from '../model/Employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,of, from, BehaviorSubject } from 'rxjs';
import { map ,tap, catchError} from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const httpOptions ={
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private urlAPI = environment.urlAPI;

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

  /*public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.urlAPI + "/api/Employees").pipe(
      tap(receivedEmployees => receivedEmployees),
      catchError(error => of([]))
    );
  }*/
  public getEmployees = async () => {
    try {
        const Employees = await fetch(`${this.urlAPI}/api/Employees`);
        return await Employees.json();
    }
    catch (error) {
       console.log(error);
    }  
  }

  /*public getEmployeeFromId(id: number): Observable<Employee>{
    const url = `${this.urlAPI + "/api/Employees"}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(selectEmployee => selectEmployee),
      catchError(error => of(new Employee()))
    );
  }*/
  /*public getEmployeeFromId = async (id: number) => {
    try {
      const url = `${this.urlAPI + "/api/Employees"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }*/

  public updateEmployee(employee: Employee): Observable<any>{
    return this.http.put(`${this.urlAPI + "/api/Employees"}/${employee.id}`, employee, httpOptions).pipe(
      tap(updateEmployee => updateEmployee),
      catchError(error => of(new Employee()))
    );
  }

  public addemployee(newemployee: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.urlAPI + "/api/Employees", newemployee, httpOptions).pipe(
      tap((employee: Employee) => employee),
      catchError(error => of(new Employee()))
    );
  }

  /*public getEmployeeFromAccountId(id: Int32Array): Observable<Employee>{
    const url = `${this.urlAPI + "/api/Employees/GetEmployeeAccount"}/${id}`;
    return this.http.get<Employee>(url).pipe(
      tap(selectUser => selectUser),
      catchError(error => of(new Employee()))
    );
  }*/
  /*public getEmployeeFromAccountId = async (id: Int32Array) => {
    try {
      const url = `${this.urlAPI + "/api/Employees/GetEmployeeAccount"}/${id}`;
      return await this.http.get(url).toPromise();
    }
    catch (error) {
      console.log(error);
    }
  }*/
}
