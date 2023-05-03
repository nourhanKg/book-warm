const Quote = function () {
  return (
    <div
      className="p-5 my-5 text-light text-center fst-italic"
      style={{ backgroundColor: "#5B7C99" }}
    >
      <q style={{ fontSize: "2.5rem", maxWidth: "600px" }}>
        A reader lives a thousand lives before he dies . . . The man who never
        reads lives only one.
      </q>
      <p className="fw-bold mt-3 text-end">George R.R. Martin</p>
    </div>
  );
};
export default Quote;
