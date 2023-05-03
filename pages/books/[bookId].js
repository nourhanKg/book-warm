import React from "react";
import { getSession } from "next-auth/react";
import EditBookForm from "@/components/EditBookForm";
import Link from "next/link";
import { useRouter } from "next/router";
const bookId = function ({ book }) {
  // const router = useRouter();
  // const deleteBook = async function () {
  //   const res = await fetch(`http://localhost:3000/api/books/${book._id}`, {
  //     method: "DELETE",
  //   });
  //   const data = await res.json();
  //   console.log(data.status);
  //   router.push("/books");
  // };
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12 col-lg-4 col-md-3">
          <img className="img-fluid" src={book.imageLink}></img>
        </div>
        <div className="col-12 col-lg-6 col-md-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title h2" style={{ color: "#5B7C99" }}>
                  {book.title}
                </h5>
                <button className="btn btn-warning bg-gradient">
                  <Link
                    className="text-dark text-decoration-none"
                    href={`/books/${book._id}`}
                  >
                    Add to Favorite
                  </Link>
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
      <EditBookForm book={book}></EditBookForm>
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
