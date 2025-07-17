'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login successful", userCredential.user);

      // Go to admin page
      navigate.push("/admin");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("❌ Firebase login error:", err.message);
      } else if (typeof err === "object" && err !== null && "code" in err && "message" in err) {
        // For Firebase errors
        const firebaseErr = err as { code: string; message: string };
        console.error("❌ Firebase login error:", firebaseErr.code, firebaseErr.message);
      } else {
        console.error("❌ Firebase login error:", err);
      }
      setError("Invalid email or password.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <form onSubmit={handleLogin} style={{
        width: "300px",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Admin Login</h2>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <div style={{ marginBottom: "10px" }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
