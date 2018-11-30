let request = require('request');
let md5 = require('md5');

exports.get_characters = (req, res) => {

    const marvel_url = "https://gateway.marvel.com/v1/public/characters";
    const apiKey = "60a07f6996f6157b689898fc65f03be9"
    const privateKey = "f73672ce2f8f9b88e855722dee6461316678b4b4";

    // Set the headers
    var headers = {
        'content-type': 'application/json',
    }

    // Configure the request
    let date = new Date();
    let hash = md5(date+privateKey+apiKey);

    var options = {
        url: marvel_url,
        method: 'GET',
        headers: headers,
        qs: {
            'apikey': apiKey, 
            'ts': date+"",
            'hash': hash
        }
    }

    // Start the request
    request(options, function (error, response, body) {
        if (error) {
            res.statusCode(400).json({message: error});
        }

        if(response.statusCode >= 200 && response.statusCode <= 500) {
            var newJson = JSON.parse(body);
            var characters = [];

            for(var i = 0; i <  newJson.data.results.length; i++) {
                characters.push({
                    id: newJson.data.results[i].id,
                    name: newJson.data.results[i].name,
                    description: newJson.data.results[i].description,
                    modified: newJson.data.results[i].modified,
                    thumbnail: newJson.data.results[i].thumbnail
                });
            }
            res.status(200).json(characters);
        }
    });
};