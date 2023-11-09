function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    //console.log(ev.target);
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    //console.log("data -> " + data);
    //console.log(ev)
    //console.log(ev.target);
    //console.log(ev.srcElement);
    //console.log(ev.toElement);
    
    var item =  ev.target.firstElementChild; //item being dropped
    if (item){

      console.log("###################################");
      var sittingItem = ev.target;
      var sittingItemId = ev.target.id;
      //console.log("sitting item ");
      //console.log(sittingItem);
      //console.log("parent div");
      let parentDiv = sittingItem.parentNode;
      console.log(parentDiv);
      document.getElementById(sittingItemId).remove();
      console.log("###################################");
      console.log(sittingItemId.indexOf(".png"));
      
      if (sittingItemId.indexOf(".png") > -1){
            console.log("Piece was likely dropped on a non droppable div");
            current_piece = ev.target.removeChild(item);
            parentDiv.appendChild(current_piece);
      }
      //console.log(current_piece);
      //ev.target.parent.appendChild(document.getElementById(data));
      return;
    }
    console.log(data);
    ev.target.appendChild(document.getElementById(data));
  }
