import { useState } from "react";
import { useRouter } from "next/router";
const EditBookForm = function (props) {
  const router = useRouter();
  const book = props.book;
  const [formData, setFormData] = useState({
    title: book.title,
    author: book.author,
    language: book.language,
    country: book.country,
    link: book.link,
    imageLink: book.imageLink,
    pages: +book.pages,
    year: +book.year,
  });
  const changeDataTitle = function (e) {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  };
  const changeDataAuthor = function (e) {
    setFormData({
      ...formData,
      author: e.target.value,
    });
  };
  const changeDataLanguage = function (e) {
    setFormData({
      ...formData,
      language: e.target.value,
    });
  };
  const changeDataCountry = function (e) {
    setFormData({
      ...formData,
      country: e.target.value,
    });
  };
  const changeDataPages = function (e) {
    setFormData({
      ...formData,
      pages: +e.target.value,
    });
  };
  const changeDataYear = function (e) {
    setFormData({
      ...formData,
      year: +e.target.value,
    });
  };
  const changeDataLink = function (e) {
    setFormData({
      ...formData,
      link: e.target.value,
    });
  };
  const changeDataImageLink = function (e) {
    setFormData({
      ...formData,
      imageLink: e.target.value,
    });
  };
  const updateBook = async function (e) {
    e.preventDefault();
    console.log(formData);
    const res = await fetch(`/api/books/${book._id}`, {
      method: "PATCH",
      body: JSON.stringify({ ...formData }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    router.push(`/books/${book._id}`);
  };
  return (
    <form onSubmit={updateBook} className="w-50 mx-auto my-5">
      <h2>Edit Book</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          onChange={changeDataTitle}
          type="text"
          className="form-control"
          id="title"
          name="title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          onChange={changeDataAuthor}
          type="text"
          className="form-control"
          id="author"
          name="author"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="country" className="form-label">
          Country
        </label>
        <input
          onChange={changeDataCountry}
          type="text"
          className="form-control"
          id="country"
          name="country"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="language" className="form-label">
          language
        </label>
        <input
          onChange={changeDataLanguage}
          type="text"
          className="form-control"
          id="language"
          name="language"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pages" className="form-label">
          Pages
        </label>
        <input
          onChange={changeDataPages}
          type="number"
          className="form-control"
          id="pages"
          name="pages"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Year
        </label>
        <input
          onChange={changeDataYear}
          type="number"
          min="1900"
          max="2099"
          step="1"
          className="form-control"
          id="year"
          name="year"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="link" className="form-label">
          Link
        </label>
        <input
          onChange={changeDataLink}
          type="text"
          className="form-control"
          id="link"
          name="link"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="imageLink" className="form-label">
          Image Link
        </label>
        <input
          onChange={changeDataImageLink}
          type="text"
          className="form-control"
          id="imageLink"
          name="imageLink"
        />
      </div>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};
export default EditBookForm;
