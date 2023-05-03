const canvas = document.querySelector("#gamefield")
const ctx = canvas.getContext("2d")

const game = new Game()
game.setGameField();
game.gameSetUp();

window.onload = () => {
    let interval;

    game.init();

    document.querySelector("#start-random").addEventListener("click", () => {
        game.arrayRandomize();
        game.fillArray();
        clearInterval(interval);
        interval = setInterval(game.runGame, 100);
    })

    document.querySelector("#stop").addEventListener("click", () => {
        clearInterval(interval);
        game.gameSetUp();
    })

    document.querySelector("#step").addEventListener("click", () => {
        game.gameStep();
    })

    document.querySelector("#random").addEventListener("click", () => {
        game.random();
    })

    document.querySelector("#clear").addEventListener("click", () => {
        game.clear();
    })

    document.querySelector("#start").addEventListener("click", () => {
        interval = setInterval(game.runGame, 100);
    })

    canvas.addEventListener( 'mousedown', () => {
        game.canvasMouseDown();
    });
    document.addEventListener( 'mouseup', () => {
        game.canvasMouseUp();
    });
    canvas.addEventListener( 'mousemove', () => {
        game.canvasMouseMove();
    });
}


