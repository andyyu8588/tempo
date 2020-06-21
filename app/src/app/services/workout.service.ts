const dataset = require( './JEFITDB.json');
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService implements OnDestroy{



  stretchTime = 1
  exerTime = 0.75


/* data = {
  username : 'username',
  difficulty : 'intermediate',
  equipment : ['bodyweight'],
  bodypart : ['chest'],
  duration : 5,
}
*/
  private newWorkout: Array<Object>
  private _Workout : BehaviorSubject<any> = new BehaviorSubject(this.newWorkout)
  public Workout : Observable<any> = this._Workout.asObservable()

  constructor() { }

  createWorkout(data){
    let possibleWorkout = []
    let chosenWorkout = []
    dataset.forEach(exercise => {
      if (data.difficulty == exercise.Difficulty && data.equipment.includes(exercise.Equipment) && data.type.includes(dataset.Type)){

        //needs if statement to check blacklist
        possibleWorkout.push(exercise)
      }
      for (var time = 0; time < data.duration; time++){
        let newExercise = possibleWorkout[Math.floor(Math.random()*(possibleWorkout.length-1))]// gets random exercise from array
        if (!chosenWorkout.includes(newExercise)){
          chosenWorkout.push(newExercise)
        } //avoids duplicate
      }
      //need to save chosen workout to the database
      let workoutInfo = {
        date : new Date().toLocaleDateString(),
        time : new Date().toLocaleTimeString(),
        exercice : chosenWorkout
      }
      return (chosenWorkout)

    });

  }
  ngOnDestroy(){
    this._Workout.unsubscribe()
  }

}
