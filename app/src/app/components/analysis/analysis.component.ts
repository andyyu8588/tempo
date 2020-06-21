import { HttpService } from './../../services/http.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  results:any
  data: any
  view: any[] = [window.innerWidth*0.60,window.innerHeight]
  colorScheme = {
    domain: ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']
  }

  constructor(private HttpService: HttpService) { }
  clicked : boolean = false
  ngOnInit(): void {
    // this.results = this.getData()
    this.viewResult1().then(res=>{
      this.results = res
    }).catch((err)=>{
      console.log(err)
    })
  }
  toggleView(){
    console.log('view changed')
    this.clicked = !this.clicked
  }

  viewResult1() {
    return new Promise((resolve, reject)=>{
      let username = localStorage.getItem('username')
    this.HttpService.get('/user', {username: username}).then((data: any) => {
      let history = data.user[0].history
      let series = []
      history.forEach(day => {
        let name = 'day ' + (history.indexOf(day)+1).toString() // day (1,2,3,4...)
        let date= (day.date)//gets given date
        let value = (day.workouts.length) // number of workouts done that day
        series.push({
          username : username,
          name : name,
          date : date,
          value : value,
        })
      });
      let output = [{
        'name' : "days",
        'series' : series
      }]
      resolve(output)

    }).catch((err) => {
      console.log(err)
    })
  })
  }

date : string = null
  selected(event){
    this.clicked = true
    console.log(this.clicked)
    this.date = event.date
    this.HttpService.get('/user', {username: event.username}).then((data: any) => {
      let history = data.user[0].history
      let series = []
      history.forEach(day => {
        if (day.date == this.date){
          let workoutArray = [0]

          day.workouts.forEach(timePeriod => {
            if (timePeriod.value){
              workoutArray.push(1 + workoutArray[workoutArray.length-1])
            }
            else{
              workoutArray.push(workoutArray[workoutArray.length-1])
            }
            let name = timePeriod.time
            let workout = timePeriod.value
            let value = workoutArray[workoutArray.length-1]
            series.push({
            name : name,// must replace with right name
            workout : workout,
            value : value,
            })
          });

        }
      });
      let output = [{
        'name' : 'workouts',
        'series' : series
      }]
      this.data = output
      console.log(output)

    })
  }
selectedWorkout : boolean = false
chosenWorkout : any
  selectWorkout(event){
    this.chosenWorkout = event.workout
    this.selectedWorkout = true
  }

}


