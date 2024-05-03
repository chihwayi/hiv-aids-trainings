import { Component, OnInit } from '@angular/core';
import { TrainingsService } from '../../service/trainings.service';
import { Demographic } from '../../models/demographic';
import { Facility } from '../../models/facility';
import { Designation } from '../../models/designation';
import { Router } from '@angular/router';
import { DemographicList } from '../../models/demographicList';

@Component({
  selector: 'app-registered-list',
  templateUrl: './registered-list.component.html',
  styleUrl: './registered-list.component.css'
})
export class RegisteredListComponent implements OnInit {

  demographicLists: DemographicList[] = [];
  displayLimit: number = 20;

  constructor(
    private trainingService: TrainingsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDemographicList();
  }

  getDemographicList(): void {
    this.trainingService.getDemographicList().subscribe(
      (data: DemographicList[]) => {
        this.demographicLists = data;
      },
      (error) => {
        console.log('Error fetching data: ', error)
      })

  }

  onRecord(basic_information_id: string) {
    this.router.navigate(['/trainings/training-list', basic_information_id]);
  }

}
