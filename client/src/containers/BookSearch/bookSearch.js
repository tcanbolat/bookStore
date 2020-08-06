import React, { useState } from "react";

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
    const sorted = [...searchResult].sort((a, b) =>
      a.saleInfo.saleability > b.saleInfo.saleability ? 1 : -1
    );
    setSearchResult(sorted);
    console.log(sorted);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = searchResult.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={searchResult.length}
        paginate={paginate}
      />
      <SearchResults
        toggleBy={bookOrderToggle}
        loading={loading}
        toggleModal={handleBookModal}
        bookResults={currentPosts}
      />
    </div>
  );
};

export default BookSearch;
