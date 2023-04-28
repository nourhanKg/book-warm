import { useState } from "react";
const Reviews = function (props) {
  // const [shownReviews, setShownReviews] = useState(false);
  const [reviewsData, setReviewsData] = useState([]);
  // const showReviews = function () {
  //   loadReviews();
  //   setShownReviews(!shownReviews);
  // };
  const loadReviews = async function () {
    const res = await fetch("/api/reviews");
    const data = await res.json();
    setReviewsData(data);
  };
  return (
    <div className={props.className}>
      <button className="btn btn-primary mx-auto" onClick={loadReviews}>
        See Reviews
      </button>
      {reviewsData.map((review) => {
        return <h1>Review</h1>;
      })}
    </div>
  );
};
export default Reviews;
