import { auth } from "../App";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const signIn = async () => {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    };
  
  
    return (
      <div>
        <input
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}> Sign In</button>
  
      </div>
    );
}

export default Login;