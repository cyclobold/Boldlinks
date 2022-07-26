//import express
const express = require("express");

//set the hostname and the port
const hostname = "127.0.0.1"
const port = "4000"

//create the server
const server = express();

//Routes
server.get("/", function(request, response){

    response.send("Welcome");

})



server.listen(port, hostname, () => console.log(`Listening on http://${hostname}:${port}`))
//make server start listening for communication