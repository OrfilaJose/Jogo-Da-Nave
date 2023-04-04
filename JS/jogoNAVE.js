var minhaNAVE=document.getElementById("naveJOGADOR");
var descricaoIMG=document.getElementById("descricaoJOGO");
var totalImagens;
var minhasImagens;
var IMGindiceAtual=0;
totalImagens=document.getElementsByTagName("img").length;
minhasImagens=document.getElementsByTagName("img");
var tamTELAw;
var tamTELAh;
var dx,dy,px,py,vel,obj,tmp;
var vidaPLANETA=300;
var minhasBOMBAS;
var totalBOMBAS;
var tiros;
var totalTIROS;
var bombasPAINEL=150;
var qtdbombas=0;
var bombasABATIDAS=0;
var bombasRESTANTES;
var ie;
var tmpCriandoBOMBAS;
var jogo;
var frames;
function carregandoIMGs(){
   minhasImagens[IMGindiceAtual].style.display="block";
   console.log("INTERVALO: "+IMGindiceAtual);
   setInterval(function(){
   	  minhasImagens[IMGindiceAtual].style.display="none";  	  
      IMGindiceAtual+=1;
       if(IMGindiceAtual==3){
       	 console.log("FIM DE INTERVALOS.");
       	 IMGindiceAtual=0;      	 
       }
       if(IMGindiceAtual==2){
       	 document.querySelector("#painel h3").style.color="black";
       	 document.querySelector("#painel p").style.color="black";
       	 document.querySelector("#painel span").style.color="black";
       }
       else{
       	 document.querySelector("#painel h3").style.color="white";
       	 document.querySelector("#painel p").style.color="white";
       	 document.querySelector("#painel span").style.color="white";
       }
       minhasImagens[IMGindiceAtual].style.display="block";
       console.log("INTERVALO: "+IMGindiceAtual);
   },9000);  
}


//Agora temos que iniciar as variáveis.
function iniciar(){
	dx=0;
	dy=0;
	vel=5;
	obj=document.getElementById("naveJOGADOR");
	indiceEXPLOSAO=0;
	tmp=setInterval(enterFrame,20);//20 millisegundos.

	//TEMOS QUE CENTRALIZAR A NAVE NA TELA:
	tamTELAw=window.innerWidth;
	tamTELAh=window.innerHeight;
	px=tamTELAw/2;
	py=tamTELAh/2;
    /*
     innerWidth -> captura a largura interna da janela.
   	 innerHeight -> captura a altura interna da janela.
   	 Largura e altura interna da janela não contam com a 
   	 barras de rolagem, menu da página.
    */
    ie=0;
    jogo=false;
		document.getElementsByClassName("vidaSingle")[0].textContent=vidaPLANETA;
		document.getElementsByClassName("vidaSingle")[0].style.fontSize=20+"px";
}
document.getElementsByClassName("btnJOGAR")[0].addEventListener("click",function(){
	jogo=true;
	console.log("CLICOU EM JOGAR.");
	minhaNAVE.style.display="block";
	descricaoIMG.style.display="none";
	carregandoIMGs();
	document.getElementById("painel").style.display="block";
	document.querySelector("#painel h3").style.color="white";
	document.querySelector("#painel p").style.color="white";
	document.querySelector("#painel span").style.color="white";
	tmpCriandoBOMBAS=setInterval(criandoBOMBAS,3000);
});

function teclaDW(){
  var tecla=event.keyCode;

  if(tecla==37){
  	 dx=-1;
  	 console.log("SETA ESQUERDA: "+tecla);
  }
  if(tecla==39){
  	 dx=1;
  	 console.log("SETA DIREITA: "+tecla);
  }
  if(tecla==38){
  	 dy=-1;
  	 console.log("SETA PARA CIMA: "+tecla);
  }
  if(tecla==40){
  	 dy=1;
  	 console.log("SETA PARA BAIXO: "+tecla);
  }
  if(tecla==32){
  	//alert("TECLA DE ESPAÇO.");
  	//O tiro deve sair da posição(x,y) em que a nave estava.
  	tirosDAnave(px,py);
  }
}
function teclaUP(){
  var tecla=event.keyCode;
  if(tecla==37){
  	 dx=0;
  	 console.log("SOLTEI A SETA ESQUERDA: "+tecla);
  }
  if(tecla==39){
  	 dx=0;
  	 console.log("SOLTEI A SETA DIREITA: "+tecla);
  }
  if(tecla==38){
  	 dy=0;
  	 console.log("SOLTEI A SETA PARA CIMA: "+tecla);
  }
  if(tecla==40){
  	 dy=0;
  	 console.log("SOLTEI A SETA PARA BAIXO: "+tecla);
  }
}

