import { propubget } from "../services/ProPublicaAPI";
import { useState } from "react";
import SearchCard from "./SearchCard";

const ProPub = () => {
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const [proResults, setProResults] = useState([]);
  const [congressQueryObj, setCongressQueryObj] = useState({
    congress: "",
    billtype: "",
    billnumber: "",
  });

  const [congressQuery, setCongressQuery] = useState("");
  const [billTypeQuery, setBillTypeQuery] = useState("");
  const [billNumberQuery, setBillNumberQuery] = useState("");

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

  const handleFetch = (addedBill) => {
    console.log(
      "These are the chosen parameters to fetch congress bill information",
      setCongressQuery,
      setBillTypeQuery,
      setBillNumberQuery
    );
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
                <SearchCard
                  bill={bill}
                  key={bill.bill_id}
                  handleFetch={handleFetch}
                />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default ProPub;
