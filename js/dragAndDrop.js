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
    var item =  ev.target.firstElementChild;
    if (item){

      //sconsole.log("item -> " + item);
      console.log("###################################");
      console.log("event.target.firstElementChild -> ");
      console.log(item);
      console.log("###################################");
      console.log("event.target -> ")
      console.log(ev.target);
      console.log("###################################");
      var current_piece = ev.target.removeChild(item);
      console.log("Piece that is currently in the spot -> ");
      console.log(current_piece);
      //return;
    }

    ev.target.appendChild(document.getElementById(data));
  }
