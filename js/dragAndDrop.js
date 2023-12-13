function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    //console.log(ev.target);
    var dragParentDiv = ev.target.parentNode;
    ev.dataTransfer.setData("text", ev.target.id);
    ev.dataTransfer.setData("parentid", dragParentDiv.id)
    //updateParentIsNotPiece(dragParentDiv);
  }
  
  function drop(ev) {

    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var piece = document.getElementById(data);
    //console.log("*************************************");
    //console.log(ev.target);
    var item =  ev.target.firstElementChild; // element being dropped onto. If there is no piece, it is a div, if there is a piece there, it's ap piece
    console.log(item);
    if (item){
      console.log(item);
      var sittingItem = ev.target;
      var sittingItemId = ev.target.id;
      let newParentDiv = sittingItem.parentNode;
      if (newParentDiv.getAttribute("class") === "grid"){
        console.log("Skipping Drop onto undroppable area");
        return;
      }
      document.getElementById(sittingItemId).remove();
      if (sittingItemId.indexOf(".png") > -1){
        console.log("Piece was likely dropped onto another piece");
        addPieceToTakenSide(sittingItem);
        current_piece = ev.target.removeChild(item);
        newParentDiv.appendChild(current_piece); // the div we are dropping onto
      }
      return;
    }

    try {
      ev.target.appendChild(piece);
    } catch (error) {
      console.log("Unable to drag onto the same location!");
      return;
    }
    
    var newId = ev.target.id.slice(0,2) + "_" + data.slice(3,data.length - 4) + ".png";
    console.log("Setting " + newId);
    piece.setAttribute("id",newId);

    let oldParentId=ev.dataTransfer.getData("parentid");
    updateParentIsNotPiece(document.getElementById(oldParentId), ev.target);

  }


  function updateParentIsNotPiece(oldParentNode, newParentNode){
    if (oldParentNode === newParentNode){
      console.log("how did you get in here?");
    }
    if (!!oldParentNode){
      negateClass(oldParentNode)
    }
    if (!!newParentNode){
      negateClass(newParentNode);
    }
  }

  function negateClass(node){
    var parentClass = node.className.split(" ");
    if (parentClass[0] == "not-piece"){
      var newClass = "is-piece " + parentClass[1];
    }
    if (parentClass[0] == "is-piece"){
      var newClass = "not-piece " + parentClass[1];
    }
    node.className = newClass;
  }

  function addPieceToTakenSide(piece){
    let takenColor = getPieceColor(piece.id); //Dictates side
    piece.setAttribute("draggable", false) //Don't want to allow dragging while it's in the side
    if (takenColor === "black"){
        document.getElementsByClassName("boardleft")[0].appendChild(piece);
    }
    else{
      document.getElementsByClassName("boardright")[0].appendChild(piece);
    }
  }

  function getPieceColor(piece){
    return piece.id.split("-")[0].substring(3);
  }