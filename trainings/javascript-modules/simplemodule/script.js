const http = require("http");

//set the IP address
const hostname = "127.0.0.1";
const port = 4300;

//create the server
const server = http.createServer(function(request, response ){

    //set the response 
    response.statusCode = 200;
    response.setHeader('Content-Type', 'text/plain');
    response.end("Hello world")

})


server.listen(port, hostname, () => console.log("Server is working"));