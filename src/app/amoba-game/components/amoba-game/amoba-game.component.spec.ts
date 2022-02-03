import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmobaGameComponent } from './amoba-game.component';

describe('AmobaGameComponent', () => {
  let component: AmobaGameComponent;
  let fixture: ComponentFixture<AmobaGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmobaGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmobaGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
