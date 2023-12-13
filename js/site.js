var sheets = [
"css/AIGenerated.css",
"css/pixel.css",
"css/professors.css",
"css/text.css"];
var piece_styles = [
    "AIGenerated-pieces",
    "pixel-pieces",
    "professors-pieces",
    "text-pieces"
]
var changeSheet = function(style){
    var newHref = sheets[style];
    const url = window.location.href;
    const pathParts = url.split('/');
    if (pathParts[pathParts.length - 2] == "sign-up") {
        document.getElementById('pagestyle').setAttribute('href',"../" + newHref);
    }
    else {
        document.getElementById('pagestyle').setAttribute('href', newHref);
        // for each piece, change the image SRC
        var pieces = document.querySelectorAll(".is-piece");
        for (var i = 0; i < pieces.length; i++) {
            //get the piece SRC. and split off the specific piece."images/pixel-pieces/black-pawn.png"
            if (!!pieces[i]){
                var piece_type_src = pieces[i].querySelector("img").getAttribute('src');
                var piece_type = piece_type_src.substring(piece_type_src.lastIndexOf('/'));
                pieces[i].querySelector("img").setAttribute('SRC',"images/"+piece_styles[style]+piece_type);                
            }
        }
        for (var i = 0; i < 2; i++) {
            const side = (i === 0) ? ".boardleft" : ".boardright";
            var capturedPieces = document.querySelector(side).querySelectorAll("img");
            //console.log(capturedPieces);
            for (var k = 0; k < capturedPieces.length; k++) {
                var piece_type_src = capturedPieces[k].getAttribute('src');
                var piece_type = piece_type_src.substring(piece_type_src.lastIndexOf('/'));
                capturedPieces[k].setAttribute('SRC',"images/"+piece_styles[style]+piece_type);  
            }
        }
    }
}
