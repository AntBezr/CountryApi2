import { Link, useNavigate } from "react-router-dom";
import { auth, loginWithEmailAndPassword } from "../auth/firebase";
import { useEffect, useState } from "react";

import { Button } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate('/countries')
  }, [user, loading])


  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault()
        loginWithEmailAndPassword(email, password)
      }}>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <Button type="submit">Login</Button>
      </form>s
      <div>
        <h3>Don't have an account?</h3>
        <Link to="/register">Register</Link>
      </div>

    </div>
  );
};

export default Login;