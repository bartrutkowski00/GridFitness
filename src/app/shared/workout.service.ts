import { Injectable } from '@angular/core';
import { workoutBlueprint } from './workoutModal';
import { BehaviorSubject, take } from 'rxjs';
import { AuthServiceService } from '../auth/auth-service.service';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
} from '@angular/fire/firestore';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class WorkoutService {
  constructor(private auth: AuthServiceService, private firestore: Firestore) {
    auth._user.pipe(take(1)).subscribe((user) => {
      this.user = user;
    });
  }
  db: any = getFirestore();
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
    let nWorkoutId: number;
    if (this.workouts.length === 0) {
      nWorkoutId = 1;
    } else {
      nWorkoutId = this.workouts[this.workouts.length - 1].workoutId + 1;
    }

    if (trainingName !== undefined) {
      this.workouts.push({
        workoutCreator: this.user.displayName,
        workoutName: trainingName,
        workoutId: nWorkoutId,
        exercises: [],
      });
      this.workoutsChange.next(this.workouts.slice());
    }
  }

  deleteWorkout(selectedWorkout: any) {
    let id = this.workouts.indexOf(selectedWorkout);

    this.workouts.splice(id, 1);
    this.workoutsChange.next(this.workouts.slice());
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

  async getWorkoutsFromDatabase() {
    try {
      const docRef = doc(this.db, 'users', this.user.uId);
      const docSnap = await getDoc(docRef);
      console.log('Document written with ID: ');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  async saveWorkoutsToDatabase() {
    try {
      const docRef = await addDoc(collection(this.db, 'robots'), {
        name: 'test',
        datas: 'test2',
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}
