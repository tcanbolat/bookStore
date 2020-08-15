const axios = require("axios");
module.exports = {
  findAll: (req, res) => {
    const request = req.query.q;
    const startIndex = ["1", "41", "81", "121"];
    const allResults = [];
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
          .then((booksArray) => {
            booksArray.map((results) => {
              allResults.push(results);
            });
          })
          .catch((err) => {
            res.json(err);
          })
      );
    }

    Promise.all(bookRequests)
      .then(() => {
        const uniqueResults = allResults.filter((item, index) => {
          return allResults.indexOf(item.id) !== index.id;
        });
        axios
          .get("https://bookstore-709eb.firebaseio.com/cart.json")
          .then((response) => {
            const array = [];
            for (let key in response.data) {
              array.push({ ...response.data[key] });
            }
            for (let i = 0; i < array.length; i++) {
              const bookIndex = uniqueResults.findIndex((b) => {
                return b.id === array[i].id;
              });
              const book = {
                ...allResults[bookIndex],
              };

              book["inCart"] = true;

              uniqueResults[bookIndex] = book;
            }
            res.json(uniqueResults);
            console.log(uniqueResults);
          });
      })
      .catch((err) => {
        res.json(err);
      });
  },
};
