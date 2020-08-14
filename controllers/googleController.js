const axios = require("axios");
module.exports = {
  findAll: (req, res) => {
    const request = req.query.q;
    const startIndex = ["1", "41", "81", "121"];
    let allResults = [];
    const bookRequests = [];

    for (i = 0; i < startIndex.length; i++) {
      bookRequests.push(
        axios
          .get(
            "https://www.googleapis.com/books/v1/volumes?q=" +
            request +
              "&maxResults=40&startIndex=" +
              startIndex[i]
          )
          .then((results) => {
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
          }).catch((err) => {
            res.json(err);
          })
      );
    }

    Promise.all(bookRequests).then(() => {
      const removeDuplicates = new Map(allResults.map((o) => [o.id, o]));
      const newResults = [...removeDuplicates.values()];
      // console.log(newResults.title); // try to sort book by title  that matches request.
      res.json(newResults);
    }).catch(err => {
      res.json(err);
    })
  },
};
