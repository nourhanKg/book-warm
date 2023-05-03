import React from "react";
import { getSession } from "next-auth/react";
import BookForm from "@/components/BookForm";
import Link from "next/link";
import { useState } from "react";
const index = function ({ books }) {
  let counter = 0;
  const evenStyle = { color: "#212529" };
  const oddStyle = { color: "#D2918C" };
  const [myBooks, setMyBooks] = useState(books);
  const filterData = async function (e) {
    const lang = e.target.value;
    let filteredBooks = [];
    let res;
    if (lang === "All") {
      res = await fetch(`http://localhost:3000/api/books`);
    } else {
      res = await fetch(`http://localhost:3000/api/books?language=${lang}`);
    }
    if (res.status === 212) {
      const JSONData = await res.json();
      filteredBooks = JSONData.data.books;
    } else {
      console.log("You are not authenticated!");
    }
    setMyBooks(filteredBooks);
  };
  return (
    <div className="container">
      <div className="my-5">
        <label className="pb-2 fw-bold" style={{ color: "#5B7CA6" }}>
          Filter by language:
        </label>
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={filterData}
        >
          <option value="All" selected>
            All
          </option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Arabic">Arabic</option>
        </select>
      </div>
      <table className="table my-5">
        <thead className="text-light" style={{ backgroundColor: "#5B7CA6" }}>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {myBooks.map((book) => {
            return (
              <tr
                key={book._id}
                style={counter % 2 === 0 ? evenStyle : oddStyle}
              >
                <td scope="row">{++counter}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <button className="btn btn-warning">
                    <Link
                      className="text-light text-decoration-none"
                      href={`/books/${book._id}`}
                    >
                      Details
                    </Link>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <BookForm></BookForm>
    </div>
  );
};
export default index;

export async function getServerSideProps(context) {
  let books = [];
  const session = await getSession(context);
  const res = await fetch("http://localhost:3000/api/books");
  if (res.status === 212) {
    const JSONData = await res.json();
    books = JSONData.data.books;
  } else {
    console.log("You are not authenticated!");
  }
  return {
    props: {
      books: books,
    },
  };
  // console.log(session);
  // if (session) {

  // } else {
  //   return {
  //     redirect: {
  //       destination: `/api/auth/signin?callbackurl=http://localhost:3000/books`,
  //       permanent: false,
  //     },
  //   };
  // }
}
