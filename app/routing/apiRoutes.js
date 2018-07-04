const path = require("path");
const fs = require("fs");

module.exports = function(app){

    app.post("/api/friends", function(req, res){
        var friendObj = JSON.parse(fs.readFileSync(path.join("app", "data", "friends.json"), "utf8"));
        const myFriend = findMyMatch(req.body.scores, friendObj);
        friendObj.push(req.body);
        var data = JSON.stringify(friendObj)
        fs.writeFileSync("./app/data/friends.json", data,"utf8")
        res.json(myFriend)
    });

    function findMyMatch(scores, friends){
        for (i = 0; i<scores.length; i++){
            scores[i] = parseInt(scores[i]) 
        }

        var bestMatch = {person: undefined, score: 51}
        for(person of friends) {
    // do some stuff
            var sum = 0;
            for(i=0; i < 10; i++) {
                sum = sum + Math.abs((scores[i] - person.scores[i]))
            }
            if ( sum < bestMatch.score) {
                bestMatch.score = sum;
                bestMatch.person = person;
            }
        }
        return bestMatch.person;
    }

    app.get("/api/friends", function(req, res){
        res.sendFile(__dirName + "/api/friends")
    })
};