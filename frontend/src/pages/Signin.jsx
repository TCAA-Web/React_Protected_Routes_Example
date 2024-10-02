import React, { useState } from "react";

export const Signin = ({ setUser, user }) => {
  // State til at gemme en besked til brugeren hvis noget går galt
  const [msg, setMsg] = useState("");

  // Submit funktion der tager vores email of password og sender det til vores node server (backend -> index.js)
  const submitForm = (e) => {
    e.preventDefault();

    // Gem email og password som variabler
    let email = e.target.email.value;
    let password = e.target.password.value;

    // Stringify et objekt med email og password
    let body = JSON.stringify({ email: email, password: password });

    // Og send en post request til serveren med body (email og password)
    // Hvis det lykkedes, sættes user staten til resultatet der kommer tilbage fra serveren (token)
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

  // Sign-Out funktion der sætter user til null
  const signOut = () => {
    setUser(null);
  };

  // Conditionally render vores sign in form eller sign out knap alt efter om brugeren er logget ind
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
