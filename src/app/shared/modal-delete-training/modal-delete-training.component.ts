import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-modal-delete-training',
  templateUrl: './modal-delete-training.component.html',
  styleUrls: ['./modal-delete-training.component.css'],
})
export class ModalDeleteTrainingComponent {
  constructor(private dialogRef: MatDialogRef<ModalComponent>) {}
  isDeleteConfirmed: boolean = false;

  onSubmit() {
    this.isDeleteConfirmed = true;
    this.dialogRef.close(this.isDeleteConfirmed);
  }
  close() {
    this.dialogRef.close(this.isDeleteConfirmed);
  }
}
