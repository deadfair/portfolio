import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmobaCanvasComponent } from './amoba-canvas.component';

describe('AmobaCanvasComponent', () => {
  let component: AmobaCanvasComponent;
  let fixture: ComponentFixture<AmobaCanvasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmobaCanvasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmobaCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
