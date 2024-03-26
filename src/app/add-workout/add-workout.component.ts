import { Component, OnDestroy, OnInit } from '@angular/core';
import { WorkoutService } from '../shared/workout.service';
import { workoutBlueprint } from '../shared/workoutModal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css'],
})
export class AddWorkoutComponent implements OnInit, OnDestroy {
  constructor(private workoutService: WorkoutService) {}
  workouts: workoutBlueprint[] = [];
  workoutsSub!: Subscription;

  test() {
    console.log(this.workouts);
  }

  ngOnInit() {
    this.workoutService.getWorkoutsFromDatabase();
    this.workoutsSub = this.workoutService.workoutsChange.subscribe(
      (workoutsArr) => {
        this.workouts = workoutsArr;
      }
    );
  }

  ngOnDestroy(): void {}
}
