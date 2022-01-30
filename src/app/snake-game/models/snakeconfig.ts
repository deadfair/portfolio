import { CanvasSizes } from "../interfaces/canvalsizes"
import { CanvasColors } from "../interfaces/canvascolors"
import { Difficulty } from "../interfaces/difficulty"

export enum DifficultyName{
  EASY="Easy",NORMAL="Normal",HARD="Hard",IMPOSSIBLE="Impossible",
}
export class SnakeConfig {
  public static readonly difficultys:Difficulty[]=[
    {name: DifficultyName.EASY,speed:2,acceleration:0.2},
    {name: DifficultyName.NORMAL,speed:10,acceleration:1},
    {name: DifficultyName.HARD,speed:30,acceleration:3},
    // {name: DifficultyName.IMPOSSIBLE,speed:12,acceleration:1.2}
    {name: DifficultyName.IMPOSSIBLE,speed:400,acceleration:0}
  ]
  public static readonly canvasSizes:CanvasSizes= {width:500,height:400,boxUnit:10}
  public static readonly canvasColors:CanvasColors= {background:"darkgray",snake:"black",apple:"green"}
}
export enum ModeName{
  PLAYER="Player", AI="AI"
}


