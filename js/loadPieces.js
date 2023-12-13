
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
        if (k % 2 === 1) {
            for (var l = 0; l < 8; l++){
                if (l % 2 == 0){
                    addBlankSpaceToGrid("dee", row + (l + 1).toString());
                }
                else{
                    addBlankSpaceToGrid("you", row + (l + 1).toString());
                }
            }
        }
        else {
            for (var l = 0; l < 8; l++){
                if (l % 2 == 0){
                    addBlankSpaceToGrid("you", row + (l + 1).toString());
                }
                else{
                    addBlankSpaceToGrid("dee", row + (l + 1).toString());
                }
            }
        }
    }
    addPawns("white");
    addChessPieces("white");
}

function addPieceToGrid(className, color, piece, id){
    if (color === "white") { //black pieces start out as non-draggable
        document.getElementsByClassName("grid")[0].innerHTML += `<div class="is-piece ` +  className + `" id="` + id + `" ondragover="allowDrop(event)" ondrop="drop(event, '`+id+`')"><img id="`+  id + `_` + color + `-` + piece + `.png" class='piece-img' width="50px" height="50px" src="images/AIGenerated-pieces/` + color + `-` + piece + `.png" draggable="true" ondragstart="drag(event)" >`;
    } else {
        document.getElementsByClassName("grid")[0].innerHTML += `<div class="is-piece ` +  className + `" id="` + id + `" ondragover="allowDrop(event)" ondrop="drop(event, '`+id+`')"><img id="`+  id + `_` + color + `-` + piece + `.png" class='piece-img' width="50px" height="50px" src="images/AIGenerated-pieces/` + color + `-` + piece + `.png" draggable="false" ondragstart="drag(event)" >`;
    }

    }

function addBlankSpaceToGrid(className, id){
    document.getElementsByClassName("grid")[0].innerHTML += `<div class="not-piece ` + className + `" id="` + id + `" ondragover="allowDrop(event)" ondrop="drop(event, '`+id+`')">`; 
}

function addPawns(color){
    for (var j = 0; j < 8; j++){
        if (color == "black") {
            if (j % 2 == 0){
                addPieceToGrid("dee", color, "pawn", 'B' + (j+1).toString());
            }
            else {
                addPieceToGrid("you", color, "pawn", 'B' + (j+1).toString());
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
                addPieceToGrid("dee", color, pieces[i], 'H' + (i+1).toString());
            }
            else {
                addPieceToGrid("you", color, pieces[i], 'H' + (i+1).toString());
            }
        }
    }
}

function getPieceLocations(){
    return document.getElementsByClassName("grid")[0].children;
}

