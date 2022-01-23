import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { faUser,faMapMarkerAlt, IconDefinition,faEnvelope, faPhone,} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faGithub, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { ElementRefService } from '../services/element-ref.service';

@Component({
  selector: 'app-landing-page-footer',
  templateUrl: './landing-page-footer.component.html',
  styleUrls: ['./landing-page-footer.component.scss']
})
export class LandingPageFooterComponent implements OnInit {
  public icons:IconDefinition[] = [faUser,faMapMarkerAlt,faEnvelope,faPhone,faFacebookF, faGithub, faLinkedinIn]
  public person={
    keys:["Név","Cím","Email","Telefonszám"],
    values:["Ballér Pál Krisztián","Magyarország, Balatonlelle","baller.krisztian@gmail.com","06/70-539-7536"]
  }
  @ViewChild('footer') public footer!: ElementRef ;

  constructor(private _elementRefService: ElementRefService) { }

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this._elementRefService.add({id:"footer",ref:this.footer})
  }

}
