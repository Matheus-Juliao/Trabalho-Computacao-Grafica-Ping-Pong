function load() {
    let screen = document.getElementById('screen');
    screen.style.display = 'none';

    let script = document.createElement('script');
    script.src = 'sketch.js';
    document.body.appendChild(script);
}