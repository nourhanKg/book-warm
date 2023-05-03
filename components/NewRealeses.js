import React from "react";
import Link from "next/link";
import { useState } from "react";
import { BsBookmarksFill, BsCheckAll } from "react-icons/bs";
const NewBooks = function (props) {
  const { books } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const addToFavorites = function () {
    console.log("added to favorites");
  };
  return (
    <>
      <h2 className="h1 text-center my-5" style={{ color: "#5B7C99" }}>
        New Realeses
      </h2>
      <div className="row my-5">
        {books.map((book) => {
          return (
            <div className="col-12 mb-5 col-md-6 col-lg-4 px-5">
              <div className="card">
                <img src={book.imageLink} class="card-img-top" alt="..." />
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title h2" style={{ color: "#5B7C99" }}>
                      {book.title}
                    </h5>
                    <button className="btn fs-4" onClick={addToFavorites}>
                      {isFavorite ? (
                        <BsCheckAll></BsCheckAll>
                      ) : (
                        <BsBookmarksFill></BsBookmarksFill>
                      )}
                    </button>
                  </div>
                  <p className="card-text fs-6 text fst-italic fw-bold mb-1">
                    {book.author}
                  </p>
                  <span className="card-text fs-6" style={{ color: "#D2918C" }}>
                    {book.language}
                  </span>
                  <p className="card-text fs-6">{book.country}</p>
                  <button className="btn btn-warning">
                    <Link
                      className="text-light text-decoration-none"
                      href={`/books/${book._id}`}
                    >
                      Details
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default NewBooks;
