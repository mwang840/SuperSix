# Super Six Chess Game -- A browser chess game featuring AI, pixel, professors and text.
## Features
- Pieces that are either plain text, chess pieces, UD CIS professors and pixelated chess pieces
- A calming background music for the loading game
- Highlights to indicate possible spaces the chess piece should go to
- Alternates between the players each giving them a turn option

## Local Deployment
Firstly, fork this repo and save it wherever you'd like. After pulling it to your IDE of choice, all you have to do is...
- You may deploy however you wish, but we installed the node http-server. Run this command in your terminal: 'npm i http-server -g'
- Run npm i to ensure dependencies are up to date
- Set up a mongo connection string in a **config.env** and name it (MONGO_URI) file to run the server code for user authentication
- If using the method above, deploy by typing 'http-server' into the terminal (only for guest players).
- Server side, run node authenticate.js for user registration and authentication
- Created by Maxwell Wang, Jacob Marks, Arjun Manikyath, Matt Gwin
- Tech stacks: Mongodb, Express,js, HTML and CSS and JavaScript