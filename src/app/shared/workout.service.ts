import { Injectable } from '@angular/core';
import { workoutBlueprint } from './workoutModal';
import { BehaviorSubject, take } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  constructor(private auth: AuthServiceService) {
    auth._user.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }
  user: any;
  workouts: workoutBlueprint[] = [
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
  workoutsChange = new BehaviorSubject<workoutBlueprint[]>(
    this.workouts.slice()
  );

  addWorkout(trainingName: string) {
    if (trainingName !== undefined) {
      this.workouts.push({
        workoutCreator: this.user.displayName,
        workoutName: trainingName,
        workoutId: this.workouts[this.workouts.length - 1].workoutId + 1,
        exercises: [],
      });
      this.workoutsChange.next(this.workouts.slice());
    }
  }

  getWorkouts() {
    return this.workouts.slice();
  }
  deleteExercise(workoutIndex: number, exerciseIndex: number) {
    this.workouts[workoutIndex].exercises.splice(exerciseIndex, 1);
    this.workoutsChange.next(this.workouts.slice());
  }
  addExercise(
    workoutId: number | undefined,
    exerciseName: string,
    setCount: number,
    movementType: string,
    accesory: boolean
  ) {
    const workoutIndex: number = this.workouts.findIndex(
      (mov) => mov.workoutId === workoutId
    );
    this.workouts[workoutIndex].exercises.push({
      exerciseName: exerciseName,
      setCount: setCount,
      movementType: movementType,
      accesory: accesory,
    });
    this.workoutsChange.next(this.workouts.slice());
  }
}
