import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingsService } from '../../service/trainings.service';
import { TrainingData } from '../../models/trainingData';
import { ProgramArea } from '../../models/programArea';
import { ProgramAreaTraining } from '../../models/programAreaTraining';
import { Facilitator } from '../../models/facilitator';
import { TrainingType } from '../../models/trainingType';
import { Funding } from '../../models/funding';
import { FacilitatorDemography } from '../../models/facilitatorDemography';
import { TrainingMethod } from '../../models/trainingMethod';
import { CurrentStatus } from '../../models/currentStatus';
import { v4 as uuidv4 } from 'uuid';
import { MatSelectChange } from '@angular/material/select';
import { Demographic } from '../../models/demographic';

@Component({
  selector: 'app-training-recording',
  templateUrl: './training-recording.component.html',
  styleUrl: './training-recording.component.css'
})
export class TrainingRecordingComponent implements OnInit{

  trainingData: TrainingData = new TrainingData();
  userDemographics: Demographic = new Demographic();
  userProgramArea: ProgramArea = new ProgramArea();

  programAreaTraining: ProgramAreaTraining[] = [];
  programArea: ProgramArea[] = [];
  trainingType: TrainingType[] = []
  supportingOrganizations: Funding[] = [];
  trainingMethod: TrainingMethod[] = [];
  currentStatuses: CurrentStatus[] = [];
  facilitators: Facilitator[] = [];
  demograhics: FacilitatorDemography[] = [];
  
  selectedTrainingMethodIds: string[] = [];
  selectedFacilitatorIds: string[] = [];
  basicInformationId: string | null = null;
  programId: string | null = null;

  certified: string = ''; 
  programName!: string;
  traineeName!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trainingService: TrainingsService
  ) { }

  ngOnInit(): void {
    this.getRouteVariables();
  }

  handleCertificationChange(certification: string): void {
    this.certified = certification;
  }

  generateUUID(): string {
    return uuidv4();
  }

  getUserDemographic(basic_information_id: string): void {
    this.trainingService.getUserDemographicInformation(basic_information_id).subscribe(
      (data: Demographic) => {
        this.userDemographics = data;
      }
    )
  }

  getNameOfTraining(id: string): void{
    this.trainingService.getProgramAreaTrainingByID(id).subscribe(
      (data: ProgramAreaTraining[]) => {
        this.programAreaTraining = data;
      }
    )
  }

  getCurrentStatus(): void {
    this.trainingService.getCurrentStatus().subscribe(
      (data: CurrentStatus[]) => {
        this.currentStatuses = data
      }
    )
  }

  getTrainingMethod(): void{
    this.trainingService.getTrainingMethod().subscribe(
      (data: TrainingMethod[]) => {
        this.trainingMethod = data;
      }
    )
  }

  getTrainingType(): void{
    this.trainingService.getTrainingType().subscribe(
      (data: TrainingType[]) => {
        this.trainingType = data;
      },
      (error) =>{
        console.log("you have an error ", error)
      }
      )
  }

  getSupportingOrganizations(): void{
    this.trainingService.getFunding().subscribe(
      (data: Funding[]) => {
        this.supportingOrganizations = data;
      }
    )
  }

  getProgramName(id: string): void{
    this.trainingService.getProgramAreaByID(id).subscribe(
      (data: ProgramArea[]) => {
        this.programArea = data;
      }
    )
  }

  getProgramNameByID(id: string): void{
    this.trainingService.getOneProgramAreaByID(id).subscribe(
      (data: ProgramArea) => {
        this.userProgramArea = data;
      }
    )
  }

  getFacilitatorDemographicProgramArea(program_id: string): void{
    this.trainingService.getFacilitatorDemographyProgramArea(program_id).subscribe(
      (data: FacilitatorDemography[]) => {
        this.demograhics = data;
      }
    )
  }

  getRouteVariables(): void{
    // Retrieve parameters from URL path
    this.route.paramMap.subscribe(params => {
      // Retrieve basic_information_id and programId from URL params
      this.basicInformationId = params.get('basic_information_id');
      this.programId = params.get('programId');
      if(this.programId && this.basicInformationId){
        this.getNameOfTraining(this.programId);
        this.getProgramName(this.programId);
        this.getTrainingType();
        this.getSupportingOrganizations();
        this.getTrainingMethod();
        this.getCurrentStatus();
        this.getFacilitatorDemographicProgramArea(this.programId);
        this.trainingData.basic_information_id = this.basicInformationId;
        this.trainingData.program_id = this.programId;
        this.getUserDemographic(this.basicInformationId);
        this.getProgramNameByID(this.programId);
      }
      
    });
  }
  
  onFacilitatorChange(event: MatSelectChange): void {
    if (event && event.source) {
      const selectedValues = event.source.value;
      const facilitatorIdString = selectedValues.join(', ');
      this.trainingData.facilitator_id = facilitatorIdString;
      console.log(this.trainingData.facilitator_id);
    }
  }

  onTrainingMethodChange(event: MatSelectChange) {
      if (event && event.source) {
        const selectedValues = event.source.value;
        const trainingMethodIdString = selectedValues.join(', ');
        this.trainingData.method_id = trainingMethodIdString;
        console.log(this.trainingData.method_id);
      }
  }
  

  onSubmit(): void{
    this.trainingData.training_id = this.generateUUID();

    this.trainingService.saveTrainingData(this.trainingData).subscribe(() => {
      // Data saved successfully, show notification
      //this.notificationService.showNotification("Data saved successfully");
      this.router.navigate(['/demographic/registered-list']);
    });
  }

}
