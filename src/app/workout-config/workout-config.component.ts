import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { workoutBlueprint } from '../shared/workoutModal';
import { WorkoutService } from '../shared/workout.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/modal.component';
import { ModalDeleteTrainingComponent } from '../shared/modal-delete-training/modal-delete-training.component';

@Component({
  selector: 'app-workout-config',
  templateUrl: './workout-config.component.html',
  styleUrls: ['./workout-config.component.css'],
})
export class WorkoutConfigComponent implements OnInit, OnDestroy {
  constructor(
    private workoutsService: WorkoutService,
    private dialog: MatDialog
  ) {}

  addWorkoutForm: any;
  workoutsSub!: Subscription;
  trainingSub!: Subscription;
  workouts: workoutBlueprint[] = [];
  selectedWorkout: workoutBlueprint | undefined;
  movementsCount: number[] = [];
  modalActivated: boolean = false;

  onClickTraining(training: any) {
    this.selectedWorkout = training;
  }
  onDeleteExercise(workoutIndex: number, exerciseIndex: number) {
    this.workoutsService.deleteExercise(workoutIndex, exerciseIndex);
  }
  onAddTraining() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRefTrain = this.dialog.open(ModalComponent, dialogConfig);

    this.modalActivated = true;
    this.trainingSub = dialogRefTrain.afterClosed().subscribe((data) => {
      this.workoutsService.addWorkout(data);
    });
  }

  onDeleteTraining() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRefTrain = this.dialog.open(
      ModalDeleteTrainingComponent,
      dialogConfig
    );

    this.modalActivated = true;
    this.trainingSub = dialogRefTrain.afterClosed().subscribe((data) => {
      if (data === true) {
        this.workoutsService.deleteWorkout(this.selectedWorkout);
        this.selectedWorkout = undefined;
      }
    });
  }

  onSubmitExeForm() {
    const getMovement = function (movementType: string) {
      switch (Number(movementType)) {
        case 1:
          return 'Horizontal push';
        case 2:
          return 'Vertical push';
        case 3:
          return 'Horizontal pull';
        case 4:
          return 'Vertical pull';
        case 5:
          return 'Squat';
        case 6:
          return 'Hinge';
        default:
          return 'Other';
      }
    };
    if (this.addWorkoutForm.valid) {
      this.workoutsService.addExercise(
        this.selectedWorkout?.workoutId,
        this.addWorkoutForm.value.exercisename,
        this.addWorkoutForm.value.setCount,
        getMovement(this.addWorkoutForm.value.movementType),
        this.addWorkoutForm.value.accesory
      );
    } else {
      alert('Fill all required fields');
    }
  }
  getMvmntTypeStyle(movementType: string) {
    switch (movementType) {
      case 'Horizontal push':
        return 'green';
      case 'Vertical push':
        return 'blue';
      case 'Horizontal pull':
        return 'purple';
      case 'Vertical pull':
        return 'magenta';
      case 'Squat':
        return 'brown';
      case 'Hinge':
        return 'grey';
      case 'Other':
        return 'pink';
      default:
        return '';
    }
  }

  countMovements() {
    let horizontalPush: number = 0;
    let verticalPush: number = 0;
    let horizontalPull: number = 0;
    let verticalPull: number = 0;
    let squat: number = 0;
    let hinge: number = 0;

    this.workouts.forEach((movement) => {
      movement.exercises.forEach((movement) => {
        switch (movement.movementType) {
          case 'Horizontal push':
            horizontalPush += Number(movement.setCount);
            break;
          case 'Vertical push':
            verticalPush += Number(movement.setCount);
            break;
          case 'Horizontal pull':
            horizontalPull += Number(movement.setCount);
            break;
          case 'Vertical pull':
            verticalPull += Number(movement.setCount);
            break;
          case 'Squat':
            squat += Number(movement.setCount);
            break;
          case 'Bend':
            hinge += Number(movement.setCount);
            break;
          case 'Other':
        }
      });
    });
    return [
      horizontalPush,
      verticalPush,
      horizontalPull,
      verticalPull,
      squat,
      hinge,
    ];
  }

  saveData() {
    this.workoutsService.saveWorkoutsToDatabase();
  }

  ngOnInit() {
    this.workoutsSub = this.workoutsService.workoutsChange.subscribe(
      (workouts) => {
        this.workouts = workouts;
        this.movementsCount = this.countMovements();
      }
    );
    this.addWorkoutForm = new FormGroup({
      exercisename: new FormControl(null, [Validators.required]),
      setCount: new FormControl(null, [Validators.required]),
      movementType: new FormControl(null, [Validators.required]),
      accesory: new FormControl(false),
    });
    this.workoutsService.getWorkoutsFromDatabase();
  }
  ngOnDestroy(): void {
    this.workoutsSub.unsubscribe();
    if (this.modalActivated) {
      this.trainingSub.unsubscribe();
    }
  }
}
