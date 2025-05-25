import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss',
})
export class ConfirmationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      message: string;
      iconPath: string;
      buttonClass: string;
      buttonAction: string;
    },
  ) { }

  onButtonClick(): void {
    this.dialogRef.close(true);
  }
}