function enterFrame(){
	 px+=dx*vel;
	 py+=dy*vel;
	 if(px<=0){
    px=0;
	 }
	 if(py<=0){
	 	py=0;
	 }
	 if(px>=tamTELAw-40){
     px=tamTELAw-40;
	 }
	 if(py>=tamTELAh-40){
	 	 py=tamTELAh-40;
	 }
	 obj.style.left=px+"px";
	 obj.style.top=py+"px";
	 //console.log("POSIÇÃO X: "+px);
	 //console.log("POSIÇÃO Y: "+py);
	 direcaoTIROS();
	 caindoBOMBAS();
	 bombaCOLIDEnave(obj);
}

function tirosDAnave(x,y){
	//Estamos inserindo o audio de tiro quando clicamos na barra de espaço.
	var som=document.createElement("audio");	
	var attr2=document.createAttribute("src");
	attr2.value="Audio/tiro.wav";
	som.setAttributeNode(attr2);
	som.play();

    /*estamos criando o tiro que será disparado quando 
    clicarmos na barra de espaço.
    O tiro deve sair da posição(x,y) em que a nave estava.
    */
    var PX=x+12;
    var PY=y;
    var novaDIV=document.createElement("div");
    const attr=document.createAttribute("id");
    var attr2=document.createAttribute("class");
    attr.value="tiro";
    attr2.value="tiros";
    novaDIV.setAttributeNode(attr);
    novaDIV.setAttributeNode(attr2);
    //temos que inserir o novo elemento no body.
    document.body.appendChild(novaDIV);
       
    novaDIV.style.left=PX+"px";
    novaDIV.style.top=PY+"px";
}

function direcaoTIROS(){
  tiros=document.getElementsByClassName("tiros");
  totalTIROS=document.getElementsByClassName("tiros").length;

  for(var i=0;i<totalTIROS;i++){
	  	if(tiros[i]){
	  		var posicaoTIRO=tiros[i].offsetTop;
	  		posicaoTIRO-=vel;
	  		if(posicaoTIRO<=0){
	  			//indiceEXPLOSAO=1;
	  			//explosao(indiceEXPLOSAO,minhasBOMBAS[i].offsetLeft,minhasBOMBAS[i].offsetTop);
	  			document.body.removeChild(tiros[i]);
	  			//tiros[i].remove();
	  		}
	  		else{
	  			tiros[i].style.top=posicaoTIRO+"px";
	  			atingirBOMBAtiro(tiros[i]);
	  		}	  		
	  	}
   }
}

var idbom=0;
function criandoBOMBAS(){
	if(jogo){
		var pai=document.body;
		var bomba=document.createElement("div");
		var attr3=document.createAttribute("id");
		attr3.value="idBOMBA"+idbom;
		idbom+=1;
		var attr4=document.createAttribute("class");
		attr4.value="bombas";
		bomba.setAttributeNode(attr3);		
		bomba.setAttributeNode(attr4);
		//document.body.insertBefore(bomba, pai.children[0]);
		document.body.appendChild(bomba);//coloquei hoje.
		var posicaoX=Math.round(Math.random()*957);
		bomba.style.left=posicaoX+"px";
		//qtdbombas+=1;
		//bombasRESTANTES=bombasPAINEL-qtdbombas;
		bombasPAINEL--;
		document.querySelector("#painel p").textContent="CONTAGEM DE BOMBAS: "+bombasPAINEL;
		if(idbom==150){
			idbom=0;
		}
	}	
}

function caindoBOMBAS(){
  minhasBOMBAS=document.getElementsByClassName("bombas");
	totalBOMBAS=minhasBOMBAS.length;	
	for(var i=0; i<totalBOMBAS; i++){
		if(minhasBOMBAS[i]){			
			var posicaoBOMBA=minhasBOMBAS[i].offsetTop;
			posicaoBOMBA+=vel;
			minhasBOMBAS[i].style.top=posicaoBOMBA+"px";
			var bombaESQ=minhasBOMBAS[i].offsetLeft;
			var bombaTOP=minhasBOMBAS[i].offsetTop;
			if(minhasBOMBAS[i].offsetTop>614){
				explosao(2,bombaESQ,null);
				/*var bombaEXPLODIU=document.createElement("audio");
				var attr5=document.createAttribute("src");
				attr5.value="Audio/exp1.mp3";				
				bombaEXPLODIU.setAttributeNode(attr5);		
				bombaEXPLODIU.play();*/
				minhasBOMBAS[i].remove();
				vidaPLANETA-=10;
				//larguraVIda-=5;
				document.getElementsByClassName("vidaSingle")[0].style.width=vidaPLANETA+"px";
				document.getElementsByClassName("vidaSingle")[0].textContent=vidaPLANETA;
				if(bombasPAINEL<=0){
					telaVITORIA();
					jogo=false;
					clearInterval(tmpCriandoBOMBAS);
				}	
				if(vidaPLANETA==0){
					telaDERROTA();
					jogo=false;
				 	clearInterval(tmpCriandoBOMBAS);
				}							
			}
		}
	}
}

