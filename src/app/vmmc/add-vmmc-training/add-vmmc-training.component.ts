import { Component } from '@angular/core';

@Component({
  selector: 'app-add-vmmc-training',
  templateUrl: './add-vmmc-training.component.html',
  styleUrl: './add-vmmc-training.component.css'
})
export class AddVmmcTrainingComponent {
  currentSection: number = 1;

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
