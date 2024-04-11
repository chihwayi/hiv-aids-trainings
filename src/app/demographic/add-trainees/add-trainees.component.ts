import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { TrainingsService } from '../../service/trainings.service';
import { Facility } from '../../models/facility';
import { Demographic } from '../../models/demographic';
import { Designation } from '../../models/designation';
import { WarningPopupComponent } from '../warning-popup/warning-popup.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-trainees',
  templateUrl: './add-trainees.component.html',
  styleUrl: './add-trainees.component.css'
})
export class AddTraineesComponent {

  myForm!: FormGroup; // Declare the property here
  demographic = new Demographic();
  designation = new Designation();

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
    private route: ActivatedRoute,
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

  onSubmit() {
    this.trainingService.checkIfBasicInformationIdExists(this.demographic.basic_information_id).subscribe(
      (response: boolean) => {
        if (response) {
          this.showPopup();
        } else {
          // If the Basic Information ID doesn't exist, save the data
          this.trainingService.saveUserInformation(this.demographic).subscribe(
            (saveResponse: any) => {
              if (saveResponse.ok) {
                console.log('Basic Information ID:', this.demographic.basic_information_id);
              }
            }
          );

          this.router.navigate(['/trainings/training-list', this.demographic.basic_information_id]);

          /*
          const groupValue = this.myForm?.get('group')?.value;
          console.log('Selection value is : ', groupValue);

          this.myForm?.get('group')?.valueChanges.subscribe((newValue) => {
            console.log('New value:', newValue);
          });

          
          // Rest of your logic using groupValue for redirection
          if (groupValue === 'Facilitator') {
            this.router.navigate(['/trainings/add-facilitators', this.demographic.basic_information_id]);
          }
          else {
            this.router.navigate(['/trainings/training-list', this.demographic.basic_information_id]);
          }
          */
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
    this.demographic.designation = '';
    this.demographic.name = '';
    this.demographic.district = '';
    this.demographic.facility = '';
    this.demographic.phone_number = '';
    this.demographic.province = '';
    this.demographic.sex = '';
    this.demographic.surname = '';
    this.demographic.title = '';
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
      this.provinces = Array.from(new Set(data.map(item => item.provinceId))).map(provinceId => {
        return {
          provinceId: provinceId,
          provinceName: data.find(item => item.provinceId === provinceId)?.provinceName
        };
      });
    });
  }

  onTitleChange() {
    const selectedTitleObj = this.titles.find(title => title.title_id === this.selectedTitle);
    if (selectedTitleObj) {
      this.demographic.title = selectedTitleObj.title;
    }
    this.trainingService.getDesignationInformation().subscribe((data: Designation[]) => {
      this.designations = this.filterDesignation(data, this.selectedTitle);
    })
  }

  onProvinceChange() {
    const selectedProvinceObj = this.provinces.find(province => province.provinceId === this.selectedProvince);
    if (selectedProvinceObj) {
      this.demographic.province = selectedProvinceObj.provinceName;
    }
    // Filter districts based on selected province
    this.trainingService.getFacilityConfigurationInformation().subscribe((data: Facility[]) => {
      this.districts = this.filterDistricts(data, this.selectedProvince);
      this.facilities = []; // Clear facilities array
    });
  }

  onDistrictChange() {
    const selectedDistrictObj = this.districts.find(district => district.districtId === this.selectedDistrict);
    if (selectedDistrictObj) {
      this.demographic.district = selectedDistrictObj.districtName;
    }

    // Fetch facilities based on selected province and district
    this.trainingService.getFacilityConfigurationInformation().subscribe((data: Facility[]) => {
      this.facilities = this.filterFacilities(data, this.selectedProvince, this.selectedDistrict);

      // Set the selected facility name in demographic
      const selectedFacilityObj = this.facilities.find(facility => facility.facilityId === this.selectedFacility);
      if (selectedFacilityObj) {
        this.demographic.facility = selectedFacilityObj.facilityName;
      }
    });
  }

  filterDistricts(data: Facility[], provinceId: string): any[] {
    const districtsForProvince = Array.from(new Set(
      data.filter(item => item.provinceId === provinceId).map(item => item.districtId)
    )).map(districtId => {
      return {
        districtId: districtId,
        districtName: data.find(item => item.districtId === districtId && item.provinceId === provinceId)?.districtName
      };
    });
    return districtsForProvince;
  }

  filterDesignation(data: Designation[], title_id: string): Designation[] {
    return data.filter(item => item.title_id === title_id);
  }

  filterFacilities(data: Facility[], provinceId: string, districtId: string): Facility[] {
    return data.filter(item => item.provinceId === provinceId && item.districtId === districtId);
  }

  // Function to navigate to the next section
  nextSection() {
    if (this.currentSection < 2) {
      this.currentSection++;
    }
  }

  // Function to navigate to the previous section
  prevSection() {
    if (this.currentSection > 1) {
      this.currentSection--;
    }
  }

}
