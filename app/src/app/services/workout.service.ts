const dataset = require( './JEFITDB.json');
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  difficulty = 'beginner, intermediate, advanced'
  equipment = ['bodyweight']
  bodypart = ['chest']
  duration = 5
  constructor() { }



  createWorkout(data){
    let possibleWorkout = []
    dataset.forEach(exercise => {
      if (data.intensity == exercise.Difficulty && data.equipment == exercise.Equipment && data.type == dataset.Type )
    });

  }

}