/*Para atingir a bomba com o tiro devemos criar uma função 
que colida o tiro com a bomba.*/
function atingirBOMBAtiro(tiro){
	
	for(var i=0;i<totalBOMBAS;i++){
      if(minhasBOMBAS[i]){
          //tenho que verificar se a posição do tiro coincide com a posição da bomba.
          if(
          	   (//verificando sentido Y.
          	     (tiro.offsetTop<=(minhasBOMBAS[i].offsetTop+40))&&//Parte de cima do tiro com parte de baixo da bomba.
          	     ((tiro.offsetTop+15)>=(minhasBOMBAS[i].offsetTop))//Parte de baixo do tiro com a parte de cima da bomba.
          	   )
          	   &&
          	   (//Verificando sentido X.
          	   	 (tiro.offsetLeft<=(minhasBOMBAS[i].offsetLeft+30))&&//Parte esquerda do tiro com a parte direita da bomba.
          	   	 ((tiro.offsetLeft+15)>=(minhasBOMBAS[i].offsetLeft))//Pare direita do tiro com a parte esquerda da bomba.
          	   )
          	){
          	  //Se retornar verdadeiro é por que houve a colisão.
          	  explosao(1,minhasBOMBAS[i].offsetLeft,minhasBOMBAS[i].offsetTop);  
          	  minhasBOMBAS[i].remove();
          	  tiro.remove();
          	  bombasABATIDAS+=1;
          	  document.querySelector("#painel span").textContent="BOMBAS ABATIDAS: "+bombasABATIDAS;
            }
        }
	}
}


/*Para inserir a explosão temos que criar uma função com três parâmetros:
 (X,Y,TIPOexplosao);
*/
 
 function explosao(tipo,x,y){
 	if(document.getElementById("explosao"+(ie-3))){
 		document.getElementById("explosao"+(ie-3)).remove();
 	}
 	var elemento=document.createElement("div");
 	var img=document.createElement("img");
 	var att1=document.createAttribute("class");
    var att2=document.createAttribute("style");
    var att3=document.createAttribute("src");
    var attX=document.createAttribute("id");
    var idSOM=document.createAttribute("id");

    attX.value="explosao"+ie;
    idSOM.value="som"+ie;
    if(tipo==1){//explosão no ar =1.
    	att1.value="explosaoAr";
    	att2.value="top:"+y+"px;left:"+x+"px;"
    	att3.value="Imagens/explosao_ar.gif?"+new Date();
    }else{//explosão no chão=2.
    	att1.value="explosaoChao";
    	att2.value="top:"+(tamTELAh-57)+"px;left:"+x+"px;";
    	att3.value="Imagens/explosao_chao.gif?"+new Date();
    }
    var somACERTO=document.createElement("audio");
    var att=document.createAttribute("src");
    att.value="Audio/exp1.mp3?"+new Date();
    somACERTO.setAttributeNode(att);
    somACERTO.setAttributeNode(idSOM);  
    img.setAttributeNode(att3);
    elemento.setAttributeNode(att1);
    elemento.setAttributeNode(att2);
    elemento.setAttributeNode(attX);   
    elemento.appendChild(img);
    document.body.appendChild(elemento);  
    somACERTO.play();
    ie++;
    //verificarVITORIA();
 }
 /*
  Os gif explosao_chao e explosao_ar so aparecem uma vez cada. Temos que usar um
  artifício para o código gerar uma nova animação das gif a cada explosão e a cada 
  tiro. Vamos enganá-lo colocando um ? depois do f de gif e um valor diferente
  para cada gif executado.
  Eu usei new Date() pois a cada gif executado terá um valor(tempo) diferente... 
  esse é o valor diferente que eu falei na ultima linha do parágrafo acima.
 */

 function gameLOOp(){
 	if(jogo){
 		enterFrame();
 		/*Coloquei entrerFrame() pois ele contem as funções caindoBOMBA() e
 		direcaoTIROS(), e dentro do enterFrame() tem os valores PX e PY que serão
 		passados para a nave.*/
 	}
 	frames=requestAnimationFrame(gameLOOp);
 }

