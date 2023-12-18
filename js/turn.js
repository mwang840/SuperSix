var turn = "white";


function changeTurn() {
    if (turn === "white") {
        turn = "black";
    }
    else {
        turn = "white";
    }
    const pieces = document.getElementsByClassName("piece-img");
    for (var i = 0; i < pieces.length; i++) {
        if (pieces[i].id.slice(3,8) === turn) {
            piece[i].draggable = "false"
        }
    }
}