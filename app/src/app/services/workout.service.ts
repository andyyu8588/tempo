const dataset = require( './JEFITDB.json');
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

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

  constructor(private HttpService : HttpService) { }

  createWorkout(username){
    let possibleWorkout = []
    let chosenWorkout = []
    //get preferences of user from database
    this.HttpService.get('/user', {username : username}).then(data=>{
      console.log(data)
      // creates array of possible exercises using user preferences
      dataset.forEach(exercise => {
        if (data['user'][0].difficulty == exercise.Difficulty && data['user'][0].equipment.includes(exercise.Equipment) && data['user'][0].type.includes(dataset.Type)){
          //check blacklist
          if (!data['user'][0].blacklist.includes(exercise)){
            possibleWorkout.push(exercise)}
          }
        for (var time = 0; time < data['user'][0].duration; time++){
          //push exercises randomly according to timeframe
          let newExercise = possibleWorkout[Math.floor(Math.random()*(possibleWorkout.length-1))]// gets random exercise from array
          if (!chosenWorkout.includes(newExercise)){
            //avoids duplicate
            chosenWorkout.push(newExercise)
          }
        }
        //need to save chosen workout to the database
        let exerciseNames = []
        chosenWorkout.forEach((exercise) => {
          exerciseNames.push(exercise.Workout)
        })
        //saves current workout to user database
        let workoutInfo = {
          username : username,
          date : new Date().toLocaleDateString(),
          time : new Date().toLocaleTimeString(),
          exercices : exerciseNames
        }
        this.HttpService.post('user/exercise',{
          workoutInfo
        }).then((res) => {
          console.log(res)
        }).catch((err) => {
          console.log(err)
        })

        return (chosenWorkout)
        });
    })
  }
  ngOnDestroy(){
    this._Workout.unsubscribe()
  }

}
