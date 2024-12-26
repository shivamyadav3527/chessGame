const express = require("express");
const socket = require("socket.io");
const http = require("http");
const { Chess } = require("chess.js");
const path = require("path");
const { log } = require("console");

const app = express();
const server = http.createServer(app);

const io = socket(server);

const chess = new Chess();
let players = {}
let currentPlayer = 'w'

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index", {title: "Shivam Chess Game"});
})

 //on is used to listen the event
 //emit is used to trigger the event
io.on("connection", function(uniqueSocket){
    console.log("connected");

    if(!players.white) {
        uniqueSocket.emit("playerRole", 'w'); //here playerRole is event and 'w' is argument
    } else if(!players.black) {
        uniqueSocket.emit("playerRole", "b");
    } else {
        uniqueSocket.emit("spectatorRole") //here spectator is event
    }

    uniqueSocket.on("disconnect", function() {
        if(uniqueSocket.id === players.white) {
            delete players.white;
        }
        else if (uniqueSocket.id === players.black) {
            delete players.black;
        }
    });

    uniqueSocket.on("move", (move) => {
        try {
            if(chess.turn() === 'w' && uniqueSocket.id !== players.white) return
            if(chess.turn() === 'b' && uniqueSocket.id !== players.black) return

            const result = chess.move(move);
            if(result) {
                currentPlayer = chess.turn();
                uniqueSocket.emit("move", move);
                uniqueSocket.emit("boardState", chess.fen());
            } else {
                console.log("Invalid Move", move);
                uniqueSocket.emit("invalidMove", move);
            }

        } catch(err){
            console.log("err");
            console.log("invalid move", move);
            
            
        }
    })

})

server.listen(3000, function(){
    console.log("Server listening on the port 3000");
    
})