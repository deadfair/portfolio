class Player{
    szin;
    jel;
    id;
    constructor(szin,jel,id){
        this.szin=szin;
        this.jel=jel;
        this.id=id;
    }
};
class Playerek{
    playerek;           // 16 os állandó méretű tömb
    playerekFelhasznált;    // változó méret, a felhasznált playereket tárolja sorba
    
    constructor(szinek,jelek,idk){
        let playerek=[];
        let id=0;
        for(let i=0;i<szinek.length;i++){
            for(let j=0;j<jelek.length;j++){
                playerek[id]=new Player(szinek[i],jelek[j],idk[id]);
                id++;
            }
        }
        this.playerekFelhasznált=[playerek[0],playerek[3]];
        playerek[0]=null;
        playerek[3]=null;
        this.playerek=playerek;
    }

    removePlayer(){ // playerekFelhasznált-ból kivesz és beleteszi a playerekbe vissza
        var ujplayerekFelhasznált=[];
        for (let i = 0; i < this.playerekFelhasznált.length-1; i++) {
            ujplayerekFelhasznált[i]=this.playerekFelhasznált[i];
        }
        this.playerek[this.playerekFelhasznált[this.playerekFelhasznált.length-1].id]=this.playerekFelhasznált[this.playerekFelhasznált.length-1];
        this.playerekFelhasznált=ujplayerekFelhasznált;
    }

    newPlayer(){  // playerekfelhasználtba rakunk 1 playert  a playerekből kivesszük
        for (let i = 0; i < this.playerek.length; i++) {
            if (!(this.playerek[i]===null || this.playerek[i]===undefined) ) {
                this.playerekFelhasznált[this.playerekFelhasznált.length]=this.playerek[i];
                this.playerek[i]=null;
                return;
            }
        }
    }
    
    getPlayerOfId(aktid){  // segéd fgv
        for (let i = 0; i < this.playerekFelhasznált.length; i++) {
            if(aktid===this.playerekFelhasznált[i].id){
            return i;
            }
        }
        return null;
    }
    
    getPlayerNext(aktplayer){ // player cseréhez kell
        var hova=this.getPlayerOfId(aktplayer.id) 
        var index=aktplayer.id+1;
        this.playerek[aktplayer.id]=aktplayer;
        while(this.playerek[index]===null || this.playerek[index]===undefined)
        {
            if(index>this.playerek.length){
                index=0;
            }else{
                index++;
            }            
        }
        this.playerekFelhasznált[hova]=this.playerek[index];
        this.playerek[index]=null;
    }
    
}
class Tabla{
    x;
    y;
    widthheightegyseg=50; //50px
    gyoker;
    gombok;   //.x egy négyzetrács
    akt;      // egy számláló 0 tól a lépéseket számolja
    gyoztes; // gyüztes azonosítója html
    next;    // köv player azonosítója, ahova kiírunk html
    adatok;     // egy tömb amivel számolunk, hogy van e győzelem
    restart;    // restart azonosítója html

    constructor(x,y,whe,gyoker,gyoztes,next,restart){
        this.x=x;
        this.y=y;
        this.widthheightegyseg=whe;
        this.gyoker=gyoker;
        this.akt=0;
        this.gyoztes=gyoztes;
        this.next=next;
        this.adatok=[];
        this.restart=restart;
    }


    tablamake(playerek){
        var text=``;
        for(var i=0;i<this.x*this.y;i++){   
            text= text +
            `<div class="x"></div>`;
        }
        this.gyoker.innerHTML= text; // tábla rácsok felépítése
        this.gombok=document.querySelectorAll(".x"); // mindhez egy szelektor
        this.init(playerek);
        this.tablahozOnclickesemenyekAdasa(playerek); // tábla onclick eseményre mi történjen

    }

    tablahozOnclickesemenyekAdasa(playerek){
        for(let i=0;i<this.gombok.length;i++){
            this.gombok[i].onclick=(e)=>{
                if(!(e.target.innerHTML==="X" || e.target.innerHTML==="O" || e.target.innerHTML===" ")){
                    
                    for(let j=0;j<playerek.playerekFelhasznált.length;j++){
                        if (this.akt%playerek.playerekFelhasznált.length==j) {
                            e.target.innerHTML=playerek.playerekFelhasznált[j].jel;
                            e.target.classList.add(playerek.playerekFelhasznált[j].szin);
                            this.adatok[Number(e.target.name)]=playerek.playerekFelhasznált[j].id;
                        }
                    }
                    this.akt++; 
                    if(this.isWon()===true)
                    {
                        for(let j=0;j<this.gombok.length;j++){
                            if(!(this.gombok[j].innerHTML==="X" || this.gombok[j].innerHTML==="O")){
                                this.gombok[j].innerHTML=" ";
                            }
                        }
                        this.gyoztes.innerHTML=this.kovetkezoPlayer(this.akt-1,playerek).jel;
                        this.gyoztes.classList.remove(this.kovetkezoPlayer(this.akt-1,playerek).szin);
                        this.gyoztes.classList.add(this.kovetkezoPlayer(this.akt-1,playerek).szin);
                    }
                    if(this.isTie()===true){
                            // mindenki vesztett
                    }else{
                        this.next.innerHTML=this.kovetkezoPlayer(this.akt,playerek).jel;
                        this.next.classList.remove(this.kovetkezoPlayer(this.akt-1,playerek).szin);
                        this.next.classList.add(this.kovetkezoPlayer(this.akt,playerek).szin);
                    }
    
                }
    
            }
        }
    }

