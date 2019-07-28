require("dotenv").config();
const keys = require("./keys.js");
let moment = require("moment")
moment().format();
let fs = require("fs");
let axios = require("axios");
var Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);
let inquirer = require("inquirer");

inquirer.prompt([
    {
        type: "input",
        message: "Hi, what may I call you?",
        name: "username"
    },
    {
        type: "list",
        message: "Would you like to look up a band on Spotify? Or look up if said band has any shows coming up? Or maybe you just want to look up a movie?",
        choices: ["concert-this", "spotify-this-song", "movie-this", "do-what-it-says"],
        name: "choice"
    },
])

    .then(function (userChoice) {
        if (userChoice.choice === "concert-this") {
            console.log("\n-----------------------");
            console.log(`\nHello ${userChoice.username}`);
            console.log("\n------------------------");
            inquirer.prompt([
                {
                    type: "input",
                    message: "What band would you like to see?",
                    name: "artist"
                }
            ])
                .then(function (result) {
                    let artist = result.artist;
                    let queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
                    if (result.artist == "") {
                        console.log("Please enter in a band");
                    } else {
                        axios.get(queryUrl).then(
                            function (response) {
                                for (let i = 0; i < response.data.length; i++) {
                                    let date = moment(response.data[i].datetime).format("MM/DD/YYYY")
                                    console.log("\n----------------------");
                                    fs.appendFileSync("log.txt", "\n--------------------");
                                    fs.appendFileSync("log.txt", `\nArtist: ${artist}`);
                                    console.log(`Venue: ${response.data[i].venue.name}`);
                                    fs.appendFileSync("log.txt", `\nVenue: ${response.data[i].venue.name}`);
                                    console.log(`City: ${response.data[i].venue.city}`);
                                    fs.appendFileSync(`City: ${response.data[i].venue.city}`);
                                    console.log(`Date: ${date}`);
                                    // fs.appendFileSync(`Date: ${date}`);
                                    // Can't get date to append w/o errors
                                    console.log("-------------------------");
                                    fs.appendFileSync("-----------------------");
                                }
                                // fs.appendFile("log.txt", `\nArtist: ${artist}`, `\nVenue: ${response}`, function (err) {
                                //     if (err) {
                                //         console.log(err);
                                //     }
                                //     else {
                                //         console.log(`Artist ${artist.toUpperCase()} appended to log.txt`);
                                //     }
                                // });
                            }
                        )
                    }
                })
        } else if (userChoice.choice === "spotify-this-song") {
            console.log("\n------------------------");
            console.log(`\nHello ${userChoice.username}`);
            console.log("\n------------------------");
            inquirer.prompt([
                {
                    type: "input",
                    message: "What song are you interested in?",
                    name: "track"
                }
            ])
                .then(function (result) {
                    if (result.track == "") {
                        result.track = "The Sign";
                        spotify.search({ type: "track", query: result.track })
                            .then(function (response) {
                                console.log("\n---------------------");
                                fs.appendFileSync("log.txt", "\n-----------------------");
                                console.log(`Artist: ${response.tracks.items[2].album.artists[0].name}`);
                                fs.appendFileSync("log.txt", `\nArtist: ${response.tracks.items[2].album.artists[0].name}`);
                                console.log(`Song: ${response.tracks.items[2].name}`);
                                fs.appendFileSync("log.txt", `\nSong: ${response.tracks.items[2].name}`);
                                console.log(`Spotify Preview: ${response.tracks.items[2].album.external_urls.spotify}`);
                                fs.appendFileSync("log.txt", `\nSpotify Preview: ${response.tracks.items[2].album.external_urls.spotify}`);
                                console.log(`Album: ${response.tracks.items[2].album.name}`);
                                fs.appendFileSync("log.txt", `\nAlbum: ${response.tracks.items[2].album.name}`);
                                console.log("\n---------------------");
                                // fs.appendFile("log.txt", `\nSong: ${result.track}`, function (err) {
                                //     if (err) {
                                //         console.log(err);
                                //     }
                                //     else {
                                //         console.log(`Song ${result.track.toUpperCase()} appended to log.txt`);
                                //     }
                                // });
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    } else {
                        spotify.search({ type: "track", query: result.track })
                            .then(function (response) {
                                for (let i = 0; i < response.tracks.items.length; i++) {
                                    console.log("\n---------------------");
                                    fs.appendFileSync("log.txt", "\n-----------------------");
                                    console.log(`Artist: ${response.tracks.items[i].album.artists[0].name}`);
                                    fs.appendFileSync("log.txt", `\nArtist: ${response.tracks.items[i].album.artists[0].name}`);
                                    console.log(`Song: ${response.tracks.items[i].name}`);
                                    fs.appendFileSync("log.txt", `\nSong: ${response.tracks.items[i].name}`);
                                    console.log(`Spotify Preview: ${response.tracks.items[i].album.external_urls.spotify}`);
                                    fs.appendFileSync("log.txt", `\nSpotify Preview: ${response.tracks.items[i].album.external_urls.spotify}`);
                                    console.log(`Album: ${response.tracks.items[i].album.name}`);
                                    fs.appendFileSync("log.txt", `\nAlbum: ${response.tracks.items[i].album.name}`);
                                    console.log("\n---------------------");
                                    // fs.appendFile("log.txt", `\nSong: ${result.track}`, function (err) {
                                    //     if (err) {
                                    //         console.log(err);
                                    //     }
                                    //     else {
                                    //         console.log(`Song ${result.track.toUpperCase()} appended to log.txt`);
                                    //     }
                                    // });
                                }
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    }
                })
        } else if (userChoice.choice === "do-what-it-says") {
            fs.readFile("random.txt", "utf8", function (err, data) {
                if (err) {
                    return console.log(err);
                }
                spotify.search({ type: "track", query: data })
                    .then(function (response) {
                        for (let i = 0; i < response.tracks.items.length; i++) {
                            console.log("\n---------------------");
                            fs.appendFileSync("log.txt", "\n-----------------------");
                            console.log(`Artist: ${response.tracks.items[i].album.artists[0].name}`);
                            fs.appendFileSync("log.txt", `\nArtist: ${response.tracks.items[i].album.artists[0].name}`);
                            console.log(`Song: ${response.tracks.items[i].name}`);
                            fs.appendFileSync("log.txt", `\nSong: ${response.tracks.items[i].name}`);
                            console.log(`Spotify Preview: ${response.tracks.items[i].album.external_urls.spotify}`);
                            fs.appendFileSync("log.txt", `\nSpotify Preview: ${response.tracks.items[i].album.external_urls.spotify}`);
                            console.log(`Album: ${response.tracks.items[i].album.name}`);
                            fs.appendFileSync("log.txt", `\nAlbum: ${response.tracks.items[i].album.name}`);
                            console.log("\n---------------------");
                            // fs.appendFile("log.txt", `\nSong: ${result.track}`, function (err) {
                            //     if (err) {
                            //         console.log(err);
                            //     }
                            //     else {
                            //         console.log(`Song ${result.track.toUpperCase()} appended to log.txt`);
                            //     }
                            // });
                        }
                    })
            })
        }
        else if (userChoice.choice === "movie-this") {
            console.log("\n---------------------");
            console.log(`\nHello ${userChoice.username}`);
            console.log("\n---------------------");
            inquirer.prompt([
                {
                    type: "input",
                    message: "What film would you like to search for?",
                    name: "movie"
                }
            ]).then(function (result) {
                if (result.movie == "") {
                    axios.get("http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy").then(
                        function (response) {
                            console.log("\n---------------------");
                            fs.appendFileSync("log.txt", "\n--------------------------");
                            console.log(`Title: ${response.data.Title}`);
                            fs.appendFileSync("log.txt", `\nTitle: ${response.data.Title}`);
                            console.log(`Year: ${response.data.Year}`);
                            fs.appendFileSync("log.txt", `\nYear: ${response.data.Year}`);
                            console.log(`IMDB Rating: ${response.data.imdbRating}`);
                            fs.appendFileSync("log.txt", `\nIMDB Rating: ${response.data.imdbRating}`);
                            console.log(`Rotten Tomatoes Rating: ${response.data.tomatoRating}`);
                            fs.appendFileSync("log.txt", `\nRotten Tomatoes Rating: ${response.data.tomatoRating}`);
                            console.log(`Country: ${response.data.Country}`);
                            fs.appendFileSync("log.txt", `\nCountry: ${response.data.Country}`);
                            console.log(`Language: ${response.data.Language}`);
                            fs.appendFileSync("log.txt", `\nLanguage: ${response.data.Language}`);
                            console.log(`Plot: ${response.data.Plot}`);
                            fs.appendFileSync("log.txt", `\nPlot: ${response.data.Plot}`);
                            console.log(`Actors: ${response.data.Actors}`);
                            fs.appendFileSync("log.txt", `\nActors: ${response.data.Actors}`);
                            console.log("\n---------------------");
                        }
                    )
                    // fs.appendFile("log.txt", `\nMovie: ${'Mr.Nobody'}`, function (err) {
                    //     if (err) {
                    //         console.log(err);
                    //     }
                    //     else {
                    //         console.log(`Movie ${'Mr.Nobody'} appended to log.txt`)
                    //     }
                    // });
                }
                else {
                    let omdbMovie = function () {
                        axios.get("http://www.omdbapi.com/?t=" + result.movie + "&y=&plot=short&apikey=trilogy").then(
                            function (response) {
                                if (response.data.err) {
                                    console.log("Movie not found");
                                }
                                else if (result.movie) {
                                    console.log("\n---------------------");
                                    fs.appendFileSync("log.txt", "\n--------------------------");
                                    console.log(`Title: ${response.data.Title}`);
                                    fs.appendFileSync("log.txt", `\nTitle: ${response.data.Title}`);
                                    console.log(`Year: ${response.data.Year}`);
                                    fs.appendFileSync("log.txt", `\nYear: ${response.data.Year}`);
                                    console.log(`IMDB Rating: ${response.data.imdbRating}`);
                                    fs.appendFileSync("log.txt", `\nIMDB Rating: ${response.data.imdbRating}`);
                                    console.log(`Rotten Tomatoes Rating: ${response.data.tomatoRating}`);
                                    fs.appendFileSync("log.txt", `\nRotten Tomatoes Rating: ${response.data.tomatoRating}`);
                                    console.log(`Country: ${response.data.Country}`);
                                    fs.appendFileSync("log.txt", `\nCountry: ${response.data.Country}`);
                                    console.log(`Language: ${response.data.Language}`);
                                    fs.appendFileSync("log.txt", `\nLanguage: ${response.data.Language}`);
                                    console.log(`Plot: ${response.data.Plot}`);
                                    fs.appendFileSync("log.txt", `\nPlot: ${response.data.Plot}`);
                                    console.log(`Actors: ${response.data.Actors}`);
                                    fs.appendFileSync("log.txt", `\nActors: ${response.data.Actors}`);
                                    console.log("\n---------------------");
                                }
                            }
                        )
                    }
                    omdbMovie();
                    // fs.appendFile("log.txt", `\nMovie: ${result.movie}`, function (err) {
                    //     if (err) {
                    //         console.log(err);
                    //     }
                    //     else {
                    //         console.log(`Movie ${result.movie.toUpperCase()} appended to log.txt`);
                    //     }
                    // });
                }
            })
        }
    })