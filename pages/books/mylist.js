import React from "react";
import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
const mylist = function ({ list }) {
  const [updated, setUpdated] = useState(list);
  const { data: session, status } = useSession();
  let user;
  if (status === "authenticated") {
    user = session.user;
  }
  const updateBook = async function (e) {
    const currentPage = e.target.parentElement.children[0].value;
    const bookId = e.target.dataset.id;
    const res = await fetch(`/api/users/${user._id}/${bookId}`, {
      method: "PATCH",
      body: JSON.stringify({ currentPage }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res2 = await fetch(`/api/users/${user._id}`);
    const data = await res2.json();
    setUpdated(data.list);
  };
  const removeBook = async function (e) {
    const bookId = e.target.dataset.id;
    const res = await fetch(`/api/users/${user._id}/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res2 = await fetch(`/api/users/${user._id}`);
    const data = await res2.json();
    setUpdated(data.list);
  };
  return (
    <div className="container my-5">
      <ul className="row list-unstyled">
        {updated.map((book) => {
          return (
            <li key={book._id} className="col-12 mb-5 col-md-6 col-lg-4 px-2">
              <div>
                <div className="card">
                  <img
                    src={book.imageLink}
                    className="card-img-top"
                    height="500px"
                    alt="..."
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5
                        className="card-title h2"
                        style={{ color: "#5B7C99" }}
                      >
                        {book.title}
                      </h5>
                    </div>
                    <p className="card-text fs-6 text fst-italic fw-bold mb-1">
                      {book.author}
                    </p>
                    <span
                      className="card-text fs-6"
                      style={{ color: "#D2918C" }}
                    >
                      {book.language}
                    </span>
                    <p className="card-text fs-6 mb-1">{book.country}</p>
                    <span
                      className="card-text d-block fs-6 mb-1"
                      style={{ color: "#D2918C" }}
                    >
                      {book.year}
                    </span>
                    <p className="card-text fs-6 mb-1">
                      Num of pages:{" "}
                      <span
                        className="fw-bold fst-italic"
                        style={{ color: "#5B7C99" }}
                      >
                        {book.pages}
                      </span>
                    </p>
                    <p className="card-text fs-6 mb-1">
                      Current page:{" "}
                      <span
                        className="fw-bold fst-italic"
                        style={{ color: "#5B7C99" }}
                      >
                        {book.currentPage}
                      </span>
                    </p>
                    <progress
                      id="file"
                      value={book.currentPage}
                      max={book.pages}
                    >
                      {" "}
                      32%{" "}
                    </progress>
                    <br></br>
                    <a href={book.link} className="btn btn-warning bg-gradient">
                      About
                    </a>
                    <button
                      className="btn btn-danger bg-gradient ms-3"
                      data-ID={book._id}
                      onClick={removeBook}
                    >
                      Remove
                    </button>
                    <br></br>
                    <label className="text-dark my-2">Update progress</label>
                    <div className="input-group mb-3">
                      <input
                        type="text"
                        defaultValue={book.currentPage}
                        className="form-control"
                        aria-label="Recipient's username"
                        aria-describedby="button-addon2"
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="button"
                        id="button-addon2"
                        onClick={updateBook}
                        data-ID={book._id}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default mylist;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  let list = [];
  if (session) {
    const user = session.user;
    const res = await fetch(`http://localhost:3000/api/users/${user._id}`);
    const data = await res.json();
    list = data.list;
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
