//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;

//Velocidade da bolinha
let velocidadeXDaBolinha = 6;
let velocidadeYDaBolinha = 6;
let raio = diametro / 2;

//Variáveis Raquete
let xRaquete = 2;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//Variáveis Raquete Computador
let xRaqueteComputador = 588;
let yRaqueteComputador = 150;
let velocidadeYComputador;

//Placar do jogo
let meusPontos = 0;
let pontosComputador = 0;

//Sons do jogo
let raquetada;
let ponto;
let trilha;

//Ajuste de erro do Computador
let inicioRaquete = 15;
let fimRaquete = 75;
let acertoComputador = 45; // 45 é o centro da raquete
let erro = false;
let pontuei = false;

//configuração canvas
let canvas;

function setup() {
  createCanvas(600, 400);
  const canvasContainer = document.getElementById('canvas-container');
  if (canvasContainer !== null) {
    canvas = createCanvas(600, 400);
    canvas.parent(canvasContainer);
  } else {
    console.error("Element with id 'canvas-container' not found.");
  }
  noLoop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoComBorda();  
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  verificaColisaoComRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteComputador, yRaqueteComputador);
  movimentaRaqueteComputador();
  verificaColisaoComRaqueteComputador(xRaqueteComputador, yRaqueteComputador);
  incluiPlacar();
  marcaPonto();
}

function carregarAplicacao() {
  const canvasContainer = document.getElementById('canvas-container');
  canvasContainer.style.display = 'block'; // Exibe o contêiner ao clicar no botão
  trilha.loop();
  

  new p5(sketch, 'canvas-container');
}

const sketch = (p) => {
  p.setup = setup;
  p.draw = draw;
};

function mostraBolinha () { 
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXDaBolinha;
  yBolinha += velocidadeYDaBolinha;
}

function verificaColisaoComBorda () {
  if(xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXDaBolinha *= (-1);
    ponto.play();
  }
  
  if(yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYDaBolinha *= (-1)
  }
}

function mostraRaquete (x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaRaquete () {
  if(keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
   if(keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }  
}

function verificaColisaoComRaquete(x, y) {
  if(velocidadeXDaBolinha < 0) {
    if(xBolinha - raio < x + raqueteComprimento
     && yBolinha - raio < y + raqueteAltura 
     && yBolinha + raio > y) {
    velocidadeXDaBolinha *= -1;
    raquetada.play();
  //Fazendo a máquina errar atráves do meu acerto perfeito
      if(yBolinha > yRaquete + inicioRaquete 
         && yBolinha < yRaquete + fimRaquete) {
        ajustaErroComputador();
      }
      if(acertoComputador <= 45) {
        pontuei = false;
      }
    }
  }
}

function verificaColisaoComRaqueteComputador(x, y) {
  if(velocidadeXDaBolinha > 0) {
  if(xBolinha + raio > x
     && yBolinha - raio < y + raqueteAltura 
     && yBolinha + raio > y) {
    velocidadeXDaBolinha *= -1;
    raquetada.play();
  }
  }
}

function movimentaRaqueteComputador() {
  velocidadeYComputador = yBolinha - yRaqueteComputador - raqueteComprimento / 2 - acertoComputador;
  yRaqueteComputador += velocidadeYComputador; 
}

function incluiPlacar() {
  textAlign(CENTER);
  stroke(255);
  textSize(18);
  fill(color(255,69,0));
  rect(137.5, 5, 25, 25);
  rect(437.5, 5, 25, 25);
  fill(255);
  text(meusPontos, 150,25);
  text(pontosComputador, 450, 25)
}

function marcaPonto() {
  if(xBolinha < 8) {
    pontosComputador += 1;
  }
  
  if(xBolinha > 592) {
    meusPontos += 1;
    pontuei = true;
  }
}

function preload() {
  raquetada = loadSound("raquetada.mp3");
  ponto = loadSound("ponto.mp3");
  trilha = loadSound("trilha.mp3");
}

function ajustaErroComputador() {
  erro = true;
  if(acertoComputador < 92 && erro && !pontuei) { 
  acertoComputador += 5;
  }
  
  if(acertoComputador > 45 && pontuei) {
  acertoComputador -= 5;
  }
}

