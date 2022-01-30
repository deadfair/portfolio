import {Point} from './point'
import {Directions} from './directions'
import { Difficulty } from '../interfaces/difficulty';
import { SnakeConfig } from './snakeconfig';

export class Snake{
  private _speed:number=0;
  private _acceleration:number=0;
  protected readonly _directions;
  protected readonly _body:Point[]=[new Point(0,0)]

  private static readonly _difficultys:Difficulty[]=SnakeConfig.difficultys
  private static readonly _defaultDifficulty:Difficulty={name:"Unknown",speed:50,acceleration:0}

  public static get difficultys():Difficulty[]{return this._difficultys}
  public static get defaultDifficulty():Difficulty{return this._defaultDifficulty}
  public get body():Point[]{return this._body}
  get speed(){return this._speed}

  constructor(difficultyName:string,boxUnit:number){
    this._directions=new Directions(boxUnit)
    this._directions.currentDirection=(this._directions.RIGHT)
    this.difficultyChange(difficultyName);
  }

  protected speedIncrement():void{this._speed = this._speed + this._acceleration;}

  private speedInit(difficultyName:string):void{
    const currentDifficulty : Difficulty = this.getDifficultyByDifficultyName(difficultyName)
    this._speed= currentDifficulty.speed + (this.body.length-1) * this._acceleration
  }
  private accelerationInit(difficultyName:string):void{
    const currentDifficulty : Difficulty = this.getDifficultyByDifficultyName(difficultyName)
    this._acceleration= currentDifficulty.acceleration
  }

  private getDifficultyByDifficultyName(difficultyName:string):Difficulty{
    return  Snake._difficultys.find((d)=>d.name === difficultyName) || Snake.defaultDifficulty
  }

  public difficultyChange(difficultyName:string):void{
    this.accelerationInit(difficultyName)
    this.speedInit(difficultyName)
  }

  public getHead(distance:number=0):Point{
    return this._body[this._body.length-1-distance];
  }

  private getNewHeadPosition(direction:Point):Point{
    return this.getHead().createPointByPointsSum(direction)
  }

  public move():void{
    this._directions.lastDirection = this._directions.currentDirection;
    this._body.push(this.getNewHeadPosition(this._directions.currentDirection))
    this._body.shift();
  }

  public isPointInBody(point:Point,start:number=0,end:number=this._body.length):boolean{
    return this._body.slice(start,end).some((item:Point)=>item.isSamePoint(point))
  }

  public checkEatingMyTail():boolean{
    return this.isPointInBody(this.getHead(),0,-1)
  }

  public checkEating(apple:Point):boolean{
    return this.getHead().isSamePoint(apple)
  }

  public eating(apple:Point):void{
    this._body.push(apple)
    this.speedIncrement()
  }

  public directionListener(event: KeyboardEvent): void{
      switch (event.key) {
        case "ArrowLeft":
          if (!this._directions.isDirectionOppositeToLastDirection(this._directions.LEFT)) {
            event.preventDefault();
            this._directions.currentDirection = (this._directions.LEFT)
          }
        break;
        case "ArrowRight":
          if (!this._directions.isDirectionOppositeToLastDirection(this._directions.RIGHT)) {
            event.preventDefault();
            this._directions.currentDirection = (this._directions.RIGHT)
          }
        break;
        case "ArrowUp":
          if (!this._directions.isDirectionOppositeToLastDirection(this._directions.UP)) {
            event.preventDefault();
            this._directions.currentDirection = (this._directions.UP)
          }
        break;
        case "ArrowDown":
          if (!this._directions.isDirectionOppositeToLastDirection(this._directions.DOWN)) {
            event.preventDefault();
            this._directions.currentDirection = (this._directions.DOWN)
          }
        break;
      }
  }
}