    init(playerek){
        for(let i=0;i<this.gombok.length;i++){
            this.gombok[i].removeAttribute('class');
            this.gombok[i].classList.add("x");       
            this.gombok[i].name=i;  // adatok indexe
            this.gombok[i].innerHTML="";
            
            this.gyoztes.innerHTML="";

            this.adatok[i]=null;
            }
        this.next.innerHTML=playerek.playerekFelhasznált[0].jel;
        this.next.classList.remove(this.kovetkezoPlayer(this.akt,playerek).szin);
        this.akt=0;
        this.next.classList.add(playerek.playerekFelhasznált[0].szin);
        this.restart.onclick=()=>{
            this.init(playerek);
        }
    }

    kovetkezoPlayer(a,playerek){
        return playerek.playerekFelhasznált[a%playerek.playerekFelhasznált.length];
    }
    isWon(){
        return this.vizszintes() || this.fuggoleges() || this.keresztle() || this.keresztfel();
    }
    isTie(){
        if(this.akt===this.x*this.y){
        return true;
        }
        return false;
    }
    
    vizszintes(){
        for(var i=0;i<this.adatok.length;i++){
            if(this.adatok[i]!==null){
                if((i+5)%this.x!=1){
                    if(this.adatok[i]===this.adatok[i+1] && this.adatok[i]===this.adatok[i+2]  && this.adatok[i]===this.adatok[i+3]  && this.adatok[i]===this.adatok[i+4])
                    {return true;}
                }else{
                    i+=4;
                } 
            }
        }
        return false;
    }
    fuggoleges(){
        for(var i=0;i<this.adatok.length;i++){
            if(this.adatok[i]!==null && i<((this.y-4)*this.x)){
                if(this.adatok[i]===this.adatok[i+this.x] && this.adatok[i]===this.adatok[i+2*this.x]  && this.adatok[i]===this.adatok[i+3*this.x]  && this.adatok[i]===this.adatok[i+4*this.x])
                {return true;}
            }
        }
        return false;
    }
    keresztle(){
        for(var i=0;i<this.adatok.length;i++){
            if(this.adatok[i]!==null && i<((this.y-4)*this.x)){
                if((i+5)%this.x!=1){
                    if(this.adatok[i]===this.adatok[i+(1+this.x)] && this.adatok[i]===this.adatok[i+(1+this.x)*2]  && this.adatok[i]===this.adatok[i+(1+this.x)*3]  && this.adatok[i]===this.adatok[i+4*(1+this.x)])
                    {return true;}
                }else{
                    i+=4;
                }
            }
        }
        return false;
    }
    keresztfel(){
        for(var i=0;i<this.adatok.length;i++){
            if(this.adatok[i]!==null && i<((this.y-4)*this.x)){
                if(!(i%this.x<4)){
                    if(this.adatok[i]===this.adatok[i+(-1+this.x)] && this.adatok[i]===this.adatok[i+(-1+this.x)*2]  && this.adatok[i]===this.adatok[i+(-1+this.x)*3]  && this.adatok[i]===this.adatok[i+4*(-1+this.x)])
                    {return true;}
                }else{
                    i+=4;
                }
            }
        }
        return false;
    }

}







