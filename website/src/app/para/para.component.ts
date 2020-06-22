import { Component, OnInit, Input } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-para',
  templateUrl: './para.component.html',
  styleUrls: ['./para.component.scss']
})

export class ParaComponent implements OnInit {

  // Parent/Child w/ side-bar.component
  general_: string;
  download_: string;
  aboutUs_: string;
  
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ){
    this.matIconRegistry.addSvgIcon(
      "gitHubIcon",
      this.domSanitizer.bypassSecurityTrustResourceUrl("https://image.flaticon.com/icons/svg/25/25231.svg")
    );
  }

  ngOnInit(): void {
  }
}
