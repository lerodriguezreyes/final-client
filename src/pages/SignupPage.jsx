import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/authService";
import { fileChange } from "../services/imageUpload";
import "../styles/signUp.css"

function SignupPage() {
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState(undefined);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const handleTextChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSignupSubmit = (e) => {
    e.preventDefault();

    post("/auth/signup", newUser)
      .then((response) => {
        console.log("This is the new user ===>", response.data);
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
        setNewUser({
          email: "",
          password: "",
          name: "",
        });
      });
  };

  const handlePhoto = (e) => {
    setDisabled(true);
    fileChange(e).then((response) => {
      setImages(response.data.image);
      setDisabled(false);
    });
  };
  return (
    <div className="SignupPage">
      <div className="cutoutShadow">
        <div className="signUpFormCutout">
          <h1>Sign Up</h1>

          <form onSubmit={handleSignupSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleTextChange}
            />

            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleTextChange}
            />

            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleTextChange}
            />

            <label>Provide an image for your profile:</label>
            <input
              type="file"
              className="profilePicUrl"
              id="images"
              name="images"
              onChange={handlePhoto}
            />
            <br />
            <button type="submit">Sign Up</button>
          </form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p>Already have account?</p>
          <Link to={"/login"}> Login</Link>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
