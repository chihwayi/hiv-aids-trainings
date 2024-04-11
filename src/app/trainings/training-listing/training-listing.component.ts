import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-training-listing',
  templateUrl: './training-listing.component.html',
  styleUrl: './training-listing.component.css'
})
export class TrainingListingComponent implements OnInit{

  basic_information_id: string | null = null;

  trainings = [
    { name: 'VMMC', iconUrl: 'assets/icons/vmmc-icon.png', type: 'vmmc' },
    { name: 'HIV TESTING', iconUrl: 'assets/icons/hiv-testing-icon.png', type: 'ht' },
    { name: 'STI', iconUrl: 'assets/icons/sti-icon.png', type: 'sti' },
    { name: 'PMTCT', iconUrl: 'assets/icons/pmtct-icon.png', type: 'pmtct' },
    { name: 'Key Population', iconUrl: 'assets/icons/key-population-icon.png', type: 'kp' },
    { name: 'Data Quality Improvement', iconUrl: 'assets/icons/data-quality-icon.png', type: 'dqi' },
    { name: 'ART', iconUrl: 'assets/icons/art-icon.png', type: 'art' },
    { name: 'CBS', iconUrl: 'assets/icons/cbs-icon.png', type: 'cbs' },
    { name: 'SI', iconUrl: 'assets/icons/mnde-icon.jpeg', type: 'si' },
    { name: 'Facilitators', iconUrl: 'assets/icons/facilitator-icon.png', type: 'facilitator' }
  ];

  constructor(private route:ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Retrieve basic_information_id from URL params
      this.basic_information_id = params.get('basic_information_id');
    });
  }

  getRouterLink(type: string): any[] {
    // Define your router links based on training type
    switch (type) {
      case 'vmmc':
        return ['/trainings/training-recording', this.basic_information_id];
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
      case 'facilitator':
        return ['/demographic/add-facilitators', this.basic_information_id];
      default:
        // Default route if type doesn't match any predefined routes
        return ['/'];
    }
    
    // Default return statement to handle all code paths
    return [];
  }

}
