import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { get } from "../services/authService";
import {
  returnReadableTime,
  returnReadableTimeShort,
  returnReadableTimeOnlyDate,
} from "../services/time";

function BillDetails() {
  const { billId } = useParams();
  const [billDetails, setBillDetails] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    get(`/bills/details/${billId}`)
      .then((response) => {
        console.log("This object has the bill's details ===>", response.data);
        setBillDetails(response.data);
      })
      .catch((error) => {
        console.log("Error getting the bill's details ===>", error);
      });
  }, [billId]);

  return (
    <div>
      {billDetails && (
        <>
          <h2 className="billDetailsPage">Bill Details</h2>
          <h3 className="cardDetailsHeader">{billDetails.title}</h3>
          <p>Congress session: {billDetails.congress}</p>
          <p>Bill number: {billDetails.billType.toUpperCase()}-{billDetails.billNumber}</p>
          <p>Origin Chamber: {billDetails.originChamber}</p>
          
          <p>Sponsor(s): {billDetails.sponsors}</p>
          <p>Cosponsors: {billDetails.cosponsors} </p>
          <p>
            Date introduced:{" "}
            {returnReadableTimeOnlyDate(billDetails.introducedDate)}{" "}
          </p>
          <p>Latest action: {billDetails.latestActionText}</p>
          <p>
            Latest action date:{" "}
            {returnReadableTimeOnlyDate(billDetails.latestActionDate)}{" "}
          </p>
          <p> Bill Summary </p>
          {billDetails.summary.text ? (
            <div
              dangerouslySetInnerHTML={{ __html: billDetails.summary.text }}
            />
          ) : (
            <p>Congess has not yet made availible a summary of this bill.</p>
          )}
          {billDetails.latestTextPdfLink ? (
            <Link target="_blank" to={billDetails.latestTextPdfLink}>
              {" "}
              Check the latest text of this bill{" "}
            </Link>
          ) : (
            <p>Congess has not yet made availible a document of this bill.</p>
          )}
          <p>Lets talk about this bill! </p>
          <button> Join the conversation!</button>
          <button
            onClick={() => {
              navigate("/billlookup");
            }}
          >
            {" "}
            Look up another bill!
          </button>
        </>
      )}
    </div>
  );
}

export default BillDetails;
