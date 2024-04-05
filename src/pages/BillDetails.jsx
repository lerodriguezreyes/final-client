import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { get } from "../services/authService";
import { returnReadableTimeOnlyDate } from "../services/time";
import '../styles/billdetails.css'

function BillDetails() {
  const { billId } = useParams();
  const [billDetails, setBillDetails] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

    console.log("this is the bill ID ===>", billId)

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
    <div className="billDetailsPage">
          <h2 className="pageHeader">Bill Details</h2>
          <div className="centeringContainer">
          <div className="billCard">
      {billDetails && (
        <>

          <h3 className="cardDetailsHeader">{billDetails.title}</h3>
          <p className="cardText"> <strong>Congress session:</strong> {billDetails.congress}</p>
          <p className="cardText"><strong> Bill number:</strong> {billDetails.billType.toUpperCase()}-{billDetails.billNumber}</p>
          <p className="cardText"><strong>Origin Chamber:</strong> {billDetails.originChamber}</p>
          
          <p className="cardText"><strong>Sponsor(s):</strong> {billDetails.sponsors}</p>
          <p className="cardText"><strong>Cosponsors:</strong> {billDetails.cosponsors} </p>
          <p className="cardText">
            <strong>Date introduced:{" "}</strong>
            {returnReadableTimeOnlyDate(billDetails.introducedDate)}{" "}
          </p>
          <p> <strong>Latest action:</strong> {billDetails.latestActionText}</p>
          <p className="cardText">
            <strong>Latest action date:</strong>{" "}
            {returnReadableTimeOnlyDate(billDetails.latestActionDate)}{" "}
          </p>
          {billDetails.summary?.text ? (
            <div className="cardSummary"
              dangerouslySetInnerHTML={{ __html: billDetails.summary.text }}
            />
          ) : (
            <p className="cardText">Congess has not yet made availible a summary of this bill.</p>
          )}
          {billDetails.latestTextPdfLink ? (
            <Link className="cardLink" target="_blank" to={billDetails.latestTextPdfLink}>
              {" "}
              <span>Check the latest text of this bill{" "}</span>
            </Link>
          ) : (
            <p className="cardText">Congess has not yet made availible a document of this bill.</p>
          )}       
        </>
      )}
      </div>
</div>
      <div className="buttongroup">
        <button
          onClick={() => {
            navigate("/billlookup");
          }}
        >
          {" "}
          Look up another bill!
        </button>
        <button
          onClick={() => {
            navigate(`/billpost/${billId}`);
          }}
        >
          {" "}
          Join the conversation!
        </button>
      </div>

    </div>
  );
}

export default BillDetails;
