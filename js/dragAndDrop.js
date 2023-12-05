function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    //console.log(ev.target);
    var dragParentDiv = ev.target.parentNode;
    //console.log("*************");
    //console.log(dragParentDiv.className);
    ev.dataTransfer.setData("text", ev.target.id);
    updateParentIsNotPiece(dragParentDiv);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var piece = document.getElementById(data);

    var item =  ev.target.firstElementChild; // element being dropped onto. If there is no piece, it is a div, if there is a piece there, it's ap piece


    if (item){
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
            //updateParentIsNotPiece(newParentDiv);
      }
      return;
    }

    updateParentIsNotPiece(ev.target);

    try {
      ev.target.appendChild(piece);
    } catch (error) {
      console.log("Unable to drag onto the same location!");
    }
    
    var newId = ev.target.id.slice(0,2) + "_" + data.slice(3,data.length - 4) + ".png";
    console.log("Setting " + newId);
    piece.setAttribute("id",newId);

  }


  function updateParentIsNotPiece(parentNode){

    if (!!parentNode){
      var parentClass = parentNode.className.split(" ");
      if (parentClass[0] == "not-piece"){
        var newClass = "is-piece " + parentClass[1];
      }
      if (parentClass[0] == "is-piece"){
        var newClass = "not-piece " + parentClass[1];
      }
      parentNode.className = newClass;
    }
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

  function getPieceColor(id){
    return id.split("-")[0].substring(3);
  }