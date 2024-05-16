import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddVmmcTrainingComponent } from './vmmc/add-vmmc-training/add-vmmc-training.component';
import { ViewVmmcTrainingComponent } from './vmmc/view-vmmc-training/view-vmmc-training.component';
import { AddTraineesComponent } from './demographic/add-trainees/add-trainees.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { TrainingListingComponent } from './trainings/training-listing/training-listing.component';
import { AddHtsTrainingComponent } from './hts/add-hts-training/add-hts-training.component';
import { RegisteredTraineesComponent } from './lists/registered-trainees/registered-trainees.component';
import { VmmcListComponent } from './lists/vmmc-list/vmmc-list.component';
import { HtsListComponent } from './lists/hts-list/hts-list.component';
import { WarningPopupComponent } from './demographic/warning-popup/warning-popup.component';
import { TrainingRecordingComponent } from './trainings/training-recording/training-recording.component';
import { AddFacilitatorComponent } from './demographic/add-facilitator/add-facilitator.component';
import { RegisteredListComponent } from './demographic/registered-list/registered-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddVmmcTrainingComponent,
    ViewVmmcTrainingComponent,
    AddTraineesComponent,
    NavigationBarComponent,
    TrainingListingComponent,
    AddHtsTrainingComponent,
    RegisteredTraineesComponent,
    VmmcListComponent,
    HtsListComponent,
    WarningPopupComponent,
    TrainingRecordingComponent,
    AddFacilitatorComponent,
    RegisteredListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatSnackBarModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatCheckboxModule,
    MatRadioModule,
    ReactiveFormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
