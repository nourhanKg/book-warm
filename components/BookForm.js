const BookForm = function (props) {
  return (
    <form action="/api/books/add" method="POST" className="w-50 mx-auto my-5">
      <h2>Add New Book</h2>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control"
          id="author"
          name="author"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="country" className="form-label">
          Country
        </label>
        <input
          type="text"
          className="form-control"
          id="country"
          name="country"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="language" className="form-label">
          language
        </label>
        <input
          type="text"
          className="form-control"
          id="language"
          name="language"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="pages" className="form-label">
          Pages
        </label>
        <input type="number" className="form-control" id="pages" name="pages" />
      </div>
      <div className="mb-3">
        <label htmlFor="year" className="form-label">
          Year
        </label>
        <input
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
          type="text"
          className="form-control"
          id="link"
          name="link"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="imageLink" className="form-label">
          Image Link
        </label>
        <input
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
export default BookForm;
