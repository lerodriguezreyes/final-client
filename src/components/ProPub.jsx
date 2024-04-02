import { propubget } from "../services/ProPublicaAPI";
import { useState } from "react";
import SearchCard from "./SearchCard";
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
        console.log("This is the bill ID from Mongo get request", response.data.bill._id)
        navigate(`/details/${response.data.bill._id}`);
        
      })
      .catch((err) => {
        console.log("Error with bill", err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Search Bills
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
      <button onClick={(e) => handleNext(e)}>Next</button>
      {proResults.length > 0 && (
        <>
          {proResults.map((bill) => {
            return (
              <div>
                <h4>Title: {bill.title}</h4>
                <p>Congress: {bill.bill_id.split("-")[1]}</p>
                <p>Bill type: {bill.bill_type.toUpperCase()}</p>
                <p>Bill number: {bill.bill_slug.replace(/\D/g, "")}</p>
                <button onClick={() => handleFollow(bill)}>
                  {" "}
                  Fetch Specs{" "}
                </button>
                <button onClick={() => handleFollow(bill)}>
                  {" "}
                  Follow Bill{" "}
                </button>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ProPub;
