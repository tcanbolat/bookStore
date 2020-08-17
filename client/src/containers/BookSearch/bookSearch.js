import React, { useState, useCallback, useEffect } from "react";

import classes from "./bookSearch.module.css";
import API from "../../utils/API";
import SearchForm from "./SearchForm/SearchForm";
import SearchResults from "../../components/SearchResults/searchReults";
import Modal from "../../components/UI/Modal/modal";
import BookDetails from "../../components/BookDetails/bookDetails";
import Pagination from "../../components/Pagination/Pagination";
import Filters from "./Filters/Filters";
import MainBody from "../../components/MainBody/MainBody";

const BookSearch = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [modal, setModal] = useState(false);
  const [clickedBook, setClickedBook] = useState();
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [filtered, setFiltered] = useState([]);
  const [slicedPage, setSlicedPage] = useState(0);

  useEffect(() => {
    // setting up and slicing out a page from the results
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    if (filtered.length <= 0 && searchResult.length <= 0) {
      // checking for results to slice or not.
      setSlicedPage(searchResult.slice(indexOfFirstPost, indexOfLastPost));
    }
    if (filtered.length > 0) {
      // checking whether to slice based on any filters or not.
      setSlicedPage(filtered.slice(indexOfFirstPost, indexOfLastPost));
    }
  }, [filtered, searchResult, postsPerPage, currentPage]);

  const handleFormSubmit = (value) => {
    setLoading(true); // set loading to make Spinner appear right before making the API call.
    API.searchForBooks(value)
      .then((res) => {
        setSearchResult(res.data); // setting the results to the searchResults state.
        setLoading(false); // on Success, setting loading to false to remove Spinner.
        setCurrentPage(1); // re-setting the pagination back to the first page on every new search.
      })
      .catch((error) => {
        console.log(error);
        setLoading(false); // on Error, setting the loading to false as well to remove Spinner.
      });
  };

  // this is linked to the paginate component that gives the current page clicked on
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // this is being used by the SearchResults component to give the id of the booked that was clicked on.
  const handleBookModal = (id) => {
    // it looks in searchResult state to find the book by the id passed to it.
    const bookIndex = searchResult.findIndex((b) => {
      return b.id === id;
    });
    // defines the book that was found
    const book = {
      ...searchResult[bookIndex],
    };
    // sets the modal to true and sets the clicked book state to the book that was found by id.
    setModal(true);
    setClickedBook(book);
  };

  const modalToggleHandler = () => {
    // setting the modal to what it is not.
    setModal(!modal);
  };

  // filterValue is coming from the Filter component.
  // Filter component is using useEffect(); so bookFilterHandler is
  // wrapped around a useCallback(); that returns a memoized version to the Filter component in order to prevent an infinite loop.
  const bookFilterHandler = useCallback(
    (filterValue) => {
      switch (filterValue) {
        case "all":
          setFiltered(searchResult);
          break;
        case "available":
          setFiltered(
            searchResult.filter(
              (book) => book.saleInfo.saleability !== "NOT_FOR_SALE"
            )
          );
          setCurrentPage(1);
          break;
        case "na":
          setFiltered(
            searchResult.filter(
              (book) => book.saleInfo.saleability !== "FOR_SALE"
            )
          );
          setCurrentPage(1);
          break;
        default:
          return null;
      }
    },
    [searchResult]
  );

  const addToCartHandler = (e, book) => {
    e.preventDefault();
    setAdding(true);
    e.target.innerHTML = "Adding...";
  // API call to save a book to the database.
    API.addToCart(book)
      .then(() => {
        // on success, instead of making another api call to the server it updates the item from the current state.
        // since we got a successfull response from the server it can change the state accordingly.
        const bookIndex = filtered.findIndex((b) => {
          return b.id === book.id;
        });
        const added = {
          ...filtered[bookIndex],
        };
        added["count"] = 1;
        added["inCart"] = true;
        const newresults = [...filtered];
        newresults[bookIndex] = added;
        // setting the results with the updated object.
        setAdding(false);
        setClickedBook(added);
        setSearchResult(newresults);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainBody>
      <Modal clicked={modalToggleHandler} show={modal}>
        {clickedBook ? (
          <BookDetails
            bookDetails={clickedBook}
            toggle={modalToggleHandler}
            addToCart={(e, book) => addToCartHandler(e, book)}
            adding={adding}
          />
        ) : null}
      </Modal>
      <div className={classes.SearchArea}>
        <SearchForm submitForm={handleFormSubmit} />
        <Filters loading={loading} filterBy={bookFilterHandler} />
      </div>
      {
        <Pagination
          loading={loading}
          postsPerPage={postsPerPage}
          totalPosts={
            filtered.length === undefined
              ? searchResult.length
              : filtered.length
          }
          currentPage={currentPage}
          paginate={paginate}
        />
      }
      <SearchResults
        addToCart={(e, book) => addToCartHandler(e, book)}
        loading={loading}
        toggleModal={handleBookModal}
        bookResults={slicedPage}
        adding={adding}
      />
    </MainBody>
  );
};

export default BookSearch;
