import hero from "../../public/images/hero.jpg";
import Image from "next/image";
const home = function () {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-6">
          <h1 className="h1">
            The largest and best online bookstore you can find!
          </h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <button className="btn btn-warning">Explore More</button>
        </div>
        <div className="col-lg-6">
          <Image className="img-fluid" src={hero}></Image>
        </div>
      </div>
    </div>
  );
};
export default home;
