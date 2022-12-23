const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
var request = require('request');
let data;

let ranks;

var options = {
  'method': 'GET',
  'url': 'https://api.collegefootballdata.com/rankings?year=2022&week=15&seasonType=regular',
  'headers': {
    'Authorization': 'Bearer gWAxje/I1VJVLWcuTef5cOMXahi04GUjWYzz+qNxCTJAhwqq7959bLb4TYoK5QH5'
  }
};
//this request will return the top 25 ranked schools formatted from 1-25
// request(options, function (error, response) {
//   if (error) throw new Error(error);
//   //console.log(response.body);
//   data = JSON.parse(response.body);
//   console.log(data[0].polls[0].ranks);
//   ranks = data[0].polls[0].ranks
//   for (const rank of ranks) {
//     schoolArray.push(rank.school);
//     console.log(rank.school);
//   }
// });



  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

const db = require("./app/models");
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
    console.log(data[0].polls[0].ranks);
    ranks = data[0].polls[0].ranks
    for (const rank of ranks) {
      schoolArray.push(rank.school);
      console.log(rank.school);
    }
    res.json(schoolArray);
  });
  console.log(schoolArray);

  
}); 
require("./app/routes/routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});