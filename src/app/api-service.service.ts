import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {VitalModel} from "./VitalModel";
import {PatientModel} from "./PatientModel";

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private baseUrl = 'http://localhost:8080'; // Adjust to your Spring Boot server

  constructor(private http: HttpClient) {}

  getData(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/ecg`);
  }

  getVitals(): Observable<VitalModel> {
    return this.http.get<VitalModel>(`${this.baseUrl}/vital-signs`);
  }

  login(userId: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { userId, password });
  }

  save(patientModel: PatientModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/patient`, patientModel);
  }


}
