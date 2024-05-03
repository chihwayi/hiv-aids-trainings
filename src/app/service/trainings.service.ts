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
import { DemographicList } from '../models/demographicList';
import { TrainingMethod } from '../models/trainingMethod';
import { ProgramAreaTraining } from '../models/programAreaTraining';
import { CurrentStatus } from '../models/currentStatus';
import { FacilitatorDemography } from '../models/facilitatorDemography';
import { TrainingData } from '../models/trainingData';
import { VmmcReport } from '../models/VmmcReport';
import { DataDictionaryReport } from '../models/DataDictionaryReport';

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

  saveTrainingData(trainingData: TrainingData): Observable<TrainingData> {
    const url = `${this.baseUrl}/training-data/save`;
    return this.http.post<TrainingData>(url, trainingData);
  }

  getTrainingData(): Observable<TrainingData[]> {
    const url = `${this.baseUrl}/training-data/get-all`;
    return this.http.get<TrainingData[]>(url);
  }

  getUserInformation(): Observable<Demographic[]> {
    const url = `${this.baseUrl}/basic-information/get-all`;
    return this.http.get<Demographic[]>(url);
  }

  getUserDemographicInformation(basic_information_id: string): Observable<Demographic> {
    const url = `${this.baseUrl}/basic-information/get/${basic_information_id}`;
    return this.http.get<Demographic>(url);
  }

  saveFacilitatorInformation(facilitator: Facilitator): Observable<Facilitator> {
    const url = `${this.baseUrl}/facilitator/save`;
    return this.http.post<Facilitator>(url, facilitator);
  }

  getFacilitatorByProgramArea(program_area_id:string): Observable<Facilitator[]> {
    const url = `${this.baseUrl}/facilitator/get-by-program-area/${program_area_id}`;
    return this.http.get<Facilitator[]>(url);
  }

  getFacilitatorDemographyProgramArea(program_area_id:string): Observable<FacilitatorDemography[]> {
    const url = `${this.baseUrl}/facilitator-demography/get/${program_area_id}`;
    return this.http.get<FacilitatorDemography[]>(url);
  }

  getFacilityConfigurationInformation(): Observable<Facility[]>{
    const url = `${this.baseUrl}/facility-district-province/get-all`;
    return this.http.get<Facility[]>(url);
  }

  getOneFacility(id: string): Observable<Facility[]> {
    const url = `${this.baseUrl}/facility-district-province/get-facility/${id}`;
    return this.http.get<Facility[]>(url);
  }

  getDemographicList(): Observable<DemographicList[]> {
    const url = `${this.baseUrl}/registered/get-all`;
    return this.http.get<DemographicList[]>(url);
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

  getTrainingMethod(): Observable<TrainingMethod[]> {
    const url = `${this.baseUrl}/training-method/get-all`;
    return this.http.get<TrainingMethod[]>(url);
  }

  getCurrentStatus(): Observable<CurrentStatus[]> {
    const url = `${this.baseUrl}/current-status/get-all`;
    return this.http.get<CurrentStatus[]>(url);
  }

  getProgramAreaTraining(): Observable<ProgramAreaTraining[]> {
    const url = `${this.baseUrl}/program-area-training/get-all`;
    return this.http.get<ProgramAreaTraining[]>(url);
  }

  getProgramAreaTrainingByID(id: string): Observable<ProgramAreaTraining[]> {
    const url = `${this.baseUrl}/program-area-training/get-by-id/${id}`;
    return this.http.get<ProgramAreaTraining[]>(url);
  }

  getProgramAreaByID(id: string): Observable<ProgramArea[]> {
    const url = `${this.baseUrl}/program-area/get-by-id/${id}`;
    return this.http.get<ProgramArea[]>(url);
  }

  getReports(): Observable<{ [key: string]: Report }> {
    const url = `${this.baseUrl}/vmmc-report/report-map`;
    return this.http.get<{ [key: string]: Report }>(url);
  }

  getVmmcReport(): Observable<VmmcReport> {
    const url = `${this.baseUrl}/vmmc-report/report-map`;
    return this.http.get<VmmcReport>(url);
  }

  getDataDictionary(): Observable<DataDictionaryReport> {
    const url = `${this.baseUrl}/vmmc-report/report-map`;
    return this.http.get<DataDictionaryReport>(url);
  }
}
