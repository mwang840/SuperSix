
function movePiece() {
    var counter = 1;
    var lastPieceClicked = "";
    var lastImageSRC = "";  
    const divs = document.querySelectorAll('.is-piece, .not-piece');
    // Iterate over the elements and add a click event listener to each
    divs.forEach(div => {
        div.addEventListener('click', (event) => {
            // Access the unique ID of the clicked div using event.target.id
            const uniqueID = event.target.id;
            const uniqueIDSelector = "#" + uniqueID;
            if (counter == 1) {
                console.log(uniqueID);
                if (!!document.querySelector(uniqueIDSelector)){ //Add a check to make sure it's not NULL (and this only happens if you accidently drop on the same place)
                    if (document.querySelector(uniqueIDSelector).classList.contains("is-piece")) {
                        lastPieceClicked = uniqueID; //track the ID
                        lastImageSRC = document.querySelector('#' + uniqueID).querySelector('img').getAttribute('src'); // also track the image src for convenience
                        counter = 2;
                    }
                }

            } else if (counter == 2) {
                const lastPieceClickedSelector = "#" + lastPieceClicked;
                console.log(uniqueID + div.className + lastImageSRC + counter);
                document.querySelector(lastPieceClickedSelector).querySelector('img').setAttribute('src', "images/blank.png"); // remove the old piece
                document.querySelector(uniqueIDSelector).querySelector('img').setAttribute('src', lastImageSRC); // move the chess piece
                document.querySelector(lastPieceClickedSelector).classList.remove("is-piece"); // remove the old piece class
                document.querySelector(lastPieceClickedSelector).classList.add("not-piece"); // add the not-piece class
                document.querySelector(uniqueIDSelector).classList.remove("not-piece"); // remove the old piece class
                document.querySelector(uniqueIDSelector).classList.add("is-piece"); // add the not-piece class
                lastImageSRC ="";
                lastPieceClicked =""
                counter = 1;
            }
            console.log(uniqueID + div.className + lastImageSRC + counter);
        });
    });
    
}