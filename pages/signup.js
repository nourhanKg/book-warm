import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";
const Signup = function () {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const changePassword = function (e) {
    setPassword(e.target.value);
  };
  const changeUsername = function (e) {
    setUsername(e.target.value);
  };
  const signUpUser = async function () {
    if (username !== "" && password !== "") {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      const data = await res.json();
      router.push("/login");
      return data;
    }
  };
  return (
    <form className="w-50 mx-auto my-5">
      <h2>Sign Up Form</h2>
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
        onClick={signUpUser}
      >
        Signup
      </button>
      <p className="my-2 text-dark">
        Already han an account?{" "}
        <Link href="/login" className="fw-bold fs-6 text-warning">
          Sign In
        </Link>
      </p>
    </form>
  );
};
export default Signup;
