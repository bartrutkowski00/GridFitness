export interface excerciseBlueprint {
  exerciseName: String;
  setCount: number;
  movementType: string;
  accesory: boolean;
}

export interface workoutBlueprint {
  workoutName: string;
  workoutId: number;
  exercises: excerciseBlueprint[];
  workoutCreator: string;
}
