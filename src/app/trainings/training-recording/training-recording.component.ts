import { Component } from '@angular/core';

@Component({
  selector: 'app-training-recording',
  templateUrl: './training-recording.component.html',
  styleUrl: './training-recording.component.css'
})
export class TrainingRecordingComponent {

  trainingName = 'Shangring'; // Set dynamically based on your variable
  
  trainers: string[] = [
    'John',
    'Mike',
    'Bill',
    'Angela',
    // Add more trainer names as needed
  ];

}
