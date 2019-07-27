require("dotenv").config();
const keys = require("./keys.js");
let moment = require("moment")
moment().format();
let fs = require("fs");
let axios = require("axios");
var Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

inquirer.prompt([
    {
        type: "input",
        message: "Hi, what may I call you",
        name: "username"
    },
    {
        type: "list",
        message: "Would you like to look up a band on Spotify? Or look up if said band has any shows coming up? Or maybe you just want to look up a movie?",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "choice"
    },
])

function (result) {
    let artist = result.atist;
    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
}