function populate_grid(){

    addChessPieces("black");
    addPawns("black");

    for (var k=0; k<4; k++){
        for (var l=0; l<8; l++){
            if (l % 2 == 0){
                addBlankSpaceToGrid("you");
            }
            else{
                addBlankSpaceToGrid("dee");
            }
        }
    }
    addPawns("white");
    addChessPieces("white");

}

function addPieceToGrid(className, color, piece){
    document.getElementsByClassName("grid")[0].innerHTML += `<div class="` + className + `"><img width="70px" height="70px" src="images/pixel-pieces/` + color + `-` + piece + `.png">`; //there's only one grid
}

function addBlankSpaceToGrid(className){
    document.getElementsByClassName("grid")[0].innerHTML += `<div class="` + className + `">`;
}

function addPawns(color){
    for (var j=0; j < 8; j++){
        if (j % 2 == 0){
            addPieceToGrid("you", color, "pawn");
        }
        else {
            addPieceToGrid("dee", color, "pawn");
        }
    }
}

function addChessPieces(color){
    pieces = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
    for (var i=0; i<pieces.length; i++){
        if (i % 2 == 0){
            addPieceToGrid("you", color, pieces[i]);
        }
        else {
            addPieceToGrid("dee", color, pieces[i]);
        }
    }


}