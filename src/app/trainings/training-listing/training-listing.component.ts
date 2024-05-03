import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Demographic } from '../../models/demographic';
import { TrainingsService } from '../../service/trainings.service';

@Component({
  selector: 'app-training-listing',
  templateUrl: './training-listing.component.html',
  styleUrl: './training-listing.component.css'
})
export class TrainingListingComponent implements OnInit{

  basic_information_id: string | null = null;
  demographics: Demographic = new Demographic();

  trainings = [
    { name: 'VMMC', iconUrl: 'assets/icons/vmmc-icon.png', type: 'vmmc', programId:'a713aa3d-f673-11ee-850e-34735ab0864a' },
    { name: 'HIV TESTING', iconUrl: 'assets/icons/hiv-testing-icon.png', type: 'ht', programId:'a713ac07-f673-11ee-850e-34735ab0864a' },
    { name: 'STI', iconUrl: 'assets/icons/sti-icon.png', type: 'sti', programId:'' },
    { name: 'PMTCT', iconUrl: 'assets/icons/pmtct-icon.png', type: 'pmtct', programId:'' },
    { name: 'Key Population', iconUrl: 'assets/icons/key-population-icon.png', type: 'kp', programId:'' },
    { name: 'Data Quality Improvement', iconUrl: 'assets/icons/data-quality-icon.png', type: 'dqi', programId:'' },
    { name: 'ART', iconUrl: 'assets/icons/art-icon.png', type: 'art', programId:'' },
    { name: 'CBS', iconUrl: 'assets/icons/cbs-icon.png', type: 'cbs', programId:'' },
    { name: 'SI', iconUrl: 'assets/icons/mnde-icon.jpeg', type: 'si', programId:'' }
  ];

  constructor(private route:ActivatedRoute, private trainingsService: TrainingsService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Retrieve basic_information_id from URL params
      this.basic_information_id = params.get('basic_information_id');
      if(this.basic_information_id){
        this.getUserDemographic(this.basic_information_id);
      }
    });
    
  }

  getUserDemographic(basic_information_id: string): void {
    this.trainingsService.getUserDemographicInformation(basic_information_id).subscribe(
      (data: Demographic) => {
        this.demographics = data;
      }
    )
  }

  getRouterLink(type: string, programId: string): any[] {
    // Define your router links based on training type
    switch (type) {
      case 'vmmc':
        return ['/trainings/training-recording', this.basic_information_id, programId];
      case 'ht':
        // Define route for HIV TESTING
        break;
      case 'sti':
        // Define route for STI
        break;
      case 'pmtct':
        // Define route for PMTCT
        break;
      // Define routes for other training types as needed
      default:
        // Default route if type doesn't match any predefined routes
        return ['/'];
    }
    
    // Default return statement to handle all code paths
    return [];
  }

}
