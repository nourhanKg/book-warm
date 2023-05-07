import React from "react";
import { getSession, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { BsBookmarksFill, BsCheckAll } from "react-icons/bs";
const bookId = function ({ book }) {
  const { data: session, status } = useSession();
  let user;
  if (status === "authenticated") {
    user = session.user;
  }
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    const checkBook = async () => {
      try {
        if (user && book) {
          const response = await fetch(`/api/users/${user._id}/${book._id}`);
          if (response.ok) {
            const data = await response.json();
            setIsFavorite(data.isFavorite);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkBook();
  }, [user, book]);
  const addToFavorites = async function () {
    const res = await fetch(`/api/users/${user._id}`, {
      method: "POST",
      body: JSON.stringify({ ...book }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsFavorite(true);
    const data = await res.json();
  };
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 col-lg-4 col-md-7">
          <img className="img-fluid" height="400px" src={book.imageLink}></img>
        </div>
        <div className="col-12 col-lg-6 col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title h2" style={{ color: "#5B7C99" }}>
                  {book.title}
                </h5>
                <button
                  disabled={isFavorite}
                  className="btn fs-4"
                  onClick={addToFavorites}
                >
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
              <p className="card-text fs-6 mb-1">{book.country}</p>
              <p className="card-text fs-6 mb-1">
                Num of pages:{" "}
                <span
                  className="fw-bold fst-italic"
                  style={{ color: "#5B7C99" }}
                >
                  {book.pages}
                </span>
              </p>
              <span
                className="card-text d-block fs-6 mb-1"
                style={{ color: "#D2918C" }}
              >
                {book.year}
              </span>
              <a href={book.link} className="btn btn-warning bg-gradient">
                About
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default bookId;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { params } = context;
  if (session) {
    const res = await fetch(`http://localhost:3000/api/books/${params.bookId}`);
    const JSONData = await res.json();
    const book = JSONData.data.book;
    return {
      props: {
        book: book,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackurl=http://localhost:3000/books/${params.bookId}`,
        permanent: false,
      },
    };
  }
}
