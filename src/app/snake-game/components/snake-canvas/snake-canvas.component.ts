import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AISnake } from '../../models/aisnake';
import { Point } from '../../models/point';
import { Snake } from '../../models/snake';
import { DifficultyName, ModeName, SnakeConfig } from '../../models/snakeconfig';

@Component({
  selector: 'app-snake-canvas',
  templateUrl: './snake-canvas.component.html',
  styleUrls: ['./snake-canvas.component.scss']
})
export class SnakeCanvasComponent implements OnInit, AfterViewInit {

  @Output() difficultyChange: EventEmitter<string> = new EventEmitter();
  @Output() modeChange: EventEmitter<string> = new EventEmitter();
  @Output() scoreChange: EventEmitter<number> = new EventEmitter();

  @Input() gameClickHeandler!: EventEmitter<string>;
  @Input() difficultyClickHeandler!: EventEmitter<string>;
  @Input() modeClickHeandler!: EventEmitter<string>;

  private difficulty: string = DifficultyName.IMPOSSIBLE;
  private mode:string = ModeName.PLAYER
  private snake!: AISnake | Snake
  private ctx!: CanvasRenderingContext2D;
  private apple: Point = this.createApple()
  private timerId: any
  private score: number = 0;
  private gameIsStay: boolean = true;
  private _gameIsOver: boolean = false;
  get gameIsOver(): boolean { return this._gameIsOver; }
  private difficultyCanChange: boolean = true;
  private modeCanChange: boolean = true;
  @ViewChild('canvas', { static: false }) public canvas!: ElementRef;

  constructor() {
    this.snakeInit()
  }

  ngOnInit(): void {
    this.gameClickHeandler.subscribe((value) => { this.gameClickHeandlerSwitch(value) })
    this.difficultyClickHeandler.subscribe((value) => {
      this.difficulty = value
      if (this.difficultyCanChange) {
        this.difficultyChange.emit(this.difficulty)
      }
    })
    this.modeClickHeandler.subscribe((value) => {
      this.mode= value
      if (this.modeCanChange) {
        this.modeChange.emit(this.mode)
      }
    })

  }

  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.canvasSizeInit()
    this.canvasRender();
    this.snakeRender();
    this.scoreRender();
    Promise.resolve().then(() => {this.difficultyChange.emit(this.difficulty)})
    Promise.resolve().then(() => {this.modeChange.emit(this.mode)})
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.snake.directionListener(event)
  }

  private canvasSizeInit(): void {
    this.canvas.nativeElement.height = SnakeConfig.canvasSizes.height
    this.canvas.nativeElement.width = SnakeConfig.canvasSizes.width
  }

  private appleInit():void {
    let apple = this.createApple()
    // 90% pályaterítettségnél ~10% a valószínűsége hogy 22x elrontjuk a dobást egymás után
    while (this.snake.isPointInBody(apple)) {
      apple = this.createApple()
    }
    this.apple = apple
    if (this.snake instanceof AISnake) {
      this.snake.calculateRoad(apple)
    }
  }

  private createApple():Point {
    const x = Math.floor(Math.random() * (SnakeConfig.canvasSizes.width) / SnakeConfig.canvasSizes.boxUnit) * SnakeConfig.canvasSizes.boxUnit
    const y = Math.floor(Math.random() * (SnakeConfig.canvasSizes.height) / SnakeConfig.canvasSizes.boxUnit) * SnakeConfig.canvasSizes.boxUnit
    return new Point(x, y)
  }




  private gameClickHeandlerSwitch(value: string): void {
    switch (value) {
      case "start": this.start();
        break;
      case "restart": this.restart();;
        break;
      case "pause": if (!this.gameIsStay) { this.pause(); }
        break;
      default:
        break;
    }
  }



  private setFrequency(): void {
    clearInterval(this.timerId)
    this.timerId = setInterval(() => {
      this.snakeMove()
      this.render();
    }, this.calcFrequency());
  }

  private calcFrequency():number {
    return Math.floor(1 / this.snake.speed * 1000)
  }

  private snakeMove(): void {
    this.snake.move()
    if (this.isGameOver()) {
      clearInterval(this.timerId)
      this.gameOver()
    }
    if (this.snake.checkEating(this.apple)) {
      this.snakeEating(this.apple)
    }
  }

  private snakeEating(apple: Point): void {
    this.snake.eating(apple)
    this.score++;
    this.setFrequency()
    this.appleInit()
  }



  private render():void {
    this.canvasRender();
    this.appleRender();
    this.snakeRender();
    this.scoreRender();
  }

  private canvasRender():void {
    this.ctx.fillStyle = SnakeConfig.canvasColors.background;
    this.ctx.fillRect(0, 0, SnakeConfig.canvasSizes.width, SnakeConfig.canvasSizes.height);
  }
  private appleRender():void {
    this.ctx.fillStyle = SnakeConfig.canvasColors.apple
    this.ctx.fillRect(this.apple.x, this.apple.y, SnakeConfig.canvasSizes.boxUnit, SnakeConfig.canvasSizes.boxUnit)
  }
  private snakeRender():void {
    for (const snakeBodyUnite of this.snake.body) {
      this.ctx.fillStyle = SnakeConfig.canvasColors.snake
      this.ctx.fillRect(snakeBodyUnite.x, snakeBodyUnite.y, SnakeConfig.canvasSizes.boxUnit, SnakeConfig.canvasSizes.boxUnit)
    }
  }
  private scoreRender():void {
    this.scoreChange.emit(this.score)
  }



  private isGameOver(): boolean {
    return this.isCollisionInWall() || this.snake.checkEatingMyTail()
  }

  private isCollisionInWall():boolean {
    return this.snake.getHead().x < 0 ||
      this.snake.getHead().y < 0 ||
      this.snake.getHead().x >= SnakeConfig.canvasSizes.width ||
      this.snake.getHead().y >= SnakeConfig.canvasSizes.height
  }

  private gameOver():void {
    this.gameIsStay = true;
    this._gameIsOver = true;
    this.difficultyCanChange = true;
    this.modeCanChange = true;
  }



  private start(): void {
    if (this.modeCanChange) {
      this.snakeInit()
    }
    if (this.gameIsStay && !this._gameIsOver) {
      this.difficultyChange.emit(this.difficulty)
      this.snake.difficultyChange(this.difficulty)
      this.continue()
    }
  }

  private continue(): void {
    this.setFrequency();
    this.gameIsStay = false;
    this.difficultyCanChange = false
    this.modeCanChange = false
  }

  private restart():void {
    this.difficultyCanChange = true
    this.modeCanChange = true
    this._gameIsOver = false
    this.pause()
    this.score = 0;
    this.snakeInit()
    this.appleInit();
    this.canvasRender();
    this.snakeRender();
    this.scoreRender();
  }

  private snakeInit():void {
    if (this.mode === ModeName.PLAYER) {
      this.snake = new Snake(this.difficulty, SnakeConfig.canvasSizes.boxUnit);
      return
    }
    if (this.mode === ModeName.AI) {
      this.snake = new AISnake(this.difficulty, SnakeConfig.canvasSizes.boxUnit);
      const tempsnake = this.snake as AISnake;
      tempsnake.calculateRoad(this.apple)
      return
    }
    this.snake = new Snake(this.difficulty, SnakeConfig.canvasSizes.boxUnit);
  }


  private pause():void {
    clearInterval(this.timerId)
    this.gameIsStay = true
  }
}
