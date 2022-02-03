import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LandingPageConfigService } from '../services/landing-page-config.service';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-landing-page-main',
  templateUrl: './landing-page-main.component.html',
  styleUrls: ['./landing-page-main.component.scss']
})
export class LandingPageMainComponent implements OnInit,AfterViewInit {

  public readonly skillsArr: { text: string; value: number; }[]=[]
  public readonly aboutText: {title: string,text: string}

  @ViewChild('about') public about!: ElementRef ;
  @ViewChild('skills') public skills!: ElementRef ;
  @ViewChild('works') public works!: ElementRef ;

  constructor(private _scrollService: ScrollService,private readonly _landingPageConfigService:LandingPageConfigService) {
    this.aboutText= this._landingPageConfigService.about;
    this._landingPageConfigService.skills.forEach(skill=> this.skillsArr.push(skill));
  }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this._scrollService.setElementRefById('about',this.about)
    this._scrollService.setElementRefById('skills',this.skills)
    this._scrollService.setElementRefById('works',this.works)
  }
}
