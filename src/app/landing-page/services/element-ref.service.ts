import { ElementRef, Injectable } from '@angular/core';
import { RefElement } from '../models/refElement';

@Injectable({
  providedIn: 'root'
})
export class ElementRefService {

  private _refElements:Map<string,ElementRef> = new Map();

  constructor() { }

  add(element:RefElement):void{
    if (this._refElements.has(element.id)) {
      return
    }
    this._refElements.set(element.id, element.ref);
  }

  getElementRefById(id:string):ElementRef | undefined{
    if (this._refElements.has(id)) {
      return this._refElements.get(id);
    }
    return undefined
  }
}
