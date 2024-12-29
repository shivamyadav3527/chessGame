const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece=null;
let sourceSquare= null;
let playerRole= null;

const renderBoard= () => {
    const board = chess.board();
    boardElement.innerHTML="";
    board.forEach((row, rowindex) => {
        row.forEach((square, columnindex) => {            
            const squareElement = document.createElement("div");
            squareElement.classList.add("square",
                (rowindex+columnindex)%2 === 0 ? "light" : "dark"
            );
            squareElement.dataset.row = rowindex;
            squareElement.dataset.col = columnindex;
            if(square) {
                const peiceElement= document.createElement("div");
                peiceElement.classList.add("peice", square.color === 'w' ? "white" : "black");

                if(square.color === 'w' && square.type === 'p'){
                    let hakuna = 'P'
                
                    peiceElement.innerHTML= getPieceUnicode(hakuna);
                } else if(square.color === 'w' && square.type === 'b'){
                    let hakuna = 'B'
                
                    peiceElement.innerHTML= getPieceUnicode(hakuna);
                } else if(square.color === 'w' && square.type === 'q'){
                    let hakuna = 'Q'
                
                    peiceElement.innerHTML= getPieceUnicode(hakuna);
                } else if(square.color === 'w' && square.type === 'k'){
                    let hakuna = 'K'
                
                    peiceElement.innerHTML= getPieceUnicode(hakuna);
                } else if(square.color === 'w' && square.type === 'r'){
                    let hakuna = 'R'
                
                    peiceElement.innerHTML= getPieceUnicode(hakuna);
                } else if(square.color === 'w' && square.type === 'n'){
                    let hakuna = 'N'
                
                    peiceElement.innerHTML= getPieceUnicode(hakuna);
                } else {
                    peiceElement.innerHTML= getPieceUnicode(square.type);

                }

                peiceElement.draggable = square.color === playerRole

                peiceElement.addEventListener("dragstart", (e) => {
                    if(peiceElement.draggable) {
                        draggedPiece = peiceElement;
                        sourceSquare = {row: rowindex, col: columnindex};
                        e.dataTransfer.setData("text/plain", "");
                    }
                })

                peiceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                    
                });

                squareElement.append(peiceElement);
            }

            squareElement.addEventListener("dragover", (e) => {
                e.preventDefault();
            })

            squareElement.addEventListener("drop", (e) => {
                e.preventDefault();
                if(draggedPiece){
                    const targetSource = {row: parseInt(squareElement.dataset.row),
                         col: parseInt(squareElement.dataset.col)
                        }
                    handleMove(sourceSquare, targetSource);
                }
            })
            boardElement.append(squareElement);
        })
    })
    
}

const handleMove= () => {

}

const getPieceUnicode = (type) => {
    const unicodePieces = {
        p: "♟", // Black Pawn
        r: "♜", // Black Rook
        n: "♞", // Black Knight
        b: "♝", // Black Bishop
        q: "♛", // Black Queen
        k: "♚", // Black King
        P: "♙", // White Pawn
        R: "♖", // White Rook
        N: "♘", // White Knight
        B: "♗", // White Bishop
        Q: "♕", // White Queen
        K: "♔", // White King
    };
    console.log(type);

    return unicodePieces[type] || "";
};

renderBoard();