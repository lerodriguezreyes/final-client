import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { get, post } from "../services/authService";
import { returnReadableTimeOnlyDate } from "../services/time";
import CommentCard from "../components/CommentCard";
import "../styles/billpostPage.css"

function BillPost() {
  const [getBillDetails, setGetBillDetails] = useState('');
  const [comment, setComment] = useState(null);
  const { billId } = useParams();

  const getDetails = () => {
    get(`/bills/conversation/${billId}`)
      .then((response) => {
        console.log("This object has the bill's details for the commments ===>", response.data);
        setGetBillDetails(response.data);
      })
      .catch((error) => {
        console.log("Error getting the bill's details ===>", error);
      });

  }

  useEffect(() => {
    console.log("this is the bill ID ===>", billId);
    getDetails()
  }, []);

  const navigate = useNavigate();
  const handleBack = (e) => {
    navigate("/forum");
  };

  const handleChange = (e) => {
    setComment(e.target.value)
  };

const submissionObject = {
  comment: comment,
  bill: `${getBillDetails._id}`
} 

  const handleSubmit = (e) => {
    e.preventDefault();
    post("/comments/new", submissionObject)
      .then((response) => {
        console.log("New comment ===>", response.data);
      setGetBillDetails(response.data)
      setComment("")
      })
      .catch((error) => {
        console.log("Error posting ===>", error);
      });
  };

  return (
    <div className="billPostPage">
    <div className="header"> Calling all the DADA's of the World: Let's talk about this!
    </div>
      {getBillDetails && (
        <div>
        <div className="centering">
        <div className="billCard">
          <h3 className="cardDetailsHeader">{getBillDetails.title}</h3>
          <p><strong>Congress session:</strong> {getBillDetails.congress}</p>
          <p>
            <strong>Bill number:</strong> {getBillDetails.billType.toUpperCase()}-
            {getBillDetails.billNumber}
          </p>
          <p> <strong>Sponsor(s):</strong> {getBillDetails.sponsors}</p>
          <p><strong>Latest action:</strong> {getBillDetails.latestActionText}</p>
          <p><strong>Latest action date:</strong> {returnReadableTimeOnlyDate(getBillDetails.latestActionDate)}{" "} </p>
          {getBillDetails.latestTextPdfLink ? (
            <Link className="cardLink" target="_blank" to={getBillDetails.latestTextPdfLink}>
              {" "}
              <span>Check the latest text of this bill{" "}</span>
            </Link>
          ) : (
            <p>Congess has not yet made availible a document of this bill.</p>
          )}
          </div>
          </div>
            <CommentCard getBillDetails={getBillDetails} setGetBillDetails={setGetBillDetails} getDetails={getDetails}/>
      </div>
      )}
      <form className="addComment" onSubmit={handleSubmit}>
        <br />
        <textarea
          className="row"
          type="text"
          name="comment"
          value={comment}
          placeholder="Express yourself!"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <button className="submitButton" type="submit">
          {" "}
          Speak your mind!{" "}
        </button>
      </form>
      <button onClick={handleBack}> Back to the BuzzBoard!</button>
    </div>
  );
}

export default BillPost;
