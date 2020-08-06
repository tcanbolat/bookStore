import React, { useState } from "react";

import classes from "./bookSearch.module.css";
import API from "../../utils/API";
import SearchForm from "./SearchForm/SearchForm";
import SearchResults from "../../components/SearchResults/searchReults";
import Modal from "../../components/UI/Modal/modal";
import BookDetails from "../../components/BookDetails/bookDetails";
import searchResults from "../../components/SearchResults/searchReults";

const BookSearch = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [modal, setModal] = useState(false);
  const [clickedBook, setClickedBook] = useState({});
  const [loading, setLoading] = useState(false);

  let booksDetails = null;

  const handleFormSubmit = (value) => {
    setLoading(true);
    API.getBooks(value)
      .then((res) => {
        console.log(res.data);
        setSearchResult(res.data);
        setLoading(false);
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
    const sorted = [...searchResult].sort((a, b) => (a.saleInfo.saleability > b.saleInfo.saleability) ? 1 : -1);
    setSearchResult(sorted);
    console.log(sorted)
  }

  if (modal) {
    booksDetails = (
      <BookDetails
        title={clickedBook.volumeInfo.title}
        subtitle={clickedBook.volumeInfo.subtitle}
        description={clickedBook.volumeInfo.description}
        authors={clickedBook.volumeInfo.authors}
        pageCount={clickedBook.volumeInfo.pageCount}
        previewLink={clickedBook.volumeInfo.previewLink}
        publishedDate={clickedBook.volumeInfo.publishedDate}
      />
    );
  }

  return (
    <div className={classes.Container}>
      <Modal clicked={toggleHandler} show={modal}>
        {booksDetails}
      </Modal>
      <SearchForm submitForm={handleFormSubmit} />
      <SearchResults
      toggleBy={bookOrderToggle}
        loading={loading}
        toggleModal={handleBookModal}
        bookResults={searchResult}
      />
    </div>
  );
};

export default BookSearch;
