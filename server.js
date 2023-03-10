const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const chokidar = require('chokidar');
const app = express();
const request = require('request');
let data;

let ranks;

var options = {
  'method': 'GET',
  'url': 'https://api.collegefootballdata.com/rankings?year=2022&week=15&seasonType=regular',
  'headers': {
    'Authorization': 'Bearer gWAxje/I1VJVLWcuTef5cOMXahi04GUjWYzz+qNxCTJAhwqq7959bLb4TYoK5QH5'
  }
};
var options2 = {
  'method': 'GET',
  'url': 'https://api.collegefootballdata.com/rankings?year=2022&week=14&seasonType=regular',
  'headers': {
    'Authorization': 'Bearer gWAxje/I1VJVLWcuTef5cOMXahi04GUjWYzz+qNxCTJAhwqq7959bLb4TYoK5QH5'
  }
};

let passingOptions = {
  'method': 'GET',
  'url': 'https://api.collegefootballdata.com/stats/player/season?year=2022&startWeek=1&endWeek=15&category=passing',
  'headers': {
    'Authorization': 'Bearer gWAxje/I1VJVLWcuTef5cOMXahi04GUjWYzz+qNxCTJAhwqq7959bLb4TYoK5QH5'
  }

};





  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

const db = require("./app/models");
const {response} = require("express");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/topteams", (req, res) => {
  let schoolArray = [];
  request(options, function (error, response) {
    if (error) throw new Error(error);
    //console.log(response.body);
    data = JSON.parse(response.body);
    //console.log(data[0].polls[0].ranks);
    ranks = data[0].polls[0].ranks
    for (const rank of ranks) {
      schoolArray.push(rank.school);

    }
    res.json(schoolArray);
  });


  
}); 


app.get("/previousrank", (req, res) => {

  let schoolArray = [];
  request(options2, function (error, response) {
    if (error) throw new Error(error);
    //console.log(response.body);
    data = JSON.parse(response.body);
    //console.log(data[0].polls[0].ranks);
    ranks = data[0].polls[0].ranks
    for (const rank of ranks) {
      schoolArray.push(rank.school);
    }
    res.json(schoolArray);
  });
});

app.get("/passingcompletion", (req, res) =>{
  let responsePCT;
  let playersPct = [];
  let passingCompletions = [];
  request(passingOptions, (error, response)=> {
    if (error) throw new Error(error);
    let passingData = JSON.parse(response.body);

    passingData.forEach((element) =>{
      if (element.statType === 'COMPLETIONS' && element.stat > 75){
        passingCompletions.push(element.player)
      }
    });
    passingData.forEach((inData) =>{
      if (inData.statType === 'PCT'){
        playersPct.push(inData);
      }
    });


   responsePCT = passingCompletions.map(function (item){
    return playersPct.find(function(j){
      return j.player === item;
    })
    }).map(function(j) {
      return { name: j.player, team:j.team, PCT: j.stat };
    });
    console.log("Response length  " + responsePCT.length);
    res.json(responsePCT)


  });


});


require("./app/routes/routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

});