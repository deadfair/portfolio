import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { faTimes, IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {faOpera} from '@fortawesome/free-brands-svg-icons';
import { Player } from '../../models/player';

@Component({
  selector: 'app-amoba-canvas',
  templateUrl: './amoba-canvas.component.html',
  styleUrls: ['./amoba-canvas.component.scss']
})
export class AmobaCanvasComponent implements OnInit {

  iconX:IconDefinition=faOpera
  @ViewChild('container') public container?:ElementRef

  @Input() x?:number;
  @Input() y?:number;
  @Output() winnerPlayer:EventEmitter<Player> = new EventEmitter();
  @Output() nextPlayer:EventEmitter<Player> = new EventEmitter();

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    event.target.innerWidth;
  }
  private gameOver:boolean = false;
  private players: Player[]=[new Player(0,"red",faOpera),new Player(1,"red",faTimes)]
  private currentPlayer:Player = this.players[0] ;
  // 2D to 1D => // index = indexX * arrayWidth + indexY;
  public table: Player[] = []
  private step:number= 0;

  constructor(){}
  ngOnInit(): void {}

  onClick(x:number | undefined, y:number | undefined):void {
    if (this.gameOver || x===undefined || y===undefined || !this.x || this.table[x*this.x+y]) {
      return
    }
    this.table[x*this.x+y] = this.currentPlayer
    if (this.isTie()) {
      // döntetlen
    }
    this.step++
    if (this.isGameOver()) {
      this.gameOver=true
      this.winnerPlayer.emit(this.currentPlayer)
    }
    this.currentPlayer = this.getNextPlayer();
    this.nextPlayer.emit(this.currentPlayer)
  }

  private isGameOver():boolean {
    return this.ishorizontalOver() || this.isVerticalOver() || this.isCrossRightOver() || this.isCrossLeftOver()
  }

  private ishorizontalOver():boolean{
    if (!this.y) {
      return true
    }
    for(let i=0;i<this.table.length;i++){
      if (i%this.y<=this.y-5 && this.table[i]) {
        if(this.table[i]===this.table[i+1] && this.table[i]===this.table[i+2]  && this.table[i]===this.table[i+3]  && this.table[i]===this.table[i+4]){
          return true
        }
      }
    }
    return false;
  }

  isVerticalOver():boolean{
    if (!this.y || !this.x) {
      return true
    }
    for(let i=0;i<this.table.length;i++){
      if(this.table[i] && i<((this.y-4)*this.x)){
        if(this.table[i]===this.table[i+this.x] && this.table[i]===this.table[i+2*this.x]  && this.table[i]===this.table[i+3*this.x]  && this.table[i]===this.table[i+4*this.x]){
          return true;
        }
      }
    }
    return false;
  }
  isCrossRightOver():boolean{
    if (!this.y || !this.x) {
      return true
    }
    for(var i=0;i<this.table.length;i++){
      if(this.table[i] && i<((this.y-4)*this.x)){
        if((i+5)%this.x!=1){
          if(this.table[i]===this.table[i+(1+this.x)] && this.table[i]===this.table[i+(1+this.x)*2]  && this.table[i]===this.table[i+(1+this.x)*3]  && this.table[i]===this.table[i+4*(1+this.x)]){
            return true;
          }
        }else{
          i+=4;
        }
      }
    }
    return false;
  }
  isCrossLeftOver():boolean{
    if (!this.y || !this.x) {
      return true
    }
    for(var i=0;i<this.table.length;i++){
      if(this.table[i] && i<((this.y-4)*this.x)){
        if(!(i%this.x<4)){
          if(this.table[i]===this.table[i+(-1+this.x)] && this.table[i]===this.table[i+(-1+this.x)*2]  && this.table[i]===this.table[i+(-1+this.x)*3]  && this.table[i]===this.table[i+4*(-1+this.x)])
          {return true;}
        }else{
          i+=4;
        }
      }
    }
    return false;
  }


  private getNextPlayer():Player {
    const currentI:number = this.players.findIndex(player => player.id === this.currentPlayer.id)
    // ide jöhetne vmi ha currentI === -1
    if (currentI === this.players.length - 1) {
      return this.players[0]
    }
    return this.players[currentI+1]
  }

  isTie():boolean {
    return this.x!==undefined && this.y!==undefined && this.step===this.x*this.y
  }
}
