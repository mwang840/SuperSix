var sheetIndex = 0;
var sheets = [
"/css/AIGenerated.css",
"/css/pixel.css",
"/css/pokemon.css",
"/css/professors.css"];
var nextSheet = function(){
    sheetIndex = (sheetIndex + 1) % sheets.length;
    var newHref = sheets[sheetIndex];
    document.getElementById('currentstyle').innerHTML = newHref;
    document.getElementById('pagestyle').setAttribute('href', newHref);
}