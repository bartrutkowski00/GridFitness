import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { workoutBlueprint } from '../shared/workoutModal';

@Component({
  selector: 'app-workout-config',
  templateUrl: './workout-config.component.html',
  styleUrls: ['./workout-config.component.css'],
})
export class WorkoutConfigComponent implements OnInit {
  constructor() {}
  addWorkoutForm: any;
  selectedWorkout: workoutBlueprint | undefined;
  onClickTraining(training: any) {
    this.selectedWorkout = training;
    console.log(this.selectedWorkout);
  }
  sampleWorkouts: workoutBlueprint[] = [
    {
      workoutCreator: 'Tesciarz',
      workoutName: 'Próbny',
      workoutId: 1,
      exercises: [
        {
          exerciseName: 'Pompki',
          setCount: 5,
          movementType: 'Bend',
          accesory: false,
        },
        {
          exerciseName: 'Pompki1',
          setCount: 5,
          movementType: 'Bend',
          accesory: false,
        },
      ],
    },
    {
      workoutCreator: 'Tesciarz1',
      workoutName: 'Próbny1',
      workoutId: 2,
      exercises: [
        {
          exerciseName: 'Pompkie',
          setCount: 4,
          movementType: 'Squat',
          accesory: false,
        },
        {
          exerciseName: 'Pompkie1',
          setCount: 4,
          movementType: 'Squat',
          accesory: false,
        },
      ],
    },
  ];

  ngOnInit() {
    this.addWorkoutForm = new FormGroup({
      exercisename: new FormControl(null),
      setCount: new FormControl(null),
      movementType: new FormControl(null),
    });
  }
}
