function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    console.log(ev.target);
    ev.dataTransfer.setData("text/html", ev.target);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text/html");
    console.log("data -> " + data);
    //console.log("What is NULL? " + document.getElementById(data));
    ev.target.innerHtml = data;
    console.log(ev.target);
    ev.target.innerHtml = ``;
    //ev.target.innerHtml = (document.getElementById(ev.target));
  }