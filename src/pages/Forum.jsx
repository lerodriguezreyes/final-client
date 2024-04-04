import { useEffect, useState } from "react";
import { get } from "../services/authService";
import { returnReadableTimeOnlyDate } from "../services/time";
import { Link } from "react-router-dom";
import "../styles/forum.css"

function Forum() {
  const [allBills, setAllBills] = useState([]);

  useEffect(() => {
    get("/bills/")
      .then((response) => {
        console.log("These are the bills ===>", response.data);
        setAllBills(response.data);
      })
      .catch((error) => {
        console.log("Error getting all the bills ===>", error);
      });
  }, []);
  console.log("allBills are here", allBills);
  return (
    <div id="BuzzBoard">
      <h1>Dadaists of the World, speak your mind!</h1>
      {allBills.length > 0 && (
        <div className="gridContainer1">
          {allBills.map((bill) => {
            return (
              <div key={bill.title} className="cardContainer1">
                <div className="card1">
                <p className="text1"> Conversation start:{" "}
                    {returnReadableTimeOnlyDate(bill.createdAt)} </p>
                    <p className="text1">Last comment:{" "}
                    {returnReadableTimeOnlyDate(bill.updatedAt)}
                  </p>
                  <p className="cardHeader1">
                    {""}
                    <Link to={`/billpost/${bill._id}`}>Conversation of bill: {bill.title}</Link></p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Forum;
