import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Difficulty } from '../../interfaces/difficulty';
import { ModeName, SnakeConfig } from '../../models/snakeconfig';


@Component({
  selector: 'app-snake-game',
  templateUrl: './snake-game.component.html',
  styleUrls: ['./snake-game.component.scss']
})
export class SnakeGameComponent implements OnInit {

  public difficultys:Difficulty[] = SnakeConfig.difficultys
  public difficulty:string="";
  public modes:string[] = Object.values(ModeName)
  public mode:string=""
  public score:number=0;
  public gameClickHeandler: EventEmitter<string> = new EventEmitter();
  public difficultyClickHeandler: EventEmitter<string> = new EventEmitter();
  public modeClickHeandler: EventEmitter<string> = new EventEmitter();
  @ViewChild('start') public start!: ElementRef ;

  constructor(private _window: Window) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.underMdSizeCollapseMenu(this.start)
  }

  gameClickButton(id: string): void{
    this.gameClickHeandler.emit(id);
  }

  difficultyClickButton(name: string): void{
    this.difficultyClickHeandler.emit(name);
  }

  modeClickButton(mode: string): void{
    this.modeClickHeandler.emit(mode);
  }

  difficultyChange(value:string):void{
    this.difficulty = value
  }

  modeChange(value:string):void{
    this.mode = value
  }

  scoreChange(value:number): void{
    this.score =value
  }

  private underMdSizeCollapseMenu(element:ElementRef):void{
    const mediaQuery = this._window.matchMedia('(max-width: 767.98px)')
    if (mediaQuery.matches) {
      element.nativeElement.setAttribute("data-bs-target","#navbarSupportedContent" )
      element.nativeElement.setAttribute("data-bs-toggle","collapse" )
    }
  }
}
