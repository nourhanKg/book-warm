import { useRef } from "react";
const ReviewForm = function (props) {
  const review = useRef("Hi");
  const addReview = async function (e) {
    e.preventDefault();
    const newReview = {
      author: "Default User",
      comment: review.current.value,
    };
    const res = await fetch("/api/reviews", {
      method: "POST",
      body: JSON.stringify(newReview),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(review.current.value);
  };
  return (
    <form onSubmit={addReview} className="w-50 mx-auto my-5">
      <div className="mb-3">
        <label htmlFor="review" className="form-label">
          Add Review
        </label>
        <textarea
          ref={review}
          value={review.current.value}
          className="form-control"
          id="review"
        />
      </div>
      <button type="submit" className="btn btn-success">
        Submit
      </button>
    </form>
  );
};
export default ReviewForm;
