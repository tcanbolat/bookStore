import React, { useState, useEffect } from "react";

import classes from "./bookSearch.module.css";
import API from "../../utils/API";
import SearchForm from "./SearchForm/SearchForm";
import SearchResults from "../../components/SearchResults/searchReults";
import Modal from "../../components/UI/Modal/modal";
import BookDetails from "../../components/BookDetails/bookDetails";
import Pagination from "../../components/Pagination/Pagination";

const BookSearch = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [modal, setModal] = useState(false);
  const [clickedBook, setClickedBook] = useState({});
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(20);

  let slicedResults = null;
  let booksDetails = null;

  const handleFormSubmit = (value) => {
    setLoading(true);
    API.getBooks(value)
      .then((res) => {
        console.log(res.data);
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

  const bookOrderToggle = () => {
    const sorted = [...searchResult].sort((a, b) =>
      a.saleInfo.saleability > b.saleInfo.saleability ? 1 : -1
    );
    setSearchResult(sorted);
    setCurrentPage(1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  if (searchResult === 0) {
    slicedResults = 0;
  } else {
    slicedResults = searchResult.slice(indexOfFirstPost, indexOfLastPost);
  }

  useEffect(() => {}, [setCurrentPage]);

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
      <SearchForm submitForm={handleFormSubmit} />
      <Pagination
        loading={loading}
        postsPerPage={postsPerPage}
        totalPosts={searchResult.length}
        currentPage={currentPage}
        paginate={paginate}
      />
      <SearchResults
        addToCart={addToCartHandler}
        toggleBy={bookOrderToggle}
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
