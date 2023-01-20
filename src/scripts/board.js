export function initBoard(numGuesses, level, hidden = false) {
    let board;
    if (level === 1) {
        board = document.getElementById("game-board-lvl-1");
    } else if (level === 2) {
        board = document.getElementById("game-board-lvl-2");
    } else {
        board = document.getElementById("game-board-lvl-3");
    }

    // remove any children elements of the game board
    // in case the game is being reset
    if (board.children) {
        Array.from(board.children).forEach(child => {
            child.remove();
        })
    }

    let numBoards = 2 ** (level - 1);
    let boardTracker = 1;
    while(numBoards > 0) {
        let grid = document.createElement("div");
        grid.id = `grid-${boardTracker}`;
        for (let i = 0; i < numGuesses; i++) {
            let row = document.createElement("div");
            row.className = "letter-row";
            
            for (let j = 0; j < 5; j++) {
                let box = document.createElement("div");
                if (hidden) {
                    box.className = "hidden-letter-box";
                } else {
                    box.className = "letter-box";
                }
                row.appendChild(box);
            }
            grid.appendChild(row);
        }
        board.appendChild(grid);
        numBoards -= 1;
        boardTracker += 1;
    }
}