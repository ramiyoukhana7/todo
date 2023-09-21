"use client";
import "./signin.css";
//importerar signIn funktionen från next-auth
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  return (
    <div className="main-container">
      <div className="form-container">
        <img className="img" src="\digital.jpg" />
        <h2>Sign in to your account</h2>
        <div>
          <input
            placeholder="example@gmail.com"
            className="input"
            id="email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="**********"
            className="input"
            id="password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div
          className="forgot-password"
          onClick={() => router.push("/forgot-password")}
        >
          Forgot password?
        </div>

        <div>
          <button
            onClick={() =>
              //Vi kallar på signIn funktionen från next-auth, vi skickar vidare funktionen med credentials som
              //användaren har angett. Ifall användaren lyckas att logga in, redirecta användaren till homepagen "/"
              signIn("credentials", {
                email,
                password,
                redirect: true,
                callbackUrl: "/",
              })
            }
            disabled={!email || !password}
          >
            Sign in
          </button>
        </div>
        <div>
          <p>Don't have an account?</p>
          <button onClick={() => router.push("/signup")}>Sign up</button>
        </div>
      </div>
    </div>
  );
}
