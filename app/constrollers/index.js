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
            
            newJson.data.results.forEach(element => {
                characters.push({
                    id: element.id,
                    name: element.name,
                    description: element.description,
                    modified: element.modified,
                    thumbnail: element.thumbnail
                });
            });
            res.status(200).json(characters);
        }
    });
};