import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable } from '@angular/core';
import { RefElement } from '../models/refElement';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  private _navbar:RefElement=new RefElement("navbar","navbár");
  private _refElements:RefElement[] = []

  get refElements():RefElement[]{return this._refElements}

  constructor(@Inject(DOCUMENT) private _document: Document,private _window: Window) {
    [
      {id:"home",linkName:"Home"},
      {id:"about",linkName:"Rólam"},
      {id:"skills",linkName:"Tapasztalat"},
      {id:"works",linkName:"Munkáim"},
      {id:"footer",linkName:"Kapcsolat"}
    ].forEach(refElement => this._refElements.push(new RefElement(refElement.id,refElement.linkName)))
  }

  setElementRefById(id:string,elementRef:ElementRef):void{
    const element: RefElement | undefined = this._refElements.find(e => e.id === id)
    if (element!==undefined) {
      element.elementRef=elementRef
    }
  }

  setNavbarElementRef(elementRef:ElementRef):void{
    this._navbar.elementRef=elementRef
  }

  getRefElementByLinkName(linkName:string):RefElement | undefined{
    return this._refElements.find(e => e.linkName === linkName)
  }

  scrollByLinkName(linkName:string): void{

    const refElement:RefElement | undefined = this.getRefElementByLinkName(linkName)

    if (this._navbar.elementRef===undefined || this._navbar.elementRef===null || refElement===undefined || refElement.elementRef===undefined) {
      return;
    }
    const offset:number = this._navbar.elementRef.nativeElement.clientHeight;
    const bodyRect:number =  this._document.body.getBoundingClientRect().top;
    const elementRect:number = refElement.elementRef.nativeElement.getBoundingClientRect().top;
    const elementPosition:number = elementRect - bodyRect;
    const offsetPosition:number = elementPosition - offset;

    this._window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }

}