function section2init2player(){ // 2. oldal inicializálása
    let swap1=document.querySelector(".playercsere1");
    let aplayer1=document.querySelector(".aplayer1");
    let swap2=document.querySelector(".playercsere2");
    let aplayer2=document.querySelector(".aplayer2");
    aplayer1.innerHTML=playerek.playerekFelhasznált[0].jel;
    aplayer1.classList.add(playerek.playerekFelhasznált[0].szin);
    aplayer2.innerHTML=playerek.playerekFelhasznált[1].jel;
    aplayer2.classList.add(playerek.playerekFelhasznált[1].szin);
    tableMeretPluszMinuszOnclickInit();

    swap1.onclick=()=>{
        playerek.getPlayerNext(playerek.playerekFelhasznált[0]);
        aplayer1.innerHTML=playerek.playerekFelhasznált[0].jel;
        aplayer1.removeAttribute('class');
        aplayer1.classList.add(playerek.playerekFelhasznált[0].szin);
        aplayer1.classList.add("aplayer1");
        aplayer1.classList.add("jelek");
    }
    swap2.onclick=()=>{
        playerek.getPlayerNext(playerek.playerekFelhasznált[1]);
        aplayer2.innerHTML=playerek.playerekFelhasznált[1].jel;
        aplayer2.removeAttribute('class');
        aplayer2.classList.add(playerek.playerekFelhasznált[1].szin);
        aplayer2.classList.add("aplayer2");
        aplayer2.classList.add("jelek");
    }
    var minuszbotton=document.querySelector(".minuszbotton");
    //minuszbotton.style.display = "none";
    minuszbotton.style.visibility = "hidden";

    minuszbotton.onclick=(e)=>{
        var x=playerek.playerekFelhasznált.length;
        if(x>2){
            playerek.removePlayer();
            var myobj = document.getElementById(`divid${x}`);
            myobj.remove();
            if(x==16){
                var pluszbotton=document.querySelector(".pluszbotton");
                pluszbotton.style.visibility = "visible";
            }
        }
        if(playerek.playerekFelhasznált.length===2){
            //e.target.style.display = "none";
            e.target.style.visibility = "hidden";

        }
    }
    var pluszbotton=document.querySelector(".pluszbotton");
    pluszbotton.onclick=(e)=>{
        // ha nem üres akkor html kreálása
        var  div = document.createElement("div");
        var x=playerek.playerekFelhasznált.length+1;
        playerek.newPlayer();
        div.setAttribute("class","playerflex"); 
        div.setAttribute("id",`divid${x}`); 
        div.innerHTML=    `<p class="xy">Player${x}:</p>
                            <i class="playercsere${x} playercserex fas fa-sync-alt"></i>
                            <div class="aplayer${x} jelek ${playerek.playerekFelhasznált[x-1].szin}">
                            ${playerek.playerekFelhasznált[x-1].jel}</div>`;
        var element=document.getElementById("jatekosadas")
        element.appendChild(div); 
        if (x===playerek.playerek.length) {
            //e.target.style.display = "none";
            e.target.style.visibility = "hidden";
        }
        let swap=document.querySelector(`.playercsere${x}`);
        let aplayer=document.querySelector(`.aplayer${x}`);
        swap.onclick=()=>{
            playerek.getPlayerNext(playerek.playerekFelhasznált[x-1]);
            aplayer.innerHTML=playerek.playerekFelhasznált[x-1].jel;
            aplayer.removeAttribute('class');
            aplayer.classList.add(playerek.playerekFelhasznált[x-1].szin);
            aplayer.classList.add(`aplayer${x}`);
            aplayer.classList.add("jelek");
        }
        var minuszbotton=document.querySelector(".minuszbotton");
        //minuszbotton.style.display = "block";
        minuszbotton.style.visibility = "visible";
    }

    function tableMeretPluszMinuszOnclickInit(){
        document.getElementById("pluszx").onclick=()=>{
            var x = Number(document.getElementById("xkoord").innerHTML);
            if(x!==26){
                x++;
            }
            document.getElementById("xkoord").innerHTML=x;
        }
        document.getElementById("minuszx").onclick=()=>{
            var x = Number(document.getElementById("xkoord").innerHTML);
            if(x!==5){
                x--;
            }
            document.getElementById("xkoord").innerHTML=x;
        }
        document.getElementById("pluszy").onclick=()=>{
            var y = Number(document.getElementById("ykoord").innerHTML);
            if(y!==26){
                y++;
            }
            document.getElementById("ykoord").innerHTML=y;
        }
        document.getElementById("minuszy").onclick=()=>{
            var y = Number(document.getElementById("ykoord").innerHTML);
            if(y!==5){
                y--;
            }
            document.getElementById("ykoord").innerHTML=y;
        }
    }

    var allapot=true;
    var options=document.querySelector(".options");
    options.onclick=(e)=>{
    if(allapot){
        document.querySelector(".secondpart").classList.remove("hatra");
        document.querySelector(".firstpart").classList.add("hatra");
        e.target.innerHTML='Save';
        document.querySelector(".restart").classList.add("jobbra");
        allapot=false;
    }else{
        document.querySelector(".firstpart").classList.remove("hatra");
        document.querySelector(".secondpart").classList.add("hatra");
        allapot=true;
        e.target.innerHTML='Options';
        document.querySelector(".restart").classList.remove("jobbra");

        var x=Number(document.getElementById("xkoord").innerHTML);
        var y=Number(document.getElementById("ykoord").innerHTML);
        tabla.x=x;
        tabla.y=y;
        tabla.tablamake(playerek);
        gyoker.style.height = 50*y+"px";
        gyoker.style.width = 50*x+"px";
    }
}
}


// döntetlen kiírása
// playerre kattintva név csere
// playerek számának jelzése
// abcd.... 1234... oszlop/sorok

szinek=["black","blue","red","green","yellow","orange","pink","brown"];
jelek=['O','X'];
idk=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
playerek=new Playerek(szinek,jelek,idk);



restart=document.querySelector(".restart");
next=document.getElementById("nextplayer");
gyoztes=document.getElementById("gyoztes");
gyoker=document.querySelector(".tabla");
tabla=new Tabla(10,10,50,gyoker,gyoztes,next,restart);//(x,y,pxegység,hova?)
gyoker.style.height = "500px";
gyoker.style.width = "500px";
tabla.tablamake(playerek);



section2init2player();




