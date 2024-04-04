import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "../styles/navBar.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const getToken = () => {
    return localStorage.getItem("authToken");
  };
  return (
        <nav className="Navcontainer">
          <img
            id="navFrame"
            src="https://res.cloudinary.com/dw1igjvgi/image/upload/v1711642893/quoteFrame_gcgjen.png"
            alt="quote frame"
          />
          <div id="navHeader">
            <h1>
              isDem0cracy ? ||
              <img
                id="dadaHand"
                src="https://res.cloudinary.com/dw1igjvgi/image/upload/v1711639080/dadaFrame_nwectm.png"
                alt="Dada in bold black letters"
              />
            </h1>
          </div>
          <ul>
            <li>
              <Link to="/">
                <button className="navButton">Home</button>
              </Link>
              ☚
            </li>
            <li>
              <Link to="/billlookup">
                <button className="navButton">Bill Search</button>
              </Link>
              ☚
            </li>
            <li>
              <Link to="/forum">
                <button className="navButton">BuzzBoard</button>
              </Link>
              ☚
            </li>
            <li>
              <Link to="/dadaists">
                <button className="navButton">Our community </button>
              </Link>
              ☚
            </li>
            {getToken() ? (
              <>
                <li>
                  <button className="navButton" onClick={logOutUser}>Logout</button>☚
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">
                    <button className="navButton">Sign Up</button>
                  </Link>
                  ☚
                </li>
                <li>
                  <Link to="/login" >
                    <button className="navButton">Login</button>
                  </Link>
                  ☚
                </li>
              </>
            )}
          </ul>
          {getToken() ? (
            <>
              <h2 className="welcome">
                Welcome back
                <span> {user && user.name}</span>!{" "}
              </h2>
            </>
          ) : null}
        </nav>
  );
}

export default Navbar;
