import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Employee } from '../models/employee';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // apiUrl:string = environment.apiUrl;
  private apiUrl = 'http://localhost:5200/api/employees'; 
  private currentEmployeeSubject: BehaviorSubject<Employee | null> = new BehaviorSubject<Employee | null>(null);
  public currentEmployee: Observable<Employee | null> = this.currentEmployeeSubject.asObservable();

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

   addEmployee(employeeData: Employee): Observable<any> {
    return this.http.post<any>(this.apiUrl, employeeData);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }
 setCurrentEmployee(employee: Employee): void {
    this.currentEmployeeSubject.next(employee);
  }

  updateEmployee(employeeId: string, employeeData: Employee): Observable<any> {
    const url = `${this.apiUrl}/${employeeId}`;
    console.log("employe data");
    console.log(employeeData);
    return this.http.put(url, employeeData);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
