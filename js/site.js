var sheets = [
"css/AIGenerated.css",
"css/pixel.css",
"css/professors.css",
"css/text.css"];
var changeSheet = function(style){
    var newHref = sheets[style];
    const url = window.location.href;
    const pathParts = url.split('/');
    if (pathParts[pathParts.length - 2] === "sign-up") {
      document
        .getElementById("pagestyle")
        .setAttribute("href", "../" + newHref);
    } else {
      document.getElementById("pagestyle").setAttribute("href", newHref);
    } 
}
