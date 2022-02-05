






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




