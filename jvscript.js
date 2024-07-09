/*Salto del dino*/
const dino = document.getElementById("dino"); 
const board = document.getElementById("board");
const gameOver = document.getElementById("gameOver");

board.addEventListener("click" , function(){
    dino.classList.add("dinoJump");  /* Le agrega la animacion del css a la clase dino en el html para que salte */
})

dino.addEventListener('animationend', ()=>{
    dino.classList.remove("dinoJump");      /* Le quita la animacion del css a la clase dino en el html para que salte */
})

/*Contador del puntaje*/
let score = 0;
let scoreInterval;

/*Funcionamiento del boton de pausa*/
const buttonPlayStop =  document.getElementById("buttonPlayStop");
const cactus = document.getElementById("cactus");

function startScore(){
    scoreInterval = setInterval(()=>{
        score++
        document.getElementById("score").innerText = score;
     }, 1000)
}

function stopScore(){
    clearInterval(scoreInterval);
}


function stopAnimation(){
    cactus.style.animationPlayState ='paused';
    dino.style.animationPlayState= 'paused';
    stopScore();
     
}

function startGame(){
    cactus.style.animationPlayState ='running';
    dino.style.animationPlayState= 'running';
    startScore()
    startCollisionDetection();
}


buttonPlayStop.addEventListener("click", ()=>{
    if(buttonPlayStop.classList.contains("play")){
        startGame()
    }else{                              /* Si al hacer click en el botton la clase "play" es verdadera,
                                           inicia el juego, del contrario lo pausa */
        stopAnimation()
    }
    buttonPlayStop.classList.toggle("play")
})

startScore() /* Iniciar contador al cargar la pag */

/* Detección de colisiones */
let collisionInterval;
let isGameOver = false;
function isColliding(dino, cactus) {
    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    const buffer = 50; // margen de colisión

            return (
                dinoRect.right - buffer > cactusRect.left &&
                dinoRect.left + buffer < cactusRect.right &&
                dinoRect.bottom - buffer > cactusRect.top &&
                dinoRect.top + buffer < cactusRect.bottom
            );
        }



function startCollisionDetection() {
    collisionInterval = setInterval(() => {
        if (isColliding(dino, cactus)) {
            gameOver.style.display = 'block';
            stopAnimation();
            isGameOver = true;
        }
    }, 50);
}

/* Evento del botón de reiniciar */


restart.addEventListener("click", restartGame);

    function restartGame() {
            score = 0;
            document.getElementById("score").innerText = score;
            dino.classList.remove("dinoJump");
            cactus.style.animation = 'none';
            cactus.offsetHeight; /* trigger reflow */
            cactus.style.animation = null;
            gameOver.style.display = 'none';
            startGame();
        }

startCollisionDetection();