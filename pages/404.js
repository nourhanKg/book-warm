import React from "react";

const error = () => {
  return (
    <div className="my-5">
      <h1 className="text-center">
        <span className="text-danger">Error: 404,</span> page not found!
      </h1>
    </div>
  );
};

export default error;
error.getLayout = function pageLayout(page) {
  return <> {page}</>;
};
