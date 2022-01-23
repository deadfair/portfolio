import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ElementRefService } from '../services/element-ref.service';

@Component({
  selector: 'app-landing-page-main',
  templateUrl: './landing-page-main.component.html',
  styleUrls: ['./landing-page-main.component.scss']
})
export class LandingPageMainComponent implements OnInit {

  public skillsArr={
    keys:["HTML5","CSS, SCSS","Bootstrap","JavaScript","TypeScript","Angular","RxJS, NgRx","SQL, NoSQL"],
    values:[90,83,90,95,97,85,70,60]
  }
  @ViewChild('about') public about!: ElementRef ;
  @ViewChild('skills') public skills!: ElementRef ;
  @ViewChild('works') public works!: ElementRef ;

  constructor(private _elementRefService: ElementRefService) { }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this._elementRefService.add({id:"about",ref:this.about})
    this._elementRefService.add({id:"skills",ref:this.skills})
    this._elementRefService.add({id:"works",ref:this.works})
  }


}
