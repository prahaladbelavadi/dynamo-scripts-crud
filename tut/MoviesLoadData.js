var AWS = require("aws-sdk");
var fs = require('fs');


AWS.config.update({
    region: "us-east-1",
    endpoint: 'http://localhost:8000'
});


var docClient = new AWS.DynamoDB.DocumentClient();

console.log('Importing movies inot DynamoDB!');

var allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));

allMovies.forEach((movie) => {
    var params = {
        TableName: "Movies",
        Item: {
            "year": movie.year,
            "title": movie.title,
            "info": movie.info
        }
    };

    docClient.put(params, (err, data) => {
        if (err) {
            console.error("unable to add movie", movie.title, ".Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("PUT item successed: ", movie.title);
        }
    });

});


