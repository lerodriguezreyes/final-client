// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { elastic as Menu } from "react-burger-menu";
import "../styles/navBar.css";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); // <== ADD

  const getToken = () => {
    return localStorage.getItem("authToken");
  };
  return (
    <div id="outer-container">
      <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} />
      <main id="page-wrap">
        <nav className="Navcontainer">
          <img
            id="navFrame"
            src="https://res.cloudinary.com/dw1igjvgi/image/upload/v1711642893/quoteFrame_gcgjen.png"
            alt="quote frame"
          />
          <div id="navHeader">
            <h1>
              isDemocracy? ||
              <img
                id="dadaHand"
                style={{ height: "100px" }}
                src="https://res.cloudinary.com/dw1igjvgi/image/upload/v1711639080/dadaFrame_nwectm.png"
                alt="Dada in bold black letters"
              />
              <img
                id="dadaHandBurger"
                style={{ height: "75px" }}
                src="https://res.cloudinary.com/dw1igjvgi/image/upload/v1711639080/dadaFrame_nwectm.png"
                alt="Dada in bold black letters"
              />
            </h1>
          </div>
          <ul>
            <li>
              <Link to="/">
                <button>Home</button>
              </Link>
              ☚
            </li>
            <li>
              <Link to="/billlookup">
                <button>Bill Search</button>
              </Link>
              ☚
            </li>
            <li>
              <Link to="/forum">
                <button>BuzzBoard</button>
              </Link>
              ☚
            </li>
            <li>
              <Link to="/dadaists">
                <button>Our community </button>
              </Link>
              ☚
            </li>
            {getToken() ? (
              <>
                <li>
                  <Link to="/user">
                    <button>UserDashboard</button>
                  </Link>
                  ☚
                </li>
                <li>
                  <button onClick={logOutUser}>Logout</button>☚
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/signup">
                    <button>Sign Up</button>
                  </Link>
                  ☚
                </li>
                <li>
                  <Link to="/login">
                    <button>Login</button>
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
      </main>
    </div>
  );
}

export default Navbar;
