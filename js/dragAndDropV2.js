var turn = document.querySelector("body").getAttribute("turn");
const vsAI = document.querySelector("body").getAttribute("vsAI");

function changeTurn() {
  aiTurn("black");
  aiTurn("white");
  console.log(turn + "'s turn ended");
    if (turn === "white") {
      document.querySelector("body").setAttribute("turn", "black");
      turn = "black";
    }
    else {
      document.querySelector("body").setAttribute("turn", "white");
      turn = "white";
    }
    const pieces = document.getElementsByClassName("piece-img");
    for (var i = 0; i < pieces.length; i++) {
      console.log(pieces[i].id.slice(3,8));
        if (pieces[i].id.slice(3,8) === turn) {
            pieces[i].setAttribute("draggable", "true");
        } else {
          pieces[i].setAttribute("draggable", "false");
        }
    }
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  const place = [event.target.id.slice(0,1),event.target.id.slice(1,2)];
  const piece = event.target.id.slice(3,event.target.id.length - 4);
  const color = event.target.id.slice(3, 8);
  //console.log(piece, " ", place[0]+place[1], " ", color);
  movableSpaces = canMoveTo(piece, place, color);
  //highlight available moves
  movableSpaces.forEach(function (id) {
    var element = document.getElementById(id);
    if (element) {
      element.classList.add("movable");
    }
  });
  event.dataTransfer.setData("text",event.target.id);
}

function drop(event, bucketID) {
  event.preventDefault();
  event.stopPropagation();
  var data = event.dataTransfer.getData("text");
  var draggedElement = document.getElementById(data);
  //console.log(bucketID);
  if (document.getElementById(bucketID).classList.contains("movable")) {
      draggedElement.parentNode.classList.remove("is-piece");
      draggedElement.parentNode.classList.add("not-piece");
      // Check if the bucket already has an image
      var bucket = document.getElementById(bucketID);
      //console.log(draggedElement,bucket);
      if (bucket.childElementCount > 0) {
        // Replace the existing image
        const bucketChild = bucket.firstChild;
        //console.log(bucket, bucketChild);
        bucket.removeChild(bucket.firstChild);
        //console.log(bucket);
        //console.log(event.target);
        addPieceToTakenSide(bucketChild);
      }
      console.log(bucketID, draggedElement.parentNode.id);
      const change = bucketID !== draggedElement.parentNode.id;
      // Append the dragged image to the bucket
      bucket.appendChild(draggedElement);
      draggedElement.setAttribute("id", bucketID +"_"+ draggedElement.id.slice(3,draggedElement.length));
      bucket.classList.remove("not-piece");
      bucket.classList.add("is-piece");
      if (change) {
        changeTurn();
      }
  }
  removeMovable();
  }
function addPieceToTakenSide(piece){
  let takenColor = piece.id.slice(3,8); //Dictates side
  //console.log(takenColor);
  piece.setAttribute("draggable", false) //Don't want to allow dragging while it's in the side
  piece.classList.remove("piece-img")
  if (takenColor === "black"){
    document.getElementsByClassName("boardleft")[0].appendChild(piece);
  }
  else{
    document.getElementsByClassName("boardright")[0].appendChild(piece);
  }
}

function removeMovable(){
  //remove the movable class to return to original color
  var elementsArray = document.querySelectorAll(".movable");
  elementsArray.forEach(function (element) {
    element.classList.remove("movable");
  });
}

