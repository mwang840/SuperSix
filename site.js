var sheets = [
"css/AIGenerated.css",
"css/pixel.css",
"css/professors.css",
"css/text.css"];
var changeSheet = function(style){
    var newHref = sheets[style];
    document.getElementById('pagestyle').setAttribute('href', newHref); 
}