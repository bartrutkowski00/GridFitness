import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutConfigComponent } from './workout-config.component';

describe('WorkoutConfigComponent', () => {
  let component: WorkoutConfigComponent;
  let fixture: ComponentFixture<WorkoutConfigComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkoutConfigComponent]
    });
    fixture = TestBed.createComponent(WorkoutConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