function canMoveTo(piece, place, color) {
  var movableSpaces = [];// list of spacese that the piece can be moved to
  if (piece =="black-pawn") {
    //console.log(place);
    if (!document.getElementById(String.fromCharCode(place[0].charCodeAt(0)+1)+place[1]).firstElementChild) {
      movableSpaces = [String.fromCharCode(place[0].charCodeAt(0)+1)+place[1]];
      if (/B[0-8]/.test(place[0]+place[1])) { // check if pawn has moved
        if (!document.getElementById(String.fromCharCode(place[0].charCodeAt(0)+2)+place[1]).firstElementChild) {
          movableSpaces.push(String.fromCharCode(place[0].charCodeAt(0)+2)+place[1]);
        }
      }
    }
    if (place[1] < 8) {
      const moveToPieceR = document.getElementById(String.fromCharCode(place[0].charCodeAt(0)+1)+(place[1]*1 + 1).toString()).firstElementChild;
      if (moveToPieceR !== null) {
        if (moveToPieceR.id.slice(3, 8) !== color) {
          movableSpaces.push(String.fromCharCode(place[0].charCodeAt(0)+1)+(place[1]*1 + 1).toString());
        }
      }
    }
    if (place[1] > 1) {
      const moveToPieceL = document.getElementById(String.fromCharCode(place[0].charCodeAt(0)+1)+(place[1] - 1).toString()).firstElementChild;
      if (moveToPieceL !== null) {
        if (moveToPieceL.id.slice(3, 8) !== color) {
          movableSpaces.push(String.fromCharCode(place[0].charCodeAt(0)+1)+(place[1] - 1).toString());
        }
      }
    }
  }
  if (piece =="black-king" || piece == "white-king") {
    movableSpaces = [
      String.fromCharCode(place[0].charCodeAt(0))+(place[1]*1+1),
      String.fromCharCode(place[0].charCodeAt(0))+(place[1]-1),
      String.fromCharCode(place[0].charCodeAt(0)+1)+place[1],
      String.fromCharCode(place[0].charCodeAt(0)+1)+(place[1]*1+1),
      String.fromCharCode(place[0].charCodeAt(0)+1)+(place[1]-1),
      String.fromCharCode(place[0].charCodeAt(0)-1)+place[1],
      String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1]*1+1),
      String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1]-1)];
  }
  if (piece =="black-rook" || piece == "white-rook" || piece =="black-queen" || piece == "white-queen") {
    for (i = parseInt(place[1]) + 1; i < 9; i++) {
      const piece_move_to =  document.getElementById(place[0]+i.toString()).firstElementChild;
      if (piece_move_to === null) {
        movableSpaces.push(place[0]+i.toString());
      }
      else if (piece_move_to.id.slice(3,8) !== piece.slice(0,5)) {
        movableSpaces.push(place[0]+i.toString());
        break;
      }
      else if (piece_move_to.id.slice(3,8) === piece.slice(0,5)) {
        break;
      }
    }
    for (i = parseInt(place[1]) - 1; i > 0; i--) {
      const piece_move_to =  document.getElementById(place[0]+i.toString()).firstElementChild;
      if (piece_move_to === null) {
        movableSpaces.push(place[0]+i.toString());
      }
      else if (piece_move_to.id.slice(3,8) !== piece.slice(0,5)) {
        movableSpaces.push(place[0]+i.toString());
        break;
      }
      else if (piece_move_to.id.slice(3,8) === piece.slice(0,5)) {
        break;
      }
    }
    for (i = place[0].charCodeAt(0) + 1; i < 73; i++) {
      const piece_move_to =  document.getElementById(String.fromCharCode(i)+ place[1].toString()).firstElementChild;
      if (piece_move_to === null) {
        movableSpaces.push(String.fromCharCode(i)+ place[1].toString());
      }
      else if (piece_move_to.id.slice(3,8) !== piece.slice(0,5)) {
        movableSpaces.push(String.fromCharCode(i)+ place[1].toString());
        break;
      }
      else if (piece_move_to.id.slice(3,8) === piece.slice(0,5)) {
        break;
      }
    }
    for (i = place[0].charCodeAt(0) - 1; i > 64; i--) {
      const piece_move_to =  document.getElementById(String.fromCharCode(i)+ place[1].toString()).firstElementChild;
      if (piece_move_to === null) {
        movableSpaces.push(String.fromCharCode(i)+ place[1].toString());
      }
      else if (piece_move_to.id.slice(3,8) !== piece.slice(0,5)) {
        movableSpaces.push(String.fromCharCode(i)+ place[1].toString());
        break;
      }
      else if (piece_move_to.id.slice(3,8) === piece.slice(0,5)) {
        break;
      }
    }
  }
  if (piece =="black-bishop" || piece == "white-bishop" || piece =="black-queen" || piece == "white-queen") {
    for (i = parseInt(place[1]) + 1, j = place[0].charCodeAt(0) - 1; i < 9 && j > 64; i++, j--) {
      const piece_move_to =  document.getElementById(String.fromCharCode(j)+i.toString()).firstElementChild;
      if (piece_move_to === null) {
        movableSpaces.push(String.fromCharCode(j)+i.toString());
      }
      else if (piece_move_to.id.slice(3,8) !== piece.slice(0,5)) {
        movableSpaces.push(String.fromCharCode(j)+i.toString());
        break;
      }
      else if (piece_move_to.id.slice(3,8) === piece.slice(0,5)) {
        //console.log("piece color matches");
        break;
      }
    }
    for (i = parseInt(place[1]) + 1, j = place[0].charCodeAt(0) + 1; i < 9 && j < 73; i++, j++) {
      const piece_move_to =  document.getElementById(String.fromCharCode(j)+i.toString()).firstElementChild;
      if (piece_move_to === null) {
        movableSpaces.push(String.fromCharCode(j)+i.toString());
      }
      else if (piece_move_to.id.slice(3,8) !== piece.slice(0,5)) {
        movableSpaces.push(String.fromCharCode(j)+i.toString());
        break;
      }
      else if (piece_move_to.id.slice(3,8) === piece.slice(0,5)) {
        break;
      }
    }
    for (i = parseInt(place[1]) - 1, j = place[0].charCodeAt(0) - 1; i > 0 && j > 64; i--, j--) {
      const piece_move_to =  document.getElementById(String.fromCharCode(j)+i.toString()).firstElementChild;
      if (piece_move_to === null) {
        movableSpaces.push(String.fromCharCode(j)+i.toString());
      }
      else if (piece_move_to.id.slice(3,8) !== piece.slice(0,5)) {
        movableSpaces.push(String.fromCharCode(j)+i.toString());
        break;
      }
      else if (piece_move_to.id.slice(3,8) === piece.slice(0,5)) {
        break;
      }
    }
    for (i = parseInt(place[1]) - 1, j = place[0].charCodeAt(0) + 1; i > 0 && j < 73; i--, j++) {
      const piece_move_to =  document.getElementById(String.fromCharCode(j)+i.toString()).firstElementChild;
      if (piece_move_to === null) {
        movableSpaces.push(String.fromCharCode(j)+i.toString());
      }
      else if (piece_move_to.id.slice(3,8) !== piece.slice(0,5)) {
        movableSpaces.push(String.fromCharCode(j)+i.toString());
        break;
      }
      else if (piece_move_to.id.slice(3,8) === piece.slice(0,5)) {
        break;
      }
    }
  }
  if (piece =="black-knight" || piece == "white-knight") {
    movableSpaces = [
      String.fromCharCode(place[0].charCodeAt(0)+1)+(place[1]*1+2),
      String.fromCharCode(place[0].charCodeAt(0)+1)+(place[1]-2),
      String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1]*1+2),
      String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1]-2),
      String.fromCharCode(place[0].charCodeAt(0)+2)+(place[1]*1+1),
      String.fromCharCode(place[0].charCodeAt(0)+2)+(place[1]-1),
      String.fromCharCode(place[0].charCodeAt(0)-2)+(place[1]*1+1),
      String.fromCharCode(place[0].charCodeAt(0)-2)+(place[1]-1)];
  }
  if (piece =="white-pawn") {
    if (!document.getElementById(String.fromCharCode(place[0].charCodeAt(0)-1)+place[1]).firstElementChild) {
      movableSpaces = [String.fromCharCode(place[0].charCodeAt(0)-1)+place[1]];
      if (/G[0-8]/.test(place[0]+place[1])) { // check if pawn has moved
        if (!document.getElementById(String.fromCharCode(place[0].charCodeAt(0)-2)+place[1]).firstElementChild) {
          movableSpaces.push(String.fromCharCode(place[0].charCodeAt(0)-2)+place[1]);
        }
      }
    }
    if (place[1] < 8) {
      const moveToPieceR = document.getElementById(String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1]*1 + 1).toString()).firstElementChild;
      if (moveToPieceR !== null) {
        if (moveToPieceR.id.slice(3, 8) !== color) {
          movableSpaces.push(String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1]*1 + 1).toString());
        }
      }
    }
    if (place[1] > 1) {
      const moveToPieceL = document.getElementById(String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1]*1 - 1).toString()).firstElementChild;
      if (moveToPieceL !== null) {
        if (moveToPieceL.id.slice(3, 8) !== color) {
          movableSpaces.push(String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1]*1 - 1).toString());
        }
      }
    }
  }
  //console.log(movableSpaces);
  //remove non-real spaces such as "@3" or "I5" and same color pieces
  for (let i = 0; i < movableSpaces.length; i++) {
    if (!(/^[A-H][1-8]$/.test(movableSpaces[i]))) {
        movableSpaces.splice(i,1);
        i--;
    } else if (document.getElementById(movableSpaces[i]).childNodes[0]) {
      if (document.getElementById(movableSpaces[i]).childNodes[0].id.slice(3,8) === piece.slice(0,5)) { //check the color of the pieces
        movableSpaces.splice(i,1);
        i--;
      }
    }
  }
  //console.log(movableSpaces);
  return movableSpaces;
}
// point weight for the chess pieces
const weights = {
  pawn: 1,
  rook: 5,
  bishop: 3,
  knight: 3,
  king: 10,
  queen: 9
}

