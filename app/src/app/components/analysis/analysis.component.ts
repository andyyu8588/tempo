import { HttpService } from './../../services/http.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
results:any = [
  {
    "name": "Germany",
    "series": [
      {
        "name": "2010",
        "value": 7300000
      },
      {
        "name": "2011",
        "value": 8940000
      }
    ]
  },

  {
    "name": "USA",
    "series": [
      {
        "name": "2010",
        "value": 7870000
      },
      {
        "name": "2011",
        "value": 8270000
      }
    ]
  }
]
  view: any[] = [window.innerWidth*0.90,window.innerHeight]
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
    this.results = this.getData()
  }
  clicked(){
    console.log(localStorage.getItem('username'))
    console.log(this.results)
  }
  getData() {

    let username = localStorage.getItem('username')
    this.HttpService.get('/user', {username: username}).then((data: any) => {
      console.log(data)
      let history = data.user[0].history
      console.log(history)
      let series = []
      history.forEach(days => {
        let name = (history.indexOf(days)+1).stringify() // day (1,2,3,4...)
        let date = (days.date)//gets given date
        let value = (days.workouts.length).stringify() // number of workouts done that day
        series.push({
          name : name,
          date : date,
          value : value,
        })
      });
      let output = [{
        'name' : "workout",
        'series' : series
      }]
      return output

    }).catch((err) => {
      console.log(err)
    })
  }
}
