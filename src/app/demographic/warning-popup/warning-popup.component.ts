import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-popup',
  templateUrl: './warning-popup.component.html',
  styleUrl: './warning-popup.component.css'
})
export class WarningPopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
