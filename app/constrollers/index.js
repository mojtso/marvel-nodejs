exports.get_characters = (req, res) => {

    let character = {
        id: 1011297,
        name: "Agent Brand",
        description: "Test description",
        modified: "2013-10-24T13:09:30-0400",
        thumbnail: {
            path: "http://i.annihil.us/u/prod/marvel/i/mg/4/60/52695285d6e7e",
            extension: "jpg"
        }
    }

    var characters = [];
    characters.push(character);

    res.status(200).json({ characters });
};