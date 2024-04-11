import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Facility } from '../models/facility';
import { Demographic } from '../models/demographic';
import { Designation } from '../models/designation';
import { Facilitator } from '../models/facilitator';
import { Funding } from '../models/funding';
import { TrainingType } from '../models/trainingType';
import { ProgramArea } from '../models/programArea';

@Injectable({
  providedIn: 'root'
})
export class TrainingsService {
  private baseUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) { }

  saveUserInformation(demographic: Demographic): Observable<Demographic> {
    const url = `${this.baseUrl}/basic-information/save`;
    return this.http.post<Demographic>(url, demographic);
  }

  saveFacilitatorInformation(facilitator: Facilitator): Observable<Facilitator> {
    const url = `${this.baseUrl}/facilitator/save`;
    return this.http.post<Facilitator>(url, facilitator);
  }

  getFacilityConfigurationInformation(): Observable<Facility[]>{
    const url = `${this.baseUrl}/facility-district-province/get-all`;
    return this.http.get<Facility[]>(url);
  }
  getFunding(): Observable<Funding[]>{
    const url = `${this.baseUrl}/funding/get-all`;
    return this.http.get<Funding[]>(url);
  }
  getTrainingType(): Observable<TrainingType[]>{
    const url = `${this.baseUrl}/training-type/get-all`;
    return this.http.get<TrainingType[]>(url);
  }
  getProgramArea(): Observable<ProgramArea[]>{
    const url = `${this.baseUrl}/program-area/get-all`;
    return this.http.get<ProgramArea[]>(url);
  }

  getDesignationInformation(): Observable<Designation[]>{
    const url = `${this.baseUrl}/title-designation/get-all`;
    return this.http.get<Designation[]>(url);
  }

  checkIfBasicInformationIdExists(id: string): Observable<any> {
    const url = `${this.baseUrl}/basic-information/check/${id}`;
    return this.http.get<any>(url); 
  }

  checkIfFacilitatorIdExists(id: string): Observable<any> {
    const url = `${this.baseUrl}/facilitator/check/${id}`;
    return this.http.get<any>(url); 
  }
}
