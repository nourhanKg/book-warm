import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";
const Login = function () {
  const router = useRouter();
  const [invalid, setInvalid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const changePassword = function (e) {
    setPassword(e.target.value);
  };
  const changeUsername = function (e) {
    setUsername(e.target.value);
  };
  const signInUser = async function () {
    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
    console.log(res);
    if (res.ok) {
      router.push("/books");
    } else {
      setInvalid(true);
    }
    return res;
  };
  return (
    <form className="w-50 mx-auto my-5">
      <h2>Log In Form</h2>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          onChange={changeUsername}
          type="text"
          className="form-control"
          id="username"
          name="title"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          onChange={changePassword}
          type="password"
          className="form-control"
          id="passsword"
          name="password"
        />
      </div>
      <button
        type="button"
        className="btn btn-dark bg-gradient"
        onClick={signInUser}
      >
        Login
      </button>
      <p className="my-2 text-dark">
        Don't have an account?{" "}
        <Link href="/signup" className="fw-bold fs-6 text-warning">
          Sign Up
        </Link>
      </p>
      {invalid ? <p className="text-danger fd-6">Invalid Credentials</p> : ""}
    </form>
  );
};
export default Login;
