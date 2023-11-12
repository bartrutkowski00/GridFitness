import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<ModalComponent>) {}
  workoutName: any;

  onSubmit() {
    this.dialogRef.close(this.workoutName.value.workoutName);
  }

  close() {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    this.workoutName = new FormGroup({
      workoutName: new FormControl(null, [Validators.required]),
    });
  }
}
