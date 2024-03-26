import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WorkoutConfigComponent } from './workout-config/workout-config.component';
import { AddWorkoutComponent } from './add-workout/add-workout.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'workoutConfig', component: WorkoutConfigComponent },
  { path: 'addWorkout', component: AddWorkoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
