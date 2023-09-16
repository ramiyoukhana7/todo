"use client";
import "./forgot-password.css";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebaseAuth } from "../firebase";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const resetPassword = () => {
    sendPasswordResetEmail(firebaseAuth, email);
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h2>Forgot password</h2>
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
          <button onClick={() => resetPassword()} disabled={!email}>
            Reset password
          </button>
        </div>
        <div>
          <p>Don't have an account?</p>
          <button onClick={() => router.push("/signup")}>Sign up</button>
        </div>
        <div>
          <p>Remember your password?</p>
          <button onClick={() => router.push("/reset-Password")}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
