import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import "../styles/signin.css"


function LoginPage() {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  const [thisUser, setThisUser] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(undefined);

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const navigate = useNavigate();

  //   const handleEmail = (e) => setEmail(e.target.value);
  //   const handlePassword = (e) => setPassword(e.target.value);

  const handleTextChange = (e) => {
    setThisUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    post("/auth/login", thisUser)
      .then((response) => {
        console.log("Login response ===>", response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="LoginPage">
      <div className="cutoutShadow">
      <div className="loginFormCutout">
      <h1 className="headerfontoptions">Login</h1>
      <form className="loginForm" onSubmit={handleLoginSubmit}>
        <label className="loginFormLabel">Email:</label>
        <input
          type="email"
          name="email"
          value={thisUser.email}
          onChange={handleTextChange}
        />

        <label className="loginFormLabel">Password:</label>
        <input
          type="password"
          name="password"
          value={thisUser.password}
          onChange={handleTextChange}
        />
        <br/>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="loginFormText">{errorMessage}</p>}

      <p className="fontoptions">Don't have an account yet?</p>
      <Link className="fontoptions" to={"/signup"}> Sign Up</Link>
    </div>
    </div>
    </div>
  );
}

export default LoginPage;