
function populate_grid(){

    addChessPieces("black");
    addPawns("black");
    for (var k = 0; k < 4; k++){
        var row = "C";
        if (k == 1) {
            row = "D";
        } else if (k == 2) {
            row = "E";
        } else if (k == 3) {
            row = "F";
        }
        for (var l = 0; l < 8; l++){
            if (l % 2 == 0){
                addBlankSpaceToGrid("you", row + (l + 1).toString());
            }
            else{
                addBlankSpaceToGrid("dee", row + (l + 1).toString());
            }
        }
    }
    addPawns("white");
    addChessPieces("white");
    movePiece();
}

function addPieceToGrid(className, color, piece, id){
    document.getElementsByClassName("grid")[0].innerHTML += `<div class="is-piece ` + className + `" id="` + id + `"><img id="`+  id + `_` + color + `-` + piece + `.png" width="70px" height="70px" src="images/pixel-pieces/` + color + `-` + piece + `.png" draggable="true" ondragstart="drag(event)" ondragover="allowDrop(event)" ondrop="drop(event)">`; //there's only one grid
    //document.getElementsByClassName("grid")[0].innerHTML += `<div class="is-piece ` + className + `" id="` + id + `" draggable="true" ondragstart="drag(event)" ondragover="allowDrop(event)" ><img width="70px" height="70px" src="images/pixel-pieces/` + color + `-` + piece + `.png" ondragover="allowDrop(event)">`; //there's only one grid
}

function addBlankSpaceToGrid(className, id){
    document.getElementsByClassName("grid")[0].innerHTML += `<div class="not-piece ` + className + `" id="` + id + `" ondragover="allowDrop(event)">`; //<img width="70px" height="70px" src="images/pixel-pieces/blank.png" ondragover="allowDrop(event)">`;
}

function addPawns(color){
    for (var j = 0; j < 8; j++){
        if (color == "black") {
            if (j % 2 == 0){
                addPieceToGrid("you", color, "pawn", 'B' + (j+1).toString());
            }
            else {
                addPieceToGrid("dee", color, "pawn", 'B' + (j+1).toString());
            }
        } else {
            if (j % 2 == 0){
                addPieceToGrid("you", color, "pawn", 'G' + (j+1).toString());
            }
            else {
                addPieceToGrid("dee", color, "pawn", 'G' + (j+1).toString());
            }
        }
    }
}

function addChessPieces(color){
    pieces = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];
    for (var i = 0; i < 8; i++){
        if (color == "black") {
            if (i % 2 == 0){
                addPieceToGrid("you", color, pieces[i], 'A' + (i+1).toString());
            }
            else {
                addPieceToGrid("dee", color, pieces[i], 'A' + (i+1).toString());
            } 
        } else {
            if (i % 2 == 0){
                addPieceToGrid("you", color, pieces[i], 'H' + (i+1).toString());
            }
            else {
                addPieceToGrid("dee", color, pieces[i], 'H' + (i+1).toString());
            }
        }
    }
}

function getPieceLocations(){
    return document.getElementsByClassName("grid")[0].children;
}