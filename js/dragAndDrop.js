function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    //console.log(ev.target);
    var dragParentDiv = ev.target.parentNode;
    //console.log("*************");
    //console.log(dragParentDiv.className);
    ev.dataTransfer.setData("text", ev.target.id);
    upDateParentIsNotPiece(dragParentDiv);
  }
  
  function drop(ev) {
    ev.preventDefault();
    //console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%");
    var data = ev.dataTransfer.getData("text");
    var piece = document.getElementById(data);
    //console.log(piece);
    //console.log("$$$$$$$$$$$$$$$$$$$$$$$$");
    //console.log(piece.parentNode);
    var item =  ev.target.firstElementChild; // element being dropped onto. If there is no piece, it is a div, if there is a piece there, it's ap piece

    /*console.log("DEEEEEEEEEEEEZ");
    console.log(item);

    if (ev.target === piece.parentNode){
      console.log("Dropped into the same place, skipping");
      return;
    }
    console.log("DEEEEEEEEEEEEZ");*/

    if (item){
      var sittingItem = ev.target;
      console.log(ev.target)
      var sittingItemId = ev.target.id;
      let newParentDiv = sittingItem.parentNode;
      if (newParentDiv.getAttribute("class") === "grid"){
        console.log("Skipping Drop onto undroppable area");
        return;
      }
      document.getElementById(sittingItemId).remove();
      //console.log("###################################");
      //console.log(sittingItemId.indexOf(".png"));

      if (sittingItemId.indexOf(".png") > -1){
            console.log("Piece was likely dropped onto another piece");
            console.log("************************************************")
            current_piece = ev.target.removeChild(item);
            newParentDiv.appendChild(current_piece); // the div we are dropping onto
            
            upDateParentIsNotPiece(newParentDiv);
      }
      //console.log(current_piece);
      //ev.target.parent.appendChild(document.getElementById(data));
      return;
    }
    //console.log("************");
    //console.log(data);
    console.log("Event target ");
    upDateParentIsNotPiece(ev.target);
    //console.log(ev.target);
    console.log(ev.target.className);
    try {
      ev.target.appendChild(piece);
    } catch (error) {
      console.log("Unable to drag onto the same location!");
    }
    
    var newId = ev.target.id.slice(0,2) + "_" + data.slice(3,data.length - 4) + ".png";
    console.log("Setting " + newId);
    piece.setAttribute("id",newId);

  }


  function upDateParentIsNotPiece(parentNode){

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