import { useEffect, useState } from "react";
import { get } from "../services/authService";
import { returnReadableTimeOnlyDate } from "../services/time";

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
        <>
          {allBills.map((bill) => {
            return (
              <div key={bill.title}>
                <div>
                  <p>
                    {" "}
                    {bill.title} </p>
                    <p> Conversation start:{" "}
                    {returnReadableTimeOnlyDate(bill.createdAt)} </p>
                    <p>Last comment:{" "}
                    {returnReadableTimeOnlyDate(bill.updatedAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default Forum;
