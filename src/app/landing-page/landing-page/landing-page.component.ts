import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public ids: string[]=["home","about","skills","works","footer"]
  public navLinkNames:string[]=["Home","Rólam", "Tapasztalat","Munkáim", "Kapcsolat"]
  constructor() { }

  ngOnInit(): void {
  }

}


