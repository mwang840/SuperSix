var turn = "white";


function changeTurn() {
  console.log(turn, " is this");
    if (turn === "white") {
        turn = "black";
    }
    else {
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
    console.log(piece, " ", place[0]+place[1]);
    var movableSpaces = [];// list of spacese that the piece can be moved to

    if (piece =="black-pawn") {
      //console.log(place);
      if (!document.getElementById(String.fromCharCode(place[0].charCodeAt(0)+1)+place[1].firstElementChild) ) {
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
          if (moveToPieceR.id.slice(3, 8) !== event.target.id.slice(3, 8)) {
            movableSpaces.push(String.fromCharCode(place[0].charCodeAt(0)+1)+(place[1]*1 + 1).toString());
          }
        }
      }
      if (place[1] > 1) {
        const moveToPieceL = document.getElementById(String.fromCharCode(place[0].charCodeAt(0)+1)+(place[1] - 1).toString()).firstElementChild;
        if (moveToPieceL !== null) {
          if (moveToPieceL.id.slice(3, 8) !== event.target.id.slice(3, 8)) {
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
          console.log("piece color matches");
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
      if (!document.getElementById(String.fromCharCode(place[0].charCodeAt(0)-1)+place[1].firstElementChild) ) {
        movableSpaces = [String.fromCharCode(place[0].charCodeAt(0)-1)+place[1]];
        if (/G[0-8]/.test(place[0]+place[1])) { // check if pawn has moved
          if (!document.getElementById(String.fromCharCode(place[0].charCodeAt(0)-2)+place[1]).firstElementChild) {
            movableSpaces.push(String.fromCharCode(place[0].charCodeAt(0)-2)+place[1]);
          }
        }
      }
      if (place[1] < 8) {
        console.log(String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1] + 1).toString());
        const moveToPieceR = document.getElementById(String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1]*1 + 1).toString()).firstElementChild;
        if (moveToPieceR !== null) {
          if (moveToPieceR.id.slice(3, 8) !== event.target.id.slice(3, 8)) {
            movableSpaces.push(String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1]*1 + 1).toString());
          }
        }
      }
      if (place[1] > 1) {
        const moveToPieceL = document.getElementById(String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1]*1 - 1).toString()).firstElementChild;
        if (moveToPieceL !== null) {
          if (moveToPieceL.id.slice(3, 8) !== event.target.id.slice(3, 8)) {
            movableSpaces.push(String.fromCharCode(place[0].charCodeAt(0)-1)+(place[1]*1 - 1).toString());
          }
        }
      }
    }
    console.log(movableSpaces);
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
    console.log(movableSpaces)
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
    console.log(bucketID);
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
        if (bucketID !==draggedElement.parentNode.id) {
          changeTurn();
        }
        // Append the dragged image to the bucket
        bucket.appendChild(draggedElement);
        draggedElement.setAttribute("id", bucketID +"_"+ draggedElement.id.slice(3,draggedElement.length));
        bucket.classList.remove("not-piece");
        bucket.classList.add("is-piece");
    }
    removeMovable();
    
  }
function addPieceToTakenSide(piece){
    let takenColor = piece.id.slice(3,8); //Dictates side
    console.log(takenColor);
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
