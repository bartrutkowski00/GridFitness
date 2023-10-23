import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { workoutBlueprint } from '../shared/workoutModal';
import { WorkoutService } from '../shared/workout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workout-config',
  templateUrl: './workout-config.component.html',
  styleUrls: ['./workout-config.component.css'],
})
export class WorkoutConfigComponent implements OnInit, OnDestroy {
  constructor(private workoutsService: WorkoutService) {}

  addWorkoutForm: any;
  workoutsSub!: Subscription;
  workouts: workoutBlueprint[] = [];
  selectedWorkout: workoutBlueprint | undefined;
  onClickTraining(training: any) {
    this.selectedWorkout = training;
  }
  onDeleteExercise(workoutIndex: number, exerciseIndex: number) {
    this.workoutsService.deleteExercise(workoutIndex, exerciseIndex);
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
      console.log(this.addWorkoutForm);
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

  ngOnInit() {
    this.workoutsSub = this.workoutsService.workoutsChange.subscribe(
      (workouts) => {
        this.workouts = workouts;
      }
    );
    this.addWorkoutForm = new FormGroup({
      exercisename: new FormControl(null, [Validators.required]),
      setCount: new FormControl(null, [Validators.required]),
      movementType: new FormControl(null, [Validators.required]),
      accesory: new FormControl(false),
    });
  }
  ngOnDestroy(): void {
    this.workoutsSub.unsubscribe();
  }
}
