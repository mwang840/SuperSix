function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    console.log(ev.target);
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    console.log("data -> " + data);
    //console.log(ev)
    //console.log(ev.target);
    //console.log(ev.srcElement);
    //console.log(ev.toElement);
    ev.target.appendChild(document.getElementById(data));

    //ev.target.appendChild(data)
  }
