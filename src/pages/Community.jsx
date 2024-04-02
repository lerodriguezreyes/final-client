import { get } from "../services/authService";
import { useEffect, useState } from "react";
import "../styles/community.css";

function Community() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    get("/users")
      .then((response) => {
        console.log("These are the users ===>", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log("Error getting community ===>", error);
      });
  }, []);

  return (
    <div id="community">
      <h1>Dadaists of the World, unite!</h1>
      {users.length > 0 && (
        <>
          {users.map((user) => {
            return (
              <div className="userCard" key={user._id}>
                <div className="cardContainer">
                  <p className="cardText1"> Mi name is {user.name} 
                  <br/> Reach out - {user.email}</p>
                  <img className="image" src={user.profilePicURL} />
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Community;
