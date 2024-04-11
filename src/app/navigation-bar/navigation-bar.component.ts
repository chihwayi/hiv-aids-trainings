import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {

  username = 'Ignatious';

  constructor(private router: Router) {}

  goToAddTrainee() {
    this.router.navigate(['/demographic/add-trainees']); 
  }
}