function aiTurn(color) {
  // pbject of pieces and where they can move
  var moves = {};
  const pieces = document.querySelectorAll(".is-piece");
  //console.log(pieces);
  var correct_color_pieces = []
  for (var i = 0; i < pieces.length; i++) {
    if (pieces[i].querySelector("img").getAttribute('id').slice(3,8) === color) {
      correct_color_pieces.push(pieces[i].getAttribute("id"));
    }
  }
  console.log(correct_color_pieces);
//loop through correct color pieces
  for (var i = 0; i < correct_color_pieces.length; i++) {
    pieceIDLong = document.getElementById(correct_color_pieces[i]).querySelector("img");
    const place = [pieceIDLong.id.slice(0,1),pieceIDLong.id.slice(1,2)];
    const piece = pieceIDLong.id.slice(3,pieceIDLong.id.length - 4);
    const color = pieceIDLong.id.slice(3, 8);
    //console.log(piece, " ", place, " ", color);
    moves[place[0]+place[1]] = canMoveTo(piece, place, color); // add this result to an image.
  }
  console.log(moves);
// make a list of pieces that black side can capture
  var captureMoves = {}; // the pieces that can be captured stored as an object where the owned pieces are the keys and the values are a list of pieces that piece can capture
  const keys = Object.keys(moves);
  for (var i = 0; i < keys.length; i++) { //loop through keys
    //console.log("checking piece:", keys[i]);
    var captures = []; //the pieces that can be captured by a piece
    for (var k = 0; k < moves[keys[i]].length; k++) { //loop through the spaces in each key
      //console.log("checking tile:", moves[keys[i]][k], document.getElementById(moves[keys[i]][k]).firstElementChild !== null, " which has ,", document.getElementById(moves[keys[i]][k]).firstElementChild);
      if (document.getElementById(moves[keys[i]][k]).firstElementChild !== null) {
        console.log(moves[keys[i]][k]);
        captures.push(moves[keys[i]][k]);
      }
    }
    //console.log(captures);
    if (captures.length > 0) {
      captureMoves[keys[i]] = captures; //add the capture moves to the object.
    }
  }
  console.log("capture moves", captureMoves);
// find the highest weight trade.
  var mostPoints = 0;
  var bestMove;
  const captureKeys = Object.keys(captureMoves); 
  if (captureKeys.length > 0) {
    var mostPoints = -1;
    var bestMove = [];
    for (var i = 0; i < captureKeys.length; i++) { //loop through the pieces that can capture
      console.log(captureKeys[i], captureMoves[captureKeys[i]], captureMoves[captureKeys[i]][0], document.getElementById(captureMoves[captureKeys[i]][0]).firstElementChild.id);
      var bestWeightForPiece = weights[document.getElementById(captureMoves[captureKeys[i]][0]).firstElementChild.id.slice(9, -4)];
      var bestMoveForPiece = captureMoves[captureKeys[i]][0];
      for (var k = 1; k < captureMoves[captureKeys[i]].length; k++) { //loop through the capturable pieces by a specific piece
        if (weights[document.getElementById(captureMoves[captureKeys[i]][k]).firstElementChild.id.slice(9, -4)] >= bestMoveForPiece) { // check if it is a better trade
          bestWeightForPiece = weights[document.getElementById(captureMoves[captureKeys[i]][k]).firstElementChild.id.slice(9, -4)];
          bestMoveForPiece = captureMoves[captureKeys[i]][k];
        }
        // add check for if points are equal
      }
      console.log();
      if (bestWeightForPiece - weights[document.getElementById(captureKeys[i]).firstElementChild.id.slice(9,-4)] > mostPoints) { // check if the best move for the specific piece is the best move so far
        mostPoints = bestWeightForPiece - weights[document.getElementById(captureKeys[i]).firstElementChild.id.slice(9,-4)];
        console.log(captureKeys[i], bestMoveForPiece);
        bestMove = [captureKeys[i], bestMoveForPiece];
      }
    }
  }
  console.log("best move is worth ", mostPoints, "and is: ", bestMove);
// if no positive moves are available. trade the lowest point trade
// if not captures. Move a pawn with higher priority on pawns towards the center.
}