import React, { useState, useCallback } from "react";

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
  const [clickedBook, setClickedBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [filtered, setFiltered] = useState([]);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleFormSubmit = (value) => {
    setLoading(true);
    API.searchForBooks(value)
      .then((res) => {
        console.log(res.data);
        setSearchResult(res.data);
        setLoading(false);
        setCurrentPage(1); // ressetting the pagination back to the first page on every new search.
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  // setting up and slicing out a page from the results
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  let slicedPage = 0;
  if (filtered.length <= 0 && searchResult.length <= 0) {
    // checking for results to slice or not.
    slicedPage = searchResult.slice(indexOfFirstPost, indexOfLastPost);
  }
  if (filtered.length > 0) {
    // checking whether to slice based on any filters or not.
    slicedPage = filtered.slice(indexOfFirstPost, indexOfLastPost);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleBookModal = (id) => {
    const bookIndex = searchResult.findIndex((b) => {
      return b.id === id;
    });
    const book = {
      ...searchResult[bookIndex],
    };
    console.log(book);
    setModal(true);
    setClickedBook(book);
  };

  const modalToggleHandler = () => {
    setModal(!modal);
  };

  const bookFilterHandler = useCallback(
    (filterValue) => {
      const filteredBook = searchResult;
      switch (filterValue) {
        case "all":
          setFiltered(filteredBook);
          break;
        case "available":
          setFiltered(
            filteredBook.filter(
              (book) => book.saleInfo.saleability !== "NOT_FOR_SALE"
            )
          );
          break;
        case "na":
          setFiltered(
            filteredBook.filter(
              (book) => book.saleInfo.saleability !== "FOR_SALE"
            )
          );
          break;
        default:
          return null;
      }
      setCurrentPage(1);
    },
    [searchResult]
  );

  const addToCartHandler = (e, book) => {
    e.preventDefault();
    setAddingToCart(true);
    API.addToCart(book)
      .then((res) => {
        console.log(res);
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
        setFiltered(newresults);
        setAddingToCart(false);
      })
      .catch((err) => {
        console.log(err);
        setAddingToCart(false);
      });
  };

  let booksDetails = null;
  if (modal) {
    booksDetails = (
      <BookDetails
        bookDetails={clickedBook}
        toggle={modalToggleHandler}
        addToCart={() => addToCartHandler(clickedBook)}
      />
    );
  }

  return (
    <MainBody>
      <Modal clicked={modalToggleHandler} show={modal}>
        {booksDetails}
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
        adding={addingToCart}
        addToCart={(e, book) => addToCartHandler(e, book)}
        loading={loading}
        toggleModal={handleBookModal}
        bookResults={slicedPage}
      />
    </MainBody>
  );
};

export default BookSearch;
