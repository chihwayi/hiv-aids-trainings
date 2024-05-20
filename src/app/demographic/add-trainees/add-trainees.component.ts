import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { TrainingsService } from '../../service/trainings.service';
import { Facility } from '../../models/facility';
import { Demographic } from '../../models/demographic';
import { Designation } from '../../models/designation';
import { WarningPopupComponent } from '../warning-popup/warning-popup.component';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-trainees',
  templateUrl: './add-trainees.component.html',
  styleUrl: './add-trainees.component.css'
})
export class AddTraineesComponent {

  myForm!: FormGroup; // Declare the property here
  demographic = new Demographic();
  designation = new Designation();

  idNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/^\d{2}-\d{6,7}[A-Z]\d{2}$/),
  ]);

  phoneNumberFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(/07[1378]\d{7}$/),
  ])

  selectedProvince!: string;
  selectedDistrict!: string;
  selectedFacility!: string;

  provinces: any[] = [];
  districts: any[] = [];
  facilities: Facility[] = [];

  selectedTitle!: string;
  selectedDesignation!: string;

  titles: any[] = [];
  designations: Designation[] = [];

  currentSection: number = 1;
  showProgramArea = false; // Initially hidden
  selectedRole: string = '';

  constructor(
    private trainingService: TrainingsService,
    private router: Router,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getProvinces();
    this.getTitles();
    this.myForm = this.fb.group({
      group: ['', Validators.required] // Add the 'group' form control with a required validator
    });
  }

  generateUUID(): string {
    return uuidv4();
  }

  onSubmit(facilitatorTraineeValue: string) {
    this.trainingService.checkIfBasicInformationIdExists(this.demographic.basic_information_id).subscribe(
      (response: boolean) => {
        if (response) {
          this.showPopup();
        } else {
          // If the Basic Information ID doesn't exist, save the data
          this.trainingService.saveUserInformation(this.demographic).subscribe(
            (saveResponse: any) => {
              if (saveResponse.ok) {
              }
            }
          );

          if (facilitatorTraineeValue === 'Trainee') {
            this.router.navigate(['/trainings/training-list', this.demographic.basic_information_id]);
          } else if (facilitatorTraineeValue === 'Facilitator') {
            this.router.navigate(['/demographic/add-facilitators', this.demographic.basic_information_id]);
          }
        }
      }
    );
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
        this.goToTrainingLists();
      } else if (result === 'stay') {
        this.router.navigate(['/demographic/add-trainees']);
        this.clearFormFields();
      }
    });
  }

  clearFormFields() {
    this.demographic.basic_information_id = '';
    this.demographic.designation_id = '';
    this.demographic.name = '';
    this.demographic.district_id = '';
    this.demographic.facility_id = '';
    this.demographic.phone_number = '';
    this.demographic.province_id = '';
    this.demographic.sex = '';
    this.demographic.surname = '';
    this.demographic.title_id = '';
  }

  goToTrainingLists() {
    this.router.navigate(['trainings/training-list/', this.demographic.basic_information_id]);
  }

  getTitles() {
    this.trainingService.getDesignationInformation().subscribe((data: Designation[]) => {
      this.titles = Array.from(new Set(data.map(item => item.title_id))).map(title_id => {
        return {
          title_id: title_id,
          title: data.find(item => item.title_id === title_id)?.title
        }
      })
    })
  }

  getProvinces() {
    this.trainingService.getFacilityConfigurationInformation().subscribe((data: Facility[]) => {
      // Extract unique provinces from the data
      this.provinces = Array.from(new Set(data.map(item => item.province_id))).map(province_id => {
        return {
          province_id: province_id,
          provinceName: data.find(item => item.province_id === province_id)?.provinceName
        };
      });
    });
  }

  onTitleChange() {
    const selectedTitleObj = this.titles.find(title => title.title_id === this.selectedTitle);
    if (selectedTitleObj) {
      this.demographic.title_id = selectedTitleObj.title_id;
    }
    this.trainingService.getDesignationInformation().subscribe((data: Designation[]) => {
      this.designations = this.filterDesignation(data, this.selectedTitle);
    })
  }

  onProvinceChange() {
    const selectedProvinceObj = this.provinces.find(province => province.province_id === this.selectedProvince);
    if (selectedProvinceObj) {
      this.demographic.province_id = selectedProvinceObj.province_id;
    }
    // Filter districts based on selected province
    this.trainingService.getFacilityConfigurationInformation().subscribe((data: Facility[]) => {
      this.districts = this.filterDistricts(data, this.selectedProvince);
      this.facilities = []; // Clear facilities array
    });
  }

  onDistrictChange() {
    const selectedDistrictObj = this.districts.find(district => district.district_id === this.selectedDistrict);
    if (selectedDistrictObj) {
      this.demographic.district_id = selectedDistrictObj.district_id;
    }

    // Fetch facilities based on selected province and district
    this.trainingService.getFacilityConfigurationInformation().subscribe((data: Facility[]) => {
      this.facilities = this.filterFacilities(data, this.selectedProvince, this.selectedDistrict);

      // Set the selected facility name in demographic
      const selectedFacilityObj = this.facilities.find(facility => facility.facility_id === this.selectedFacility);
      if (selectedFacilityObj) {
        this.demographic.facility_id = selectedFacilityObj.facility_id;
      }
    });
  }

  filterDistricts(data: Facility[], province_id: string): any[] {
    const districtsForProvince = Array.from(new Set(
      data.filter(item => item.province_id === province_id).map(item => item.district_id)
    )).map(district_id => {
      return {
        district_id: district_id,
        districtName: data.find(item => item.district_id === district_id && item.province_id === province_id)?.districtName
      };
    });
    return districtsForProvince;
  }

  filterDesignation(data: Designation[], title_id: string): Designation[] {
    return data.filter(item => item.title_id === title_id);
  }

  filterFacilities(data: Facility[], province_id: string, district_id: string): Facility[] {
    return data.filter(item => item.province_id === province_id && item.district_id === district_id);
  }

  onDesignationChange(event : MatSelectChange){
    this.demographic.designation_id = event.value;
  }

  onFacilityChange(event : MatSelectChange){
    this.demographic.facility_id = event.value;
  }

  formatIdNumber(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;

    if (inputValue.length === 2) {
      inputElement.value = inputValue + '-';
    }
  }

  formatPhoneNumber(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
  }

}
