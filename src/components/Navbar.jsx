// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); // <== ADD

  const getToken = () => {
    return localStorage.getItem("authToken");
  };
  return (
    <nav>
      {/* <h1 style={{textAlign:"center" }}> <img style={{height:"150px" }}src="https://res.cloudinary.com/dw1igjvgi/image/upload/v1711642893/quoteFrame_gcgjen.png" alt="quote frame"/> 
    isDemocracy ||
    <img style={{height:"100px" }} src='https://res.cloudinary.com/dw1igjvgi/image/upload/v1711639080/dadaFrame_nwectm.png' alt="Dada in bold black letters" />
    </h1> */}
      <Link to="/">
        <button>Home</button>
      </Link>
      -
      <Link to="/billlookup">
        <button>Bill Search</button>
      </Link>
      -
      <Link to="/forum">
        <button>BuzzBoard</button>
      </Link>
      -
      <Link to="/dadaists">
        <button>Our community </button>
      </Link>
      -
      {getToken() ? (
        <>
          <Link to="/user">
            <button>UserDashboard</button>
          </Link>
          -<button onClick={logOutUser}>Logout</button>
          <span> Welcome back </span>
          <span>{user && user.name}</span>
          <span>!</span>
        </>
      ) : (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          -
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
