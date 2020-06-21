import { HttpService } from './../../services/http.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  username = 'andy123'
  days = [{
    series: [
      {
        name: 123,
        value: 11212
      }
    ]
  }]
  times = []
  workouts = [5, 6, 7]
  exercises = []

  view: any[] = [window.innerWidth*0.37,window.innerHeight*.70]
  view2: any[] = [window.innerWidth*0.90,window.innerHeight]
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

  ngOnInit(): void {
    this.getData()
  }

  getData() {
  //   this.HttpService.get('/user', {username: this.username}).then((data: any) => {
  //     let history = data.user[0].history
  //     history.forEach((day) => {
  //       this.days.push(day.date)
  //       this.workouts.push(day.workouts)
  //     })
  //     console.log(this.days)
  //     console.log(this.workouts)
  //   }).catch((err) => {
  //     console.log(err)
  //   })
  }
}
