// src/components/Navbar.jsx

import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); // <== ADD

  const getToken = () => {
    return localStorage.getItem("authToken");
  };
  //  Update the rendering logic to display different content
  //  depending on whether the user is logged in or not
  return (
    <nav>
    {/* <h1 style={{textAlign:"center" }}> <img style={{height:"150px" }}src="https://res.cloudinary.com/dw1igjvgi/image/upload/v1711642893/quoteFrame_gcgjen.png" alt="quote frame"/> 
    isDemocracy ||
    <img style={{height:"100px" }} src='https://res.cloudinary.com/dw1igjvgi/image/upload/v1711639080/dadaFrame_nwectm.png' alt="Dada in bold black letters" />
    </h1> */}
      <Link to="/">
        <button>Home</button>
      </Link>
      <Link to="/billlookup">
        <button>Bill Search</button>
      </Link>

      {getToken() ? (
        <>
          <button onClick={logOutUser}>Logout</button>
          {/* <span>{user && user.name}</span> */}
        </>
      ) : (
        <>
          <Link to="/signup">
            {" "}
            <button>Sign Up</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;