import React from "react";
import { getSession } from "next-auth/react";
import EditBookForm from "@/components/EditBookForm";
import Link from "next/link";
import { useRouter } from "next/router";
const bookId = function ({ book }) {
  const router = useRouter();
  const deleteBook = async function () {
    const res = await fetch(`http://localhost:3000/api/books/${book._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data.status);
    router.push("/books");
  };
  return (
    <div className="container my-5">
      <div className="card w-50 mx-auto">
        {/* <img src="..." class="card-img-top" alt="..."> */}
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <h6 className="card-title text-warning">{book._id}</h6>
          <p className="card-text">{book.author}</p>
          <p className="card-text">{book.language}</p>
          <p className="card-text">{book.country}</p>
          <button onClick={deleteBook} className="btn btn-danger me-2">
            Delete
          </button>
          {/* <button className="btn btn-success me-2">Update</button> */}
          <Link href="/books" className="btn btn-primary">
            See All Books
          </Link>
        </div>
      </div>
      <EditBookForm book={book}></EditBookForm>
      {/* <Reviews className="w-50 mx-auto my-5"></Reviews>
      <ReviewForm></ReviewForm> */}
    </div>
  );
};
export default bookId;
//#region
// export async function getStaticPaths() {
//   return {
//     paths: [
//       { params: { bookId: "1" } },
//       { params: { bookId: "2" } },
//       { params: { bookId: "3" } },
//     ],
//     fallback: "blocking",
//   };
// }

// export async function getStaticProps(context) {
//   const { params } = context;
//   const res = await fetch(`http://localhost:2004/books/${params.bookId}`);
//   const data = await res.json();
//   return {
//     props: {
//       book: data,
//     },
//     revalidate: 10,
//   };
// }
//#endregion
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
