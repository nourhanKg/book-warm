import React from "react";
import { getSession } from "next-auth/react";
const mylist = function ({ list }) {
  return (
    <ul>
      {list.map((book) => {
        return (
          <li key={book._id}>
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
          </li>
        );
      })}
    </ul>
  );
};
export default mylist;
export async function getServerSideProps(context) {
  console.log("from list");
  const session = await getSession(context);
  let list = [];
  if (session) {
    list = session.user.favorites;
    return {
      props: {
        list,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackurl=http://localhost:3000/books/mylist`,
        permanent: false,
      },
    };
  }
}
