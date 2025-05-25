import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarModule,
} from '@angular/material/snack-bar';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-alert-snackbar',
  standalone: true,
  imports: [CommonModule, MatIcon, MatSnackBarModule],
  templateUrl: './alert-snackbar.component.html',
  styleUrl: './alert-snackbar.component.scss',
})
export class AlertSnackbarComponent {
  title: string = '';
  subtitle: string = '';
  type: string = '';

  constructor(
    private readonly snackbar: MatSnackBar,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {
    this.title = data.title;
    this.subtitle = data.subtitle;
    this.type = data.type;
  }

  close() {
    this.snackbar.dismiss();
  }
}
