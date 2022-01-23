import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ElementRefService } from '../services/element-ref.service';

@Component({
  selector: 'app-landing-page-header',
  templateUrl: './landing-page-header.component.html',
  styleUrls: ['./landing-page-header.component.scss']
})
export class LandingPageHeaderComponent implements OnInit {

  constructor(private _elementRefService: ElementRefService) { }

  @ViewChild('home') public home!: ElementRef ;

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this._elementRefService.add({id:"home",ref:this.home})
  }

}
