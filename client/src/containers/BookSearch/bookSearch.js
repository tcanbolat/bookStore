import React, { useState, useEffect } from "react";

import classes from "./bookSearch.module.css";
import API from "../../utils/API";
import SearchForm from "./SearchForm/SearchForm";
import SearchResults from "../../components/SearchResults/searchReults";
import Modal from "../../components/UI/Modal/modal";
import BookDetails from "../../components/BookDetails/bookDetails";
import Pagination from "../../components/Pagination/Pagination";
import Filters from "./Filters/Filters";

const BookSearch = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [modal, setModal] = useState(false);
  const [clickedBook, setClickedBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);
  const [filtered, setFiltered] = useState([]);

  let slicedResults = null;
  let booksDetails = null;

  const handleFormSubmit = (value) => {
    setLoading(true);
    API.getBooks(value)
      .then((res) => {
        setFiltered([]);
        setSearchResult(res.data);
        setLoading(false);
        setCurrentPage(1);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

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

  const toggleHandler = () => {
    setModal(!modal);
  };

  const bookFilterHandler = (e) => {
    const results = [...searchResult];
    switch (e) {
      case "all":
        setFiltered(results);
        break;
      case "available":
        setFiltered(
          results.filter((book) => book.saleInfo.saleability !== "NOT_FOR_SALE")
        );
        break;
      case "na":
        setFiltered(
          results.filter((book) => book.saleInfo.saleability !== "FOR_SALE")
        );
        break;
      default:
        return null;
    }
    setCurrentPage(1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  if (searchResult === 0) {
    slicedResults = 0;
  } else if (filtered.length <= 0) {
    const results = searchResult;
    slicedResults = results.slice(indexOfFirstPost, indexOfLastPost);
  } else {
    const results = filtered;
    slicedResults = results.slice(indexOfFirstPost, indexOfLastPost);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const moddleToggleHandler = () => {
    setModal(!modal);
  };

  const addToCartHandler = () => {
    alert("ADDED TO CART!!!");
  };

  if (modal) {
    booksDetails = (
      <BookDetails
        bookDetails={clickedBook}
        toggle={moddleToggleHandler}
        addToCart={addToCartHandler}
      />
    );
  }

  return (
    <div className={classes.Container}>
      <Modal clicked={toggleHandler} show={modal}>
        {booksDetails}
      </Modal>
      <div className={classes.SearchArea}>
        <SearchForm submitForm={handleFormSubmit} />
        <Filters loading={loading} filterBy={(e) => bookFilterHandler(e)} />
      </div>
      <Pagination
        loading={loading}
        postsPerPage={postsPerPage}
        totalPosts={filtered.length > 0 ? filtered.length : searchResult.length}
        currentPage={currentPage}
        paginate={paginate}
      />
      <SearchResults
        addToCart={addToCartHandler}
        loading={loading}
        toggleModal={handleBookModal}
        bookResults={slicedResults}
      />
      <Pagination
        loading={loading}
        postsPerPage={postsPerPage}
        totalPosts={searchResult.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </div>
  );
};

export default BookSearch;
