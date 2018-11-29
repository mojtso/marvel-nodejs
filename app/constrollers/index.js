let request = require('request');
let md5 = require('md5');

exports.get_characters = (req, res) => {

    const marvel_url = "https://gateway.marvel.com/v1/public/characters";
    const privateKey = "f73672ce2f8f9b88e855722dee6461316678b4b4";

    // Set the headers
    var headers = {
        'Content-Type':     'application/x-www-form-urlencoded',
    }

    // Configure the request
    let date = new Date();
    console.log(date+'');

    var options = {
        url: marvel_url,
        method: 'GET',
        headers: headers,
        qs: {
            'apikey': '60a07f6996f6157b689898fc65f03be9', 
            'ts': date+'',
            'hash': md5(privateKey)
        }
    }

    // Start the request
    request(options, function (error, response, body) {
        if (error) {
            console.log(error);
        }

        if(response.statusCode >= 200 && response.statusCode <= 500) {
            console.log(body)
        }
    });

    

    res.status(200).json({ });
};

/*

var characters = [];
    characters.push(character_1);
    characters.push(character_2);

let character_1 = {
        id: 1,
        name: "Agent Brand",
        description: "Test description",
        modified: "2013-10-24T13:09:30-0400",
        thumbnail: {
            path: "http://i.annihil.us/u/prod/marvel/i/mg/4/60/52695285d6e7e",
            extension: "jpg"
        }
    }

    let character_2 = {
        id: 2,
        name: "Test Lastname",
        description: "Test Also",
        modified: "2013-10-24T13:09:30-0400",
        thumbnail: {
            path: "http://i.annihil.us/u/prod/marvel/i/mg/4/60/52695285d6e7e",
            extension: "jpg"
        }
    }

 */