import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { ElementRefService } from '../services/element-ref.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-landing-page-navbar',
  templateUrl: './landing-page-navbar.component.html',
  styleUrls: ['./landing-page-navbar.component.scss']
})
export class LandingPageNavbarComponent implements OnInit {

  @Input() public ids: string[] = [];
  @Input() public navLinkNames: string[] = [];
  @ViewChild('navbar') public navbar!: ElementRef ;

  constructor(private _elementRefService: ElementRefService,@Inject(DOCUMENT) private _document: Document, private _window: Window) { }

  ngOnInit(): void {}

  scroll(id: string): void{
    const element:ElementRef | undefined =  this._elementRefService.getElementRefById(id)
    if (this.navbar===null || element===undefined) {
      return;
    }
    const offset:number = this.navbar.nativeElement.clientHeight;
    const bodyRect:number =  this._document.body.getBoundingClientRect().top;
    const elementRect:number = element.nativeElement.getBoundingClientRect().top;
    const elementPosition:number = elementRect - bodyRect;
    const offsetPosition:number = elementPosition - offset;

    this._window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}
