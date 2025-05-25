import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dog-details-modal',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './dog-details-modal.component.html',
  styleUrls: ['./dog-details-modal.component.scss'],
})
export class DogDetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DogDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
