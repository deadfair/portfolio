import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-landing-page-main',
  templateUrl: './landing-page-main.component.html',
  styleUrls: ['./landing-page-main.component.scss']
})
export class LandingPageMainComponent implements OnInit,AfterViewInit {

  public skillsArr={
    keys:["HTML5","CSS, SCSS","Bootstrap","JavaScript","TypeScript","Angular","RxJS, NgRx","SQL, NoSQL"],
    values:[90,83,90,95,97,85,70,60]
  }
  @ViewChild('about') public about!: ElementRef ;
  @ViewChild('skills') public skills!: ElementRef ;
  @ViewChild('works') public works!: ElementRef ;

  constructor(private _scrollService: ScrollService) { }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    console.log(this.about);
    this._scrollService.setElementRefById('about',this.about)
    this._scrollService.setElementRefById('skills',this.skills)
    this._scrollService.setElementRefById('works',this.works)
  }
}
