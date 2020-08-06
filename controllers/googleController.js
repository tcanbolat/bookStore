const axios = require("axios");
module.exports = {
  findAll: function (req, res) {
    const startIndex = ["1", "41", "81", "121"];
    let allResults = [];
    const bookRequests = [];

    for (i = 0; i < startIndex.length; i++) {
      bookRequests.push(
        axios
          .get(
            "https://www.googleapis.com/books/v1/volumes?q=" +
              req.query.q +
              "&maxResults=40&startIndex=" +
              startIndex[i]
          )
          .then((results) => {
            // console.log(results.data.items)
            if (!results.data.items) return res.json(0);
            return results.data.items.filter(
              (result) =>
                result.volumeInfo.title &&
                result.volumeInfo.infoLink &&
                result.volumeInfo.authors &&
                result.volumeInfo.description &&
                result.volumeInfo.imageLinks &&
                result.volumeInfo.imageLinks.thumbnail
            );
          })
          .then((books) => {
            allResults = [...allResults, ...books]
          })
      );
    }

    Promise.all(bookRequests).then(() => {
      const removeDuplicates = new Map(allResults.map((o) => [o.id, o]));
      const newResults = [...removeDuplicates.values()];
      res.json(newResults);
    }).catch(err => {
      res.json(err);
    })
  },
};
