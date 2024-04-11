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
    'Authorization': 'Bearer AFXkjZ+iPS2Sl7kAIaxBIpSCEqCiC97sisLNdBIP2hVWQibggDCOnTJgOdcuYk5J'
  }
};
var options2 = {
  'method': 'GET',
  'url': 'https://api.collegefootballdata.com/rankings?year=2022&week=14&seasonType=regular',
  'headers': {
    'Authorization': 'Bearer AFXkjZ+iPS2Sl7kAIaxBIpSCEqCiC97sisLNdBIP2hVWQibggDCOnTJgOdcuYk5J'
  }
};

let passingOptions = {
  'method': 'GET',
  'url': 'https://api.collegefootballdata.com/stats/player/season?year=2022&startWeek=1&endWeek=15&category=passing',
  'headers': {
    'Authorization': 'Bearer AFXkjZ+iPS2Sl7kAIaxBIpSCEqCiC97sisLNdBIP2hVWQibggDCOnTJgOdcuYk5J'
  }

};
let passingYardsOptions = {
  'method': 'GET',
  'url': 'https://api.collegefootballdata.com/stats/player/season?year=2022&startWeek=1&endWeek=15&category=passing',
  'headers': {
    'Authorization': 'Bearer AFXkjZ+iPS2Sl7kAIaxBIpSCEqCiC97sisLNdBIP2hVWQibggDCOnTJgOdcuYk5J'
  }

};


let passingOptionsWeek1 = {
  'method': 'GET',
  'url': 'https://api.collegefootballdata.com/stats/player/season?year=2022&startWeek=1&endWeek=1&seasonType=regular&category=passing',
  'headers': {
    'Authorization': 'Bearer AFXkjZ+iPS2Sl7kAIaxBIpSCEqCiC97sisLNdBIP2hVWQibggDCOnTJgOdcuYk5J'
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

    res.json(responsePCT)


  });


});

app.get("/passingyardsqb", (req, res) => {
  let passingYards = [];
  let passingYards_Completions = [];
  let top5 = [];
  request(passingYardsOptions, (error, response) => {
    if (error) throw new Error(error);
    let ydsData = JSON.parse(response.body);
      ydsData.forEach((element) =>{
      if (element.statType === 'COMPLETIONS' && element.stat > 75){
        passingYards_Completions.push(element.player)
      }
    })
    ydsData.forEach((element) => {
      if (element.statType === 'YDS') {
        passingYards.push(element);
      }
    })


    let responseYDS = passingYards_Completions.map(function (item){
      return passingYards.find(function(j){
        return j.player === item;
      })
    }).map(function(j) {
      return { name: j.player, team:j.team, YDS: j.stat };
    });
      responseYDS.sort((a, b) => a.YDS - b.YDS).reverse();
      for (let i =0; i < 5; i++){
        top5.push(responseYDS[i]);
      }


    res.json(top5);



  })


});

app.get('/qbrcalculations', (req, res) => {
  let a;
  let b;
  let c;
  let d;
  let playerMap;
  playerMap = {
    player: "",
    comp: "",
    yds: "",
    td: "",
    att: "",
    int: ""
  };
  let playerList = [];
  request(passingOptionsWeek1, (error, response)=>{
    if (error) throw new Error(error);
    let player = JSON.parse(response.body);
    player.forEach((element) => {
      if (element.playerId > 1) {
        playerList.push(element)
      }

    })
// Initialize an empty object to store all the player maps
    const allPlayerMaps = {};

// Loop through each element in the array
    for (let element of playerList) {
      // Get the playerId and check if a player map for this playerId has already been created
      const playerId = element.playerId;
      if (!allPlayerMaps[playerId]) {
        // If a player map for this playerId has not been created yet, create a new one
        allPlayerMaps[playerId] = {
          player: "",
          team: "",
          completions: "",
          yds: "",
          td: "",
          att: "",
          int: ""
        };
      }

      // Set the values in the player map if they are not already set
      if (!allPlayerMaps[playerId].player) {
        allPlayerMaps[playerId].player = element.player;
      }
      if (!allPlayerMaps[playerId].team) {
        allPlayerMaps[playerId].team = element.team;
      }
      if (!allPlayerMaps[playerId].completions && element.statType === "COMPLETIONS") {
        allPlayerMaps[playerId].completions = element.stat;
      }
      if (!allPlayerMaps[playerId].yds && element.statType === "YDS") {
        allPlayerMaps[playerId].yds = element.stat;
      }
      if (!allPlayerMaps[playerId].td && element.statType === "TD") {
        allPlayerMaps[playerId].td = element.stat;
      }
      if (!allPlayerMaps[playerId].att && element.statType === "ATT") {
        allPlayerMaps[playerId].att = element.stat;
      }
      if (!allPlayerMaps[playerId].int && element.statType === "INT") {
        allPlayerMaps[playerId].int = element.stat;
      }
    }
    console.log(allPlayerMaps)


    res.json(allPlayerMaps)
  })

})


require("./app/routes/routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);

});