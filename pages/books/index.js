import React from "react";
import { getSession } from "next-auth/react";
import BookForm from "@/components/BookForm";
import Link from "next/link";
const index = function ({ books }) {
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Author</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book._id}>
                <td scope="row">{book._id}</td>
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
// export async function getStaticProps() {
//   const res = await fetch("http://localhost:2004/books");
//   const data = await res.json();
//   return {
//     props: {
//       books: data,
//     },
//   };
// }
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    const res = await fetch("http://localhost:3000/api/books");
    const JSONData = await res.json();
    // console.log(JSONData);
    const books = JSONData.data.books;
    // console.log(books);
    return {
      props: {
        books: books,
      },
    };
  } else {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackurl=http://localhost:3000/books`,
        permanent: false,
      },
    };
  }
}
