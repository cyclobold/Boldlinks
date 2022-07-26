const express = require("express");

const port = process.env.PORT || 4300; 

//create the server
const server = express()

//Routes
server.get("/", function(request, response){
    response.send("Welcome to Home Page");
})

server.get("/hello", function(request, response){
    response.send("Hi. How are you?");
})



server.listen(port, () => console.log(`Listening on port ${port}`))