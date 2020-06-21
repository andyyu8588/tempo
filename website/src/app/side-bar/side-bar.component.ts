import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  //Scrolling function when id is called (through button or icon)
  scrollToGeneral(){
    var elmnt1 = document.getElementById("_general").scrollIntoView({behavior: "smooth"});
  }
  scrollToDownload(){
    var elmnt3 = document.getElementById("_downloadInfo").scrollIntoView({behavior: "smooth"});
  }
  scrollToAboutUs(){
    var elmnt2 = document.getElementById("_aboutUs").scrollIntoView({behavior: "smooth"});
  }

  // Child/Parent w/ para.component
  @Input() _general: string;
  @Input() _downloadInfo: string;
  @Input() _aboutUs: string;

  ngOnInit(){}
}

