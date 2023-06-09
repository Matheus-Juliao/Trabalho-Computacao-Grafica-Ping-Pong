function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent('canvas-container');
  }
  
  function draw() {
    background(220);
    ellipse(width / 2, height / 2, 200, 200);
  }
  
  function carregarAplicacao() {
    const canvasContainer = document.getElementById('canvas-container');
    canvasContainer.innerHTML = ''; // Limpa o conteúdo anterior, se houver
    
    new p5();
  }




// function load() {
//     let screen = document.getElementById('screen');
//     screen.style.display = 'none';

//     let script = document.createElement('script');
//     script.src = 'sketch.js';
//     document.body.appendChild(script);
// }