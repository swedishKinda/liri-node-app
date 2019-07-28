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
                    if (result.artist == "") {
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
                                fs.appendFile("log.txt", "\nArtist: ${artist}", function (error) {
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
                })
        } else if (spot.choice === "spotify-this-song") {
            console.log("\n------------------------");
            console.log("\nHello ${spot.username}");
            console.log("\n------------------------");
            inquirer.prompt([
                {
                    type: "input",
                    message: "What music are you interested in?",
                    name: "track"
                }
            ])
                .then(function (result) {
                    if (result.track == "") {
                        result.track = "The Sign";
                        spotify.search({ type: "track", query: result.track })
                            .then(function (response) {
                                console.log("\n---------------------");
                                console.log("Artist: ${response.tracks.items[7].album.artists[0].name}");
                                console.log("Song: $(response.tracks.items[7].name}");
                                console.log("Spotify Preview: ${response.tracks.items[7].album.external_urls.spotify}");
                                console.log("Album: $(response.tracks.items[7].album.name}");
                                console.log("\n---------------------");
                                fs.appendFile("log.txt", "\nSong: ${result.track}", function (error) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        console.log("Song ${result.track.toUpperCase()} appended to log.txt");
                                    }
                                });
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    } else {
                        spotify.search({ type: "track", query: result.track })
                            .then(function (response) {
                                for (let i = 0; i < response.tracks.items.length; i++) {
                                    console.log("\n---------------------");
                                    console.log("Artist: ${response.tracks.items[i].album.artists[0].name}");
                                    console.log("Song: $(response.tracks.items[i].name}");
                                    console.log("Spotify Preview: ${response.tracks.items[i].album.external_urls.spotify}");
                                    console.log("Album: $(response.tracks.items[i].album.name}");
                                    console.log("\n---------------------");
                                }
                                fs.appendFile("log.txt", "\nSong: ${result.track}", function (error) {
                                    if (error) {
                                        console.log(error);
                                    }
                                    else {
                                        console.log("Song ${result.track.toUpperCase()} appended to log.txt");
                                    }
                                });
                            })
                            .catch(function (error) {
                                console.log(err);
                            });
                    }
                })
        } else if (res.choice === "do-what-it-says") {
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) {
                    return console.log(error);
                }
                spotify.search({ type: "track", query: data })
                    .then(function (response) {
                        for (let i = 0; i < response.tracks.items.length; i++) {
                            console.log("\n---------------------");
                            console.log("Artist: ${response.tracks.items[i].album.artists[0].name}");
                            console.log("Song: $(response.tracks.items[i].name}");
                            console.log("Spotify Preview: ${response.tracks.items[i].album.external_urls.spotify}");
                            console.log("Album: $(response.tracks.items[i].album.name}");
                            console.log("\n---------------------");
                        }
                        fs.appendFile("log.txt", "\nSong: ${data}", function (error) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log("Song ${data.toUpperCase()} added to log.txt");
                            }
                        });
                    })
            })
        }
        else if (res.choice === "movie-this") {
            console.log("\n---------------------");
            console.log("\nHello ${res.username}");
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
                            console.log("Title: ${response.data.Title");
                            console.log("Year: ${response.data.Year}");
                            console.log("IMDB Rating: ${response.data.imdbRating");
                            console.log("Rotten Tomatoes Rating: ${response.data.tomatoRating");
                            console.log("Country: ${response.data.Country}");
                            console.log("Language: ${response.data.Language}");
                            console.log("Plot: ${response.data.Plot}");
                            console.log("Actors: ${response.data.Actors}");
                            console.log("\n---------------------");
                        }
                    )
                    fs.appendFile("log.txt", "\nMovie: ${'Mr.Nobody'}", function (error) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log("Movie ${'Mr.Nobody'} appended to log.txt")
                        }
                    });
                }
                else {
                    let omdbMovie = function () {
                        axios.get("http://www.omdbapi.com/?t=" + result.movie + "&y=&plot=short&apikey=trilogy").then(
                            function (response) {
                                if (response.data.Error) {
                                    console.log("Movie no found");
                                }
                                else if (result.movie) {
                                    console.log("\n---------------------");
                                    console.log("Title: ${response.data.Title");
                                    console.log("Year: ${response.data.Year}");
                                    console.log("IMDB Rating: ${response.data.imdbRating");
                                    console.log("Rotten Tomatoes Rating: ${response.data.tomatoRating");
                                    console.log("Country: ${response.data.Country}");
                                    console.log("Language: ${response.data.Language}");
                                    console.log("Plot: ${response.data.Plot}");
                                    console.log("Actors: ${response.data.Actors}");
                                    console.log("\n---------------------");
                                }
                            }
                        )
                    }
                    omdbMovie();
                    fs.appendFile("log.txt", "\nMovie: ${result.movie}", function (error) {
                        if (error) {
                            console.log(error);
                        }
                        else {
                            console.log("Movie ${result.movie.toUpperCase()} appended to log.txt");
                        }
                    });
                }
            })
        }
    })