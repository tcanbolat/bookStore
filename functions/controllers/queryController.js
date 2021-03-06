const axios = require("axios");

module.exports = {
  searchForBooks: (req, res) => {
    const request = req.query.q;
    // The startIndex is to help define what index to start from each loop.
    const startIndex = ["1", "41", "81", "121"];
    const allResults = [];
    const bookRequests = [];

    // for-loop used to loop around however many indexes in startIndex.
    // Google books api limits a max result of 40 per request.
    // in the URL you can set a StartIndex and that is configured to bring the next set of 40 results each loop.
    for (i = 0; i < startIndex.length; i++) {
      bookRequests.push(
        axios
          .get(
            // google books api url
            "https://www.googleapis.com/books/v1/volumes?q=" +
              // the request is coming from the client as a book title.
              request +
              // the most you can set maxResults to in the URL, is 40.
              "&maxResults=40&startIndex=" +
              // each loop, the StartIndex goes up by 40.
              startIndex[i] +
              "&country=US"
          )
          .then((resultSet) => {
            // filtering out any results that dont contian the following values.
            return resultSet.data.items.filter(
              (setOfBooks) =>
                setOfBooks.volumeInfo.title &&
                setOfBooks.volumeInfo.infoLink &&
                setOfBooks.volumeInfo.authors &&
                setOfBooks.volumeInfo.description &&
                setOfBooks.volumeInfo.imageLinks &&
                setOfBooks.volumeInfo.imageLinks.thumbnail
            );
          })
          .then((booksArraySet) => {
            // maping results into the allResults array for each loop
            // maping first before pushing to avoid nested arrays.
            booksArraySet.map((object) => {
              allResults.push(object);
            });
          })
          .catch((error) => {
            res.status(error.response.status).json("Error: " + error);
          })
      );
    }

    // Promise that will wait unitl the for loop is finished.
    Promise.all(bookRequests)
      .then(() => {
        // taking the allResults array and removing any duplicate objects by referencing the object id.
        // this tested to be the fastest (large and small data sets) compared to using new Set(); or reducer(); functions.
        // mapping also keeps the list order the same.
        const uniqueResults = [
          ...new Map(allResults.map((object) => [object.id, object])).values(),
        ];

        // ****************************************************************
        // **** HELPER FUNCTION TO CHECK IF THE uniqueResults map WORKED OR NOT. ****
        // **** IF IT WORKED, uniqueResults.length & uniqueValues.size should be the same.
        // console.log("ALL RESULTS ARRAY: " + allResults.length);
        // console.log("UNIQUE RESULTS ARRAY: " + uniqueResults.length);
        // const uniqueValues = new Set(uniqueResults.map((o) => o.id));
        // console.log("UNIQUE CHECK: " + uniqueValues.size);
        // ****************************************************************

        // checking the uniqueResults array to see if any of the search reuslts are saved in the cart database.
        axios
          .get(
            JSON.parse(process.env.FIREBASE_CONFIG).databaseURL + "/cart.json"
          )
          .then((response) => {
            const cartArray = [];
            // pushing the response from the database into cartArray.
            for (let key in response.data) {
              cartArray.push({ ...response.data[key] });
            }
            // for however many object are in the caryArray...
            for (let i = 0; i < cartArray.length; i++) {
              // check it with uniqueResults and return any that match, by the same id.
              const bookIndex = uniqueResults.findIndex((b) => {
                return b.id === cartArray[i].id && cartArray[i].inCart === true;
              });
              // defining the pulled object
              const book = {
                ...uniqueResults[bookIndex],
              };
              // and adding these two values to it
              book["inCart"] = true;
              book["count"] = cartArray[i].count;

              // updating the uniqueResults array with the book we just added values to.
              uniqueResults[bookIndex] = book;
            }
            // sending the result to client side
            res.json(uniqueResults);
          });
      })
      .catch((error) => {
        res.status(error.response.status).json("Error: " + error);
      });
  },
};
