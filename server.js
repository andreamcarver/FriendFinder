const EXPRESS = require("express");
const BODY_PARSER = require("body-parser");
const PATH = require("path");
const fs = require("fs")

const app = EXPRESS();

var PORT = process.env.PORT || 8080;

// app.use(BODY_PARSER)

app.use(BODY_PARSER.urlencoded());

app.use(BODY_PARSER.json());



app.get("/survey", function(req, res){
    res.sendFile(__dirname + "/app/public/survey.html")
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/app/public/home.html")
});

app.post("/api/friends", function(req, res){
    var friendObj = JSON.parse(fs.readFileSync("./app/data/friends.json", "utf8"))
    findMyMatch(req.body.scores, friendObj);
    friendObj.push(req.body);
    for( f of friendObj){
       console.log(f)
    };
    var data = JSON.stringify(friendObj)
    console.log(data)
    fs.writeFileSync("./app/data/friends.json", data,"utf8")

});

function findMyMatch(scores, friends){
    for (i = 0; i<scores.length; i++){
        scores[i] = parseInt(scores[i])
        
    }

    var bestMatch = {name:'', score: 51}
    for(person of friends) {
// do some stuff
        var difference = [];
        var sum = 0;
        for(i=0; i < 10; i++) {
            sum = sum + Math.abs((scores[i] - person.scores[i]))
        }

       if ( sum < bestMatch.score) {
           bestMatch.score = sum;
           bestMatch.name = person.name;
       }
    
    }
    console.log(bestMatch)

}


app.get("/api/friends", function(req, res){
    res.sendFile(__dirName + "/api/friends")
});

// A GET route with the url /api/friends. 
// This will be used to display a JSON of all possible friends.
// A POST routes /api/friends. 
// This will be used to handle incoming survey results. 
// This route will also be used to handle the compatibility logic.

// var routes = require("./app/routing/htmlRoutes.js");

// app.use(BODY_PARSER);
// app.use('/', routes);
// app.use(app.router);
// routes.initialize(app);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });

  
  