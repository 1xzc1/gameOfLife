class Game {
    constructor() {
        this.cellSize = 4;
        this.cellSpace = 1;
        this.deadColor = `white`;
        this.aliveColor = `green`;
        this.cellsInColumn = 100;
        this.cellsInRows = 100;
        this.activeArray = [];
        this.mouseDown = false;
        this.lastX = 0;
        this.lastY = 0;
        this.width = 0;
        this.height = 0;

        this.arrayInitialization = () => {

            for (let i = 0; i < this.cellsInRows; i++) {
                this.activeArray[i] = [];
                for (let j = 0; j < this.cellsInColumn; j++) {
                    this.activeArray[i][j] = 0;
                }
            }
        };

        this.arrayRandomize = () => {
            for (let i = 0; i < this.cellsInRows; i++) {
                for (let j = 0; j < this.cellsInColumn; j++) {
                    this.activeArray[i][j] = (Math.random() > 0.5) ? 1 : 0;
                }
            }
        };

        this.fillArray = () => {
            let color, x, y;

            ctx.fillStyle = 'lightgrey';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < this.cellsInRows; i++) {
                for (let j = 0; j < this.cellsInColumn; j++) {
                    if (this.activeArray[i][j] === 1) {
                        color = this.aliveColor;
                    } else {
                        color = this.deadColor;
                    }

                    ctx.fillStyle = color;
                    x = this.cellSpace + (this.cellSpace * j) + (this.cellSize * j);
                    y = this.cellSpace + (this.cellSpace * i) + (this.cellSize * i);
                    ctx.fillRect(x, y, this.cellSize, this.cellSize);
                }
            }
        };

        this.setCellValueHelper = (row, col) => {
                if (col === -1 ) {
                    col = this.cellsInColumn - 1
                } else if (col === this.cellsInColumn ) {
                    col = 0
                }
                 if (row === -1 ) {
                     row = this.cellsInRows - 1
                 } else if (row === this.cellsInRows) {
                     row = 0
                 }
                return this.activeArray[row][col];
        };

        this.countNeighbours = (row, col) => {
            let neighbours = 0;
            neighbours += this.setCellValueHelper(row - 1, col - 1);
            neighbours += this.setCellValueHelper(row - 1, col);
            neighbours += this.setCellValueHelper(row - 1, col + 1);
            neighbours += this.setCellValueHelper(row, col - 1);
            neighbours += this.setCellValueHelper(row, col + 1);
            neighbours += this.setCellValueHelper(row + 1, col - 1);
            neighbours += this.setCellValueHelper(row + 1, col);
            neighbours += this.setCellValueHelper(row + 1, col + 1);
            return neighbours;
        };

        this.updateCellValue = (row, col) => {
            const neighbours = this.countNeighbours(row, col);
            if (this.activeArray[row][col] === 0 && neighbours === 3) {
                return 1;
            } else if (this.activeArray[row][col] === 1 && (neighbours === 2 || neighbours === 3)) {
                return 1;
            } else if (neighbours > 3 || neighbours < 2) {
                return 0;
            } else {
                return this.activeArray[row][col];
            }
        };

        this.updateLifeCycle = () => {
            let arr = [];
            for (let i = 0; i < this.cellsInRows; i++) {
                    arr[i] = [];
                for (let j = 0; j < this.cellsInColumn; j++) {
                    arr[i][j] = this.updateCellValue(i, j);
                }
            }
            this.activeArray = arr;
        };

        this.setGameField = () => {
            this.width = this.width + (this.cellSpace * this.cellsInColumn) + (this.cellSize * this.cellsInColumn);
            canvas.setAttribute('width', this.width);

            this.height = this.height + (this.cellSpace * this.cellsInRows) + (this.cellSize * this.cellsInRows);
            canvas.setAttribute('height', this.height);
        }

        this.gameSetUp = () => {
            this.arrayInitialization();
        };

        this.gameStep = () => {
            this.runGame();
        };

        this.random = () => {
            this.arrayRandomize()
            this.fillArray()
        };

        this.init = () => {
            this.fillArray();
        };

        this.clear = () => {
            this.arrayInitialization();
            this.init();
        }

        this.runGame = () => {
            this.updateLifeCycle();
            this.fillArray();
        };

        this.canvasMouseDown = (event) => {
            let position = this.mousePosition(event);
            this.switchCell(position[0], position[1]);
            this.lastX = position[0];
            this.lastY = position[1];
            this.mouseDown = true;
        }

        this.switchCell = (i, j) => {
            if(this.activeArray[i][j] === 1) {
                this.activeArray[i][j] = 0;
            }else {
                this.activeArray[i][j] = 1;
            }
            this.fillArray()
        }

        this.canvasMouseUp = () => {
            this.mouseDown = false;
        }

        this.canvasMouseMove = (event) => {
            if (this.mouseDown) {
                let position = this.mousePosition(event);
                if ((position[0] !== this.lastX) || (position[1] !== this.lastY)) {
                    this.switchCell(position[0], position[1]);
                    this.lastX = position[0];
                    this.lastY = position[1];
                }
            }
        }

        this.mousePosition = (e) => {
            let event, x, y,
                domObject,
                posx = 0,
                posy = 0,
                top = 0,
                left = 0,
                cellSize = this.cellSize + this.cellSpace;

            event = e;
            if (!event) {
                event = window.event;
            }

            if (event.pageX || event.pageY) 	{
                posx = event.pageX;
                posy = event.pageY;
            } else if (event.clientX || event.clientY) 	{
                posx = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            domObject = event.target || event.srcElement;

            while ( domObject.offsetParent ) {
                left += domObject.offsetLeft;
                top += domObject.offsetTop;
                domObject = domObject.offsetParent;
            }

            domObject.pageTop = top;
            domObject.pageLeft = left;

            y = Math.ceil(((posx - domObject.pageLeft)/cellSize) -1 );
            x = Math.ceil(((posy - domObject.pageTop)/cellSize) -1);

            return [x, y];
        }

    }
}
