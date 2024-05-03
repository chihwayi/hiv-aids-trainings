import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTraineesComponent } from './demographic/add-trainees/add-trainees.component';
import { TrainingListingComponent } from './trainings/training-listing/training-listing.component';
import { AddVmmcTrainingComponent } from './vmmc/add-vmmc-training/add-vmmc-training.component';
import { AddHtsTrainingComponent } from './hts/add-hts-training/add-hts-training.component';
import { TrainingRecordingComponent } from './trainings/training-recording/training-recording.component';
import { AddFacilitatorComponent } from './demographic/add-facilitator/add-facilitator.component';
import { VmmcListComponent } from './lists/vmmc-list/vmmc-list.component';
import { RegisteredListComponent } from './demographic/registered-list/registered-list.component';

const routes: Routes = [
  { path: 'demographic/add-trainees', component: AddTraineesComponent },
  { path: 'demographic/add-facilitators/:basic_information_id', component: AddFacilitatorComponent},
  { path: 'trainings/training-list/:basic_information_id', component: TrainingListingComponent},
  { path: 'trainings/vmmc/:basic_information_id', component: AddVmmcTrainingComponent},
  { path: 'trainings/hts', component: AddHtsTrainingComponent },
  { path: 'trainings/training-recording/:basic_information_id/:programId', component: TrainingRecordingComponent},
  { path: 'training-lists/vmmc', component:VmmcListComponent},
  { path: 'demographic/registered-list', component:RegisteredListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
