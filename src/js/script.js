const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const boo = document.querySelector('.boo');
const gameOver = document.querySelector('.game-over');
const scoreDisplay = document.querySelector('.score');
const restartButton = document.getElementById('restartButton');
let score = 0;

const disableScroll = () => {
    // Impedir scroll em dispositivos móveis
    document.addEventListener('touchmove', preventDefault, { passive: false });
    // Impedir scroll em desktop
    document.addEventListener('wheel', preventDefault, { passive: false });
}
// Função auxiliar para cancelar o comportamento padrão do evento
const preventDefault = (event) => {
    event.preventDefault();
}
disableScroll();

const jump = () => {
    mario.classList.add('jump');
    setTimeout(()=>{
        mario.classList.remove('jump');
    }, 500)
}
scoreInterval = setInterval(() => {
    score++;
    updateScore();
}, 200);

const gameLoop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const booPosition = boo.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if(pipePosition <= 64 && pipePosition > 0 && marioPosition < 40){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        boo.style.animation = 'none';
        boo.style.left = `${booPosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.style.transform = 'scaleX(-1)';
        mario.src = "src/img/mario-gameover.png";
        mario.style.height = '64px'
        mario.style.marginLeft = '35px';

        gameOver.style.right = '-150px';

        clearInterval(gameLoop);
        clearInterval(scoreInterval);
    }
    if(booPosition <= 40 && booPosition > 0 && marioPosition > 100 ){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        boo.style.animation = 'none';
        boo.style.left = `${booPosition}px`;

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.style.transform = 'scaleX(-1)';
        mario.src = "src/img/mario-gameover.png";
        mario.style.height = '64px'
        mario.style.marginLeft = '35px';
        gameOver.style.right = '-150px';

        clearInterval(gameLoop);
        clearInterval(scoreInterval);
    }
    if (score >= 99) {
        // Aumente a velocidade quando a pontuação atingir 99
        pipe.style.animationDuration = '1.5s';
    }

    if (score >= 300) {
        // Aumente a velocidade quando a pontuação atingir 300
        pipe.style.animationDuration = '1s';
    }

    if (score >= 500) {
        // Aumente a velocidade quando a pontuação atingir 500
        pipe.style.animationDuration = '1s';
        boo.style.animation = 'boo-animation 1.95s infinite linear';
    }

    if (score >= 1000) {
        // Aumente a velocidade quando a pontuação atingir 1000
        pipe.style.animationDuration = '0.6s';
    }
}, 10);

const updateScore = () => {
    const scoreElement = document.querySelector('.score'); // Substitua '.score' pelo seletor correto
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
    }
};

const restartGame = () => {
     // Use o método `location.reload()` para recarregar a página
     location.reload();
};

// Adicione um listener para o evento touchstart no documento
document.addEventListener('touchstart', jump);

// Adiciona um ouvinte de eventos ao botão de reinício
restartButton.addEventListener('click', restartGame);