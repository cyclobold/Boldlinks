const express = require("express");
const mongodb = require("mongodb");
const cors = require("cors");



const mongoClient = mongodb.MongoClient;



const server = express();

server.use(express.json());
server.use(cors());


//routes
server.get("/", function(request, response){

    //const client = new mongoClient("mongodb://admin:password@mongo:27017")


    response.send("You are Home")

    //client.close()

})


server.post("/add-item", async function(request, response){

    console.log(request.body);

    let item = request.body.item

    // const client = new mongoClient("mongodb://admin:password@localhost:27017")

    // let feedback = await client.db("users").collection("items").insertOne({item: item})

    mongoClient.connect("mongodb://admin:password@localhost:27017", function(error, client){
        if(error) throw error;

        //client.db("users").collection("items").insertOne({item: item})


    });





})



server.listen(4000, "localhost", () => console.log(`Server is listening on http://localhost:4000`))