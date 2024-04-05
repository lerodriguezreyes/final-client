import { propubget } from "../services/ProPublicaAPI";
import { useState } from "react";
import { post } from "../services/authService";
import { useNavigate } from "react-router-dom";

const ProPub = () => {
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [proResults, setProResults] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    propubget(query, offset)
      .then((response) => {
        console.log(
          "This is our response ===>",
          response.data.results[0].bills
        );
        setProResults(response.data.results[0].bills);
      })
      .catch((err) => {
        console.log("Error retrieving results", err);
      });
  };

  const handleNext = (e) => {
    setOffset((prev) => prev + 20);
    let thisOffset = offset + 20;
    propubget(query, thisOffset)
      .then((response) => {
        console.log(
          "This is our response ===>",
          response.data.results[0].bills
        );
        setProResults(response.data.results[0].bills);
      })
      .catch((err) => {
        console.log("Error retrieving results", err);
      });
  };

  const handleFollow = (bill) => {
    const queryObject = {
      title: bill.title,
      congress: +bill.bill_id.split("-")[1],
      billType: bill.bill_type.toLowerCase(),
      billNumber: +bill.bill_slug.replace(/\D/g, ""),
    };

    console.log("This is the query object", queryObject);

    post("/bills/new", queryObject)
      .then((response) => {
        console.log("This is the bill", response.data);
        console.log(
          "This is the bill ID from Mongo get request",
          response.data.bill._id
        );
        navigate(`/details/${response.data.bill._id}`);
      })
      .catch((err) => {
        console.log("Error with bill", err);
      });
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="searchbillslabel">
          Bill Lookup:
          </label> 
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="searchBar"
          />
        
        <button type="submit">Search</button>
        <button onClick={(e) => handleNext(e)}>Next</button>
      </form>
      
      {proResults.length > 0 && (
        <div className="gridContainer">
          {proResults.map((bill) => {
            return (
              <div className="cardContainer">
              <div className="card">
                <h4 className="cardHeader">Title: {bill.title}</h4>
                <div className="infoRow">
                  <p className="text">
                    Congress: {bill.bill_id.split("-")[1]}{" "}
                  </p>
                  .
                  <p className="text">
                    Bill number: {bill.bill_type.toUpperCase()}-
                    {bill.bill_slug.replace(/\D/g, "")}
                  </p>
                </div>
                <button
                  className="cardbutton"
                  onClick={() => handleFollow(bill)}
                >
                  {" "}
                  Fetch Specs{" "}
                </button>
              </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProPub;