function reiniciar(){	
	vidaPLANETA=300;
	idbom=0;
	qtdbombas=0;
	bombasABATIDAS=0;
	bombasPAINEL=150;
	tamTELAw=window.innerWidth;
	tamTELAh=window.innerHeight;
	px=tamTELAw/2;
	py=tamTELAh/2;
	obj.style.left=px+"px";
	obj.style.top=py+"px";
	jogo=true;
	clearInterval(tmpCriandoBOMBAS);
	cancelAnimationFrame(frames);
	document.getElementsByClassName("vidaSingle")[0].style.width=vidaPLANETA+"px";
	document.getElementsByClassName("vidaSingle")[0].textContent=vidaPLANETA;		
  document.querySelector("#painel span").textContent="BOMBAS ABATIDAS: "+bombasABATIDAS;       
	document.querySelector("#painel p").textContent="CONTAGEM DE BOMBAS: "+bombasPAINEL;
	tmpCriandoBOMBAS=setInterval(criandoBOMBAS,3000);
	gameLOOp();
}

function bombaCOLIDEnave(nave){
	/*
	 Temos que criar uma função para quando a bomba acertar a nave, 
	 deve ser retirado 20px de vida da nave.
	*/
	 for(var i=0; i<totalBOMBAS;i++){
	 	  if(minhasBOMBAS[i]){

	 	  	if(
		 	  		(//verificar sentido Y.
		 	  			(nave.offsetTop<=(minhasBOMBAS[i].offsetTop+40))&&//Parte de cima da nave com parte de baixo da bomba.
		 	  			((nave.offsetTop+40)>=minhasBOMBAS[i].offsetTop)//Parte de baixo da nave com a parte de cima da bomba.
		 	  		)
		 	  		&&
		 	  		(//Verificando sentido X.
		 	  			(nave.offsetLeft<=(minhasBOMBAS[i].offsetLeft+30))&&//Parte esquerda da nave com a parte direita da bomba.
		 	  			((nave.offsetLeft+40)>=minhasBOMBAS[i].offsetLeft)//Pare direita da nave com a parte esquerda da bomba.
		 	  		)
	 	  		){	  		   
  	  		    nave.style.backgroundImage="url(Imagens/nave_ini.gif)";
  	  		    //nave.style.transform="rotateX(150deg)";	  		   
		 	  		  console.log("BOMBA PASSOU POR CIMA DA NAVE.");
		 	  		  vidaPLANETA-=20;
		 	  		  minhasBOMBAS[i].remove();	 	  		  
		 	  		  document.getElementsByClassName("vidaSingle")[0].style.width=vidaPLANETA+"px";
		          document.getElementsByClassName("vidaSingle")[0].textContent=vidaPLANETA;
		          setTimeout(function(){
		          	nave.style.backgroundImage="url(Imagens/nave_jog.gif)";
		          },2000);	  	  
	 	  	  }	 	  	  	 	  	  	 	  	  
	 	  }
	 }
}

function telaDERROTA(){
	//clearInterval(intervalo); 
	var jOGARbtn=document.getElementsByClassName("btnJOGAR")[0];
	//JOGARbtn.style.backgroundColor="green";
	var tela=document.createElement("div");
	var att=document.createAttribute("id");
	att.value="derrota";
	tela.setAttributeNode(att);
	document.body.insertBefore(tela, document.body.children[0]);
	tela.appendChild(jOGARbtn);
	tela.style.display="block";

	minhasBOMBAS=document.getElementsByClassName("bombas");
	tiros=document.getElementsByClassName("tiros");
	qtdbombas=minhasBOMBAS.length;
	for(var i=0;i<qtdbombas;i++){
		if(minhasBOMBAS[i]){
			minhasBOMBAS[i].remove();			
		}		
	}

	jOGARbtn.addEventListener("click",function(){
	  clearInterval(tmp);	 
		console.log("CLICOU EM JOGAR NOVAMENTE.");
		tela.style.display="none";
		reiniciar();
	});
}

function telaVITORIA(){
	//clearInterval(intervalo); 
	var jOGARbtn=document.getElementsByClassName("btnJOGAR")[0];
	//JOGARbtn.style.backgroundColor="green";
	var tela=document.createElement("div");
	var att=document.createAttribute("id");
	att.value="vitoria";
	tela.setAttributeNode(att);
	document.body.insertBefore(tela, document.body.children[0]);
	tela.appendChild(jOGARbtn);
	tela.style.display="block";

	minhasBOMBAS=document.getElementsByClassName("bombas");
	tiros=document.getElementsByClassName("tiros");
	qtdbombas=minhasBOMBAS.length;
	for(var i=0;i<qtdbombas;i++){
		if(minhasBOMBAS[i]){
			minhasBOMBAS[i].remove();			
		}		
	}

	jOGARbtn.addEventListener("click",function(){
	  clearInterval(tmp);	 
		console.log("CLICOU EM JOGAR NOVAMENTE.");
		tela.style.display="none";
		reiniciar();
	});
}

window.addEventListener("load",iniciar);
document.addEventListener("keydown",teclaDW);
document.addEventListener("keyup",teclaUP);