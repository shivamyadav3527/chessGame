const socket = io();
socket.emit("hakuna");
socket.on("matata", function(){
   console.log("hakuna matata completed"); 
})