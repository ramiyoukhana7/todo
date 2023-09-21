"use client";
import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { firebaseAuth } from "../firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signup = () => {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
    router.push("/signin");
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <img className="img" src="/digital-signup.jpg" />
        <h2>Sign up</h2>
        <div>
          <label>Email address</label>
          <input
            className="input"
            id="email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
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
          <button onClick={signup} disabled={!email || !password}>
            Sign up
          </button>
        </div>
        <div>
          <p>Already have an account?</p>
          <button onClick={() => router.push("/signin")}>Sign in</button>
        </div>
      </div>
    </div>
  );
}
