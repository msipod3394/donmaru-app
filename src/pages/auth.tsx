// pages/auth.js
import { useState } from "react";
import { supabase } from "../lib/supabase";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: 'user@example.com',
        password: 'secure-password',
      });

      if (error) {
        console.error("Sign in error:", error.message);
      } else {
        console.log("Sign in successful:", data);
        // ユーザーが正常にサインインした後の処理を追加
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
    }
  };

  return (
    <div>
      <h1>Supabase Auth</h1>
      <form onSubmit={handleSignIn}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Auth;
