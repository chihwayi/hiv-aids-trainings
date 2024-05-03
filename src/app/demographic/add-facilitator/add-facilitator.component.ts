import { Component, OnInit } from '@angular/core';
import { Facilitator } from '../../models/facilitator';
import { Funding } from '../../models/funding';
import { TrainingType } from '../../models/trainingType';
import { ProgramArea } from '../../models/programArea';
import { TrainingsService } from '../../service/trainings.service';
import { Router, ActivatedRoute } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { WarningPopupComponent } from '../warning-popup/warning-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Demographic } from '../../models/demographic';

@Component({
  selector: 'app-add-facilitator',
  templateUrl: './add-facilitator.component.html',
  styleUrl: './add-facilitator.component.css'
})
export class AddFacilitatorComponent implements OnInit{

  demographics: Demographic = new Demographic();
  facilitator = new Facilitator();
  fundings: Funding[] = [];
  trainingTypes:  TrainingType[] = [];
  programAreas:  ProgramArea[] = [];

  basic_information_id!: string;

  constructor(
    private trainingService: TrainingsService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
      this.getAfiliation();
      this.getProgramArea();
      this.getTrainingType();
      this.extractBasicInformation();
  }

  getUserDemographic(basic_information_id: string): void {
    this.trainingService.getUserDemographicInformation(basic_information_id).subscribe(
      (data: Demographic) => {
        this.demographics = data;
      }
    )
  }

  getAfiliation(){
    this.trainingService.getFunding().subscribe(
      (data: Funding[]) => {
        this.fundings = data;
      },
      (error) => {
        console.error('Error fetching funding data:', error);
      }
    );
  }

  getTrainingType(){
    this.trainingService.getTrainingType().subscribe(
      (data: TrainingType[]) => {
        this.trainingTypes = data;
      },
      (error) => {
        console.error('Error fetching funding data:', error);
      }
    );
  }

  getProgramArea(){
    this.trainingService.getProgramArea().subscribe(
      (data: ProgramArea[]) => {
        this.programAreas = data;
      },
      (error) => {
        console.error('Error fetching funding data:', error);
      }
    );
  }

  generateUUID(): string {
    return uuidv4();
  }

  extractBasicInformation() {
    this.basic_information_id = this.route.snapshot.paramMap.get('basic_information_id') ?? '';
    this.getUserDemographic(this.basic_information_id);
  }

  showPopup() {
    const dialogRef = this.dialog.open(WarningPopupComponent, {
      data: {
        message: 'This User already exists in the System. What would you like to do?',
      },
    });

    // Handle the user's choice from the popup
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'redirect') {
        // Redirect to personDetails component
        //this.goToTrainingLists();
      } else if (result === 'stay') {
        this.router.navigate(['/demographic/add-trainees']);
        //this.clearFormFields();
      }
    });
  }

  onSubmit(){
    this.trainingService.checkIfFacilitatorIdExists(this.basic_information_id).subscribe(
      (response: boolean) => {
        if (response) {
          this.showPopup();
        } else {
          this.facilitator.facilitator_id = this.generateUUID();
          this.facilitator.basic_information_id = this.basic_information_id;
          this.trainingService.saveFacilitatorInformation(this.facilitator).subscribe(
            (saveResponse: any) => {
              if (saveResponse.ok) {
                console.log('Basic Information ID:', this.basic_information_id);
                console.log('Facilitator:', this.facilitator);
              }
            }
          );
          
          console.log('Facilitator:', this.facilitator);
          this.router.navigate(['/demographic/add-trainees']);
        }
      }
    );
  }

}
