const playButton = document.getElementById("play-stop");
const mainDiv = document.getElementById("main-div");
const timer = document.getElementById("timer");
const instructions = document.getElementById("instructions");

playButton.classList.add("play-stop");

let playState = false;

const N = 19;
const cx = 180, cy = 180, r = 155;
const svg = document.getElementById('polygon-svg');
const COUNTERCOLOR = '#48a313';


const points = [];
for (let i = 0; i < N; i++) {
    // Start oben (−π/2), im Uhrzeigersinn
    const angle = (2 * Math.PI * i / N) - Math.PI / 2;
    points.push({
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle)
    });
}

// Verbindungslinien (einzeln, Farbe per CSS änderbar)
for (let i = 0; i < N; i++) {
    const next = (i + 1) % N;
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', points[i].x);
    line.setAttribute('y1', points[i].y);
    line.setAttribute('x2', points[next].x);
    line.setAttribute('y2', points[next].y);
    line.setAttribute('class', 'polygon-line');
    svg.appendChild(line);
}

// Punkte
for (let i = 0; i < N; i++) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', points[i].x);
    circle.setAttribute('cy', points[i].y);
    circle.setAttribute('r', 5);
    circle.setAttribute('class', 'polygon-dot');
    svg.appendChild(circle);
}


mainDiv.addEventListener("click", function(e){
    if(e.target.classList.contains("play-stop")){
        if(!playState){
            playState = true;
            playButton.innerHTML = "Stop";
        }else{
            playButton.innerHTML = "Start";
            playState = false;
        }
    }
});

function animateCircle(n) {
    svg.children[n].style.stroke = COUNTERCOLOR;
}

let counter = 0;
let displayCounter = 0;


function setInstructions (){
    animateCircle(counter);
    if(counter >= 0 && counter <=3){
        instructions.innerHTML = "Breathe in";
    }
    if(counter >= 4 && counter <=10){
        instructions.innerHTML = "Hold";
        if(counter == 4){
            displayCounter = 0;
        }
    }
    if(counter >= 11 && counter <=19){
        if(counter == 11){
            displayCounter = 0;
        }
        instructions.innerHTML = "Breathe out";
        if(counter == 19){
            for (let i = 0; i < N; i++) {
                svg.children[i].style.stroke = '';
            }
            displayCounter = -1;
            counter = -1;
        }
    }
    
    displayCounter++;
    counter++;
}

instructions.innerHTML = "Press Start";

setInterval(function(){
    if(playState){
        setInstructions();
       timer.innerHTML = "0" + displayCounter + "s";
    } 
},1000)

