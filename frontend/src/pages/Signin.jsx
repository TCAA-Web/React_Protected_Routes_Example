import React, { useState } from "react";

export const Signin = ({ setUser, user }) => {
  const [msg, setMsg] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    console.log("Din value er: ", e.target.email.value);
    let email = e.target.email.value;
    let password = e.target.password.value;

    let body = JSON.stringify({ email: email, password: password });
    if (email && password) {
      fetch("http://localhost:3000/signin", {
        method: "POST",
        body: body,
        headers: { "Content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) =>
          data?.token ? setUser(data) : setMsg(data?.errorMessage)
        )
        .catch((err) => console.error("Network error: ", err));
    }
  };

  const signOut = () => {
    setUser(null);
  };

  return !user ? (
    <div>
      <h1>Sign in</h1>
      <b>{msg}</b>
      <form onSubmit={(event) => submitForm(event)}>
        <label>Email</label>
        <input type="email" name="email" />

        <label>Password</label>
        <input type="password" name="password" />

        <input type="submit" value="Submit"></input>
      </form>
    </div>
  ) : (
    <button onClick={() => signOut()}>Sign out</button>
  );
};
