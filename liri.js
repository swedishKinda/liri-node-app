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

    .then(function (concert) {
        if (concert.choice === "concert-this") {
            console.log("\n-----------------------");
            console.log("\nHello ${concert.username}");
            console.log("\n------------------------");
            inquirer.prompt([
                {
                    type: "input",
                    message: "What band would you like to see?",
                    name: "artist"
                }
            ])
            .then(function (result) {
                let artist = result.atist;
                let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
                if(result.artist == ""){
                    console.log("Please enter in a band");
                } else {
                    axios.get(queryUrl).then(
                        function (response) {
                            for (let i = 0; i < response.data.length; i++) {
                                let date = moment(respose.data[i].datetime).format("MM/DD/YYYY")
                                console.log("\n----------------------");
                                console.log("Venue: ${response.data[i].data[i].venue.name}");
                                console.log("Date: ${date}");
                                console.log("-------------------------");
                            }
                            fs.appendFile("log.txt", "\nArtist: ${artist}", function(error) {
                                if (error) {
                                    console.log(error);
                                }
                                else {
                                    console.log("Artist $(artist.toUpperCase()} appended to log.txt");
                                }
                            });
                        }
                    )
                }
            }
        }
    })