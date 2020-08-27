import React, { useState, useEffect } from "react";

import classes from "./bookSearch.module.css";
import Aux from "../../hoc/Auxillary/Auxillary";
import API from "../../utils/API";
import SearchForm from "./SearchForm/SearchForm";
import SearchResults from "../../components/SearchResults/searchReults";
import Modal from "../../components/UI/Modal/modal";
import BookDetails from "../../components/BookDetails/bookDetails";
import Pagination from "../../components/Pagination/Pagination";
import Filters from "./Filters/Filters";
import MainBody from "../../components/MainBody/MainBody";
import OrderLink from "../../components/Navigation/OrdersLink/OrderLink";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import instance from "../../utils/axios-instance";

const BookSearch = () => {
  // the results from the search API are stored here.
  const [searchResult, setSearchResult] = useState([]);
  // modal toggle
  const [modal, setModal] = useState(false);
  // saving a state of the object that was clicked on.
  const [clickedBook, setClickedBook] = useState();
  // loading state to set Spinner or not
  const [loading, setLoading] = useState(false);
  // state that stores the current page number
  // used in the Pagination component and useEffect();
  const [currentPage, setCurrentPage] = useState(1);
  // state that detirmens how many results per page; currently set at 20.
  const [postsPerPage] = useState(20);
  // state of the searchResults that has been filtered
  const [filtered, setFiltered] = useState([]);
  // the state of the sliced page is determined by the currentPage sate and filtered state.
  // this is what ultimately gets passed down to searchResults component to get rendered.
  const [slicedPage, setSlicedPage] = useState(0);
  const [filter, setFilter] = useState("all");

  console.log(filtered);
  // this effect controls slicedPage state
  // it listens to see if searchResults or filtered states have changed.
  useEffect(() => {
    // setting up and slicing out a page from the results
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    if (filtered.length <= 0) {
      // if no filters have been set, slice from the searchResults state.
      setSlicedPage(searchResult.slice(indexOfFirstPost, indexOfLastPost));
    }
    // if so, slice it from the filtered state.
    setSlicedPage(filtered.slice(indexOfFirstPost, indexOfLastPost));
  }, [filtered, searchResult, postsPerPage, currentPage]);

  // this effect listens to the filter value and filters the results baesd on the value.
  useEffect(() => {
    // creating a copy of the results state.
    const books = searchResult;
    // switch case for the chosen filter state.
    switch (filter) {
      case "all":
        // setting the filtered state to the searchResults state.
        setFiltered(searchResult);
        break;
      case "available":
        // setting the filtered state by filtering out any items that do have a not for sale value.
        setFiltered(
          books.filter((book) => book.saleInfo.saleability !== "NOT_FOR_SALE")
        );
        break;
      case "na":
        // setting the filtered state by filtering out any items that do not have a not for sale value.
        setFiltered(
          books.filter((book) => book.saleInfo.saleability === "NOT_FOR_SALE")
        );
        break;
      default:
        return null;
    }
  }, [searchResult, filter]);

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
    const bookIndex = filtered.findIndex((b) => {
      return b.id === id;
    });
    // defines the book that was found
    const book = {
      ...filtered[bookIndex],
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
  const bookFilterHandler = (filterValue) => {
    // if the filter value is not the same as the state, then set the page back to one.
    if (filter !== filterValue) {
      // this if check helps stay on the current page when a book is added to the cart but also helps
      // reset the page back to one when a new value is selected.
      setCurrentPage(1);
    }
    // set the filter value chosen to the filter state.
    setFilter(filterValue);
  };

  const addToCartHandler = (e, book) => {
    e.preventDefault();
    // setAdding(true);
    const bookIndex = searchResult.findIndex((b) => {
      return b.id === book.id;
    });
    const added = {
      ...searchResult[bookIndex],
    };
    added["adding"] = true;
    const newresults = [...searchResult];
    newresults[bookIndex] = added;
    setClickedBook(added);
    setSearchResult(newresults);
    // API call to save a book to the database.
    API.addToCart(book)
      .then(() => {
        // on success, it updates the item from the current state.
        added["count"] = 1;
        added["inCart"] = true;
        added["adding"] = false;
        const newresults = [...searchResult];
        newresults[bookIndex] = added;
        // setting the results with the updated object.
        setClickedBook(added);
        setSearchResult(newresults);
        // setFiltered(newresults);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Aux>
      <OrderLink />
      <MainBody>
        <Modal clicked={modalToggleHandler} show={modal}>
          {clickedBook ? (
            <BookDetails
              bookDetails={clickedBook}
              toggle={modalToggleHandler}
              addToCart={(e, book) => addToCartHandler(e, book)}
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
        />
      </MainBody>
    </Aux>
  );
};

export default withErrorHandler(BookSearch, instance);
