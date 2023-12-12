var turn = document.querySelector("body").getAttribute("turn");
const vsAI = document.querySelector("body").getAttribute("vsai") === "true";
var checker = 0;
function changeTurn() {
  console.log("============" + turn + "'s turn ended ==========");
  if (turn === "white") {
    document.querySelector("body").setAttribute("turn", "black");
    turn = "black";
  }
  else {
    document.querySelector("body").setAttribute("turn", "white");
    turn = "white";
  }
  const pieces = document.getElementsByClassName("piece-img");

  if (!vsAI) {
    if (checker === 1) {
      removeClass("checked");
      checker = 0;
    }
    // check for check
    var possibleCheckMoves;
    if (turn === "black") {
      possibleCheckMoves = findAllMoves("white")[1];
    } else {
      possibleCheckMoves = findAllMoves("black")[1];
    }
    const checkMoveKeys = Object.keys(possibleCheckMoves);
    var doesCheck = [];
    for (var i = 0; i < checkMoveKeys.length; i++) {
      for (var k = 0; k < possibleCheckMoves[checkMoveKeys[i]].length; k++) {
        if (document.getElementById(possibleCheckMoves[checkMoveKeys[i]][k]).firstElementChild.id.slice(9, -4) === "king") {
          doesCheck.push(checkMoveKeys[i]);
        }
      }
    }
    if (doesCheck.length > 0) {
      checker = 1;
      console.log("these pieces put the  king in check", doesCheck);
      doesCheck.forEach(function (id) {
        var element = document.getElementById(id);
        if (element) {
          element.classList.add("checked");
        }
      });
    }
    //switch draggable pieces
    for (var i = 0; i < pieces.length; i++) {
      console.log(pieces[i].id.slice(3,8));
      if (pieces[i].id.slice(3,8) === turn) {
          pieces[i].setAttribute("draggable", "true");
      } else {
        pieces[i].setAttribute("draggable", "false");
      }
    }
  } else { // VS AI
    for (var i = 0; i < pieces.length; i++) {
      pieces[i].setAttribute("draggable", "false");
    }
    if (turn === "black") { // can update to be not player color if player can choose color
      // checks for check
      if (checker === 1) {
        removeClass("checked");
        checker = 0;
      }
      // check for check
      var possibleCheckMoves;
      if (turn === "black") {
        possibleCheckMoves = findAllMoves("white")[1];
      } else {
        possibleCheckMoves = findAllMoves("black")[1];
      }
      var checkMoveKeys = Object.keys(possibleCheckMoves);
      var doesCheck = [];
      for (var i = 0; i < checkMoveKeys.length; i++) {
        for (var k = 0; k < possibleCheckMoves[checkMoveKeys[i]].length; k++) {
          if (document.getElementById(possibleCheckMoves[checkMoveKeys[i]][k]).firstElementChild.id.slice(9, -4) === "king") {
            doesCheck.push(checkMoveKeys[i]);
          }
        }
      }
      if (doesCheck.length > 0) { // add highlight to checking pieces
        checker = 1;
        console.log("these pieces put the  king in check", doesCheck);
        doesCheck.forEach(function (id) {
          var element = document.getElementById(id);
          if (element) {
            element.classList.add("checked");
          }
        });
      }

      aiTurn("black"); // add parameter for checking pieces
      // check the check here
      removeClass("checked"); // reset the highlighted pieces
      console.log(turn + "'s turn ended");
      for (var i = 0; i < pieces.length; i++) {
        if (pieces[i].id.slice(3,8) === "white") {
            pieces[i].setAttribute("draggable", "true");
        }
      }
      // checks for check
      possibleCheckMoves = findAllMoves(turn)[1];
      checkMoveKeys = Object.keys(possibleCheckMoves);
      var doesCheck = [];
      for (var i = 0; i < checkMoveKeys.length; i++) {
        for (var k = 0; k < possibleCheckMoves[checkMoveKeys[i]].length; k++) {
          if (document.getElementById(possibleCheckMoves[checkMoveKeys[i]][k]).firstElementChild.id.slice(9, -4) === "king") {
            doesCheck.push(checkMoveKeys[i]);
          }
        }
      }
      console.log("these pieces put the player's king in check", doesCheck);
      //highlight those pieces
      turn = "white"
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
  removeClass("movable");
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

function removeClass(classToRemove){
  //remove the movable class to return to original color
  var elementsArray = document.querySelectorAll("."+classToRemove);
  elementsArray.forEach(function (element) {
    element.classList.remove(classToRemove);
  });
}

function canMoveTo(piece, place, color) {
  var movableSpaces = [];// list of spacese that the piece can be moved to
  if (piece =="black-pawn") {
    if (place[0] === "H"){
    } else {
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
    if (place[0] === "A") {
    } else {
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

function findAllMoves(color) {
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
  return [moves, captureMoves]; //returns all the moves that all the pieces matching the color parameter and all the moves that involve a capture
}

function aiTurn(color) {
  const results = findAllMoves(color);
  var moves = results[0];
  var captureMoves = results[1];
  console.log(moves, captureMoves);
  // find the highest weight trade.
  var mostPoints = -9;
  var bestMove = [];
  console.log("checker?", checker);
  if (checker === 1) {
    const checks = document.querySelectorAll(".checked").firstElementChild;
    console.log(checks);
    
  }
  const captureKeys = Object.keys(captureMoves); 
  if (captureKeys.length > 0) {
    for (var i = 0; i < captureKeys.length; i++) { //loop through the pieces that can capture
      //console.log(captureKeys[i], captureMoves[captureKeys[i]], captureMoves[captureKeys[i]][0], document.getElementById(captureMoves[captureKeys[i]][0]).firstElementChild.id);
      var bestWeightForPiece = weights[document.getElementById(captureMoves[captureKeys[i]][0]).firstElementChild.id.slice(9, -4)];
      var bestMoveForPiece = captureMoves[captureKeys[i]][0];
      //console.log(bestMoveForPiece, bestWeightForPiece);
      for (var k = 1; k < captureMoves[captureKeys[i]].length; k++) { //loop through the capturable pieces by a specific piece
        if (weights[document.getElementById(captureMoves[captureKeys[i]][k]).firstElementChild.id.slice(9, -4)] >= bestWeightForPiece) { // check if it is a better trade
          bestWeightForPiece = weights[document.getElementById(captureMoves[captureKeys[i]][k]).firstElementChild.id.slice(9, -4)];
          bestMoveForPiece = captureMoves[captureKeys[i]][k];
        }
        // add check for if points are equal
      }
      console.log();
      if (bestWeightForPiece - weights[document.getElementById(captureKeys[i]).firstElementChild.id.slice(9,-4)] > mostPoints) { // check if the best move for the specific piece is the best move so far
        mostPoints = bestWeightForPiece - weights[document.getElementById(captureKeys[i]).firstElementChild.id.slice(9,-4)];
        //console.log(captureKeys[i], bestMoveForPiece);
        bestMove = [captureKeys[i], bestMoveForPiece];
      }
    }
  }
  console.log("best move is worth ", mostPoints, "and is: ", bestMove);
// if no positive moves are available, move a random piece
  if (bestMove.length === 0) {
    var moveKeys = Object.keys(moves);
    moveKeys = moveKeys.filter( (key) => moves[key].length !== 0); //remove the keys that do not have a move
    //console.log(moves, moveKeys);
    const randomPiece = Math.floor(Math.random() * moveKeys.length);
    const randomMove = Math.floor(Math.random() * moves[moveKeys[randomPiece]].length);
    console.log(randomPiece, randomMove);
    bestMove = [moveKeys[randomPiece], moves[moveKeys[randomPiece]][randomMove]];
    //console.log(bestMove);
  } 
  var from = document.getElementById(bestMove[0]).firstElementChild;
  var to = document.getElementById(bestMove[1]);
  from.parentNode.classList.remove("is-piece");
  from.parentNode.classList.add("not-piece");
  // Check if the bucket already has an image
  if (to.childElementCount > 0) {
    // Replace the existing image
    const bucketChild = to.firstChild;
    //console.log(to, bucketChild);
    to.removeChild(to.firstChild);
    //console.log(to);
    //console.log(from);
    addPieceToTakenSide(bucketChild);
  }
  // Append the dragged image to the bucket
  to.appendChild(from);
  from.setAttribute("id", bestMove[1] +"_"+ from.id.slice(3,from.id.length));
  to.classList.remove("not-piece");
  to.classList.add("is-piece");
}