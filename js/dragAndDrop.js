function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    console.log(ev.target);
    ev.dataTransfer.setData("text", ev.target.id);
    const place = [ev.target.id.slice(0,1),ev.target.id.slice(1,2)];
    const piece = ev.target.id.slice(3,ev.target.id.length - 4);
    console.log(piece, " ", place[0]+place[1]);
    var movableSpaces = [];// list of spacese that the piece can be moved to

    if (piece =="black-pawn") {
      if (/B[0-8]/.test(place[0]+place[1])) { // check if pawn has moved
        movableSpaces = [String.fromCharCode(place[0].charCodeAt(0)+1)+place[1],
          String.fromCharCode(place[0].charCodeAt(0)+2)+place[1]];
      }
      else {
        movableSpaces = [String.fromCharCode(place[0].charCodeAt(0)+1)+place[1]];
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
      console.log("black-pawn");
      if (/G[1-8]/.test(place[0]+place[1])) { // check if pawn has moved
        // list of spaces that the piece can be moved to
        var movableSpaces = [String.fromCharCode(place[0].charCodeAt(0)-1)+place[1],
          String.fromCharCode(place[0].charCodeAt(0)-2)+place[1]];
        console.log(movableSpaces);
      }
      else {
        var movableSpaces = [String.fromCharCode(place[0].charCodeAt(0)-1)+place[1]];
        console.log(movableSpaces);
      }
    }
    console.log(movableSpaces);
    //remove non-real spaces such as "@3" or "I5"
    for (let i = 0; i < movableSpaces.length; i++) {
      if (!(/^[A-H][1-8]$/.test(movableSpaces[i]))) {
          movableSpaces.splice(i,1);
          i--;
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
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("data -> " + data);
    //console.log(ev)
    //console.log(ev.target);
    //console.log(ev.srcElement);
    //console.log(ev.toElement);
    
    var item =  ev.target.firstElementChild; //final location
    if (item){

      //console.log("###################################");
      var sittingItem = ev.target;
      //console.log("***");
      //console.log(ev.target)
      //console.log("***");

      var sittingItemId = ev.target.id;
      //console.log("sitting item ");
      //console.log(sittingItem);
      //console.log("parent div");
      let parentDiv = sittingItem.parentNode;
      //console.log(parentDiv);
      if (parentDiv.getAttribute("class") === "grid"){
        console.log("Skipping Drop onto undroppable area");
        //remove the movable class to return to original color
        var elementsArray = document.querySelectorAll(".movable");
        elementsArray.forEach(function (element) {
          element.classList.remove("movable");
        });
        return;
      }
      document.getElementById(sittingItemId).remove();
      //console.log("###################################");
      //console.log(sittingItemId.indexOf(".png"));
      
      if (sittingItemId.indexOf(".png") > -1){
            console.log("Piece was likely dropped onto another piece");
            current_piece = ev.target.removeChild(item);
            parentDiv.appendChild(current_piece);
      }

      //console.log(current_piece);
      //ev.target.parent.appendChild(document.getElementById(data));
      return;
    }
    console.log(data);
    console.log(ev.target);
    if (ev.target.classList.contains("movable")) {
      ev.target.appendChild(document.getElementById(data));
      document.getElementById(data).setAttribute("id",ev.target.id.slice(0,2) + "_" + data.slice(3,data.length - 4) + ".png");
    }
    //remove the movable class to return to original color
    var elementsArray = document.querySelectorAll(".movable");
    elementsArray.forEach(function (element) {
      element.classList.remove("movable");
    });
  }
