import RegisterForm from "../Form/RegisterForm";
import LoginForm from "../Form/LoginForm";
import { useState, useEffect } from "react";
import axios from 'axios';


const Landing = (props) => {

  const [hasAccount, setHasAccount] = useState(false);
  const {setUser} = props

  
  return (
    <div className="register">
      <h1>Landing Page</h1>

      {hasAccount === false ? (
        <div>
          <RegisterForm  setUser={setUser} />
          <p>
            Already have an account?{" "}
            <span className="btn btn-primary" onClick={() => setHasAccount(true)}>Login</span>{" "}
          </p>
        </div>
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </div>
  );
};

export default Landing;