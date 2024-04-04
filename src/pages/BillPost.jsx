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

  useEffect(() => {
    console.log("this is the bill ID ===>", billId);

    get(`/bills/conversation/${billId}`)
      .then((response) => {
        console.log("This object has the bill's details for the commments ===>", response.data);
        setGetBillDetails(response.data);
      })
      .catch((error) => {
        console.log("Error getting the bill's details ===>", error);
      });
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
      {getBillDetails && (
        <>
          <h3 className="cardDetailsHeader">{getBillDetails.title}</h3>
          <p>Congress session: {getBillDetails.congress}</p>
          <p>
            Bill number: {getBillDetails.billType.toUpperCase()}-
            {getBillDetails.billNumber}
          </p>
          <p>Sponsor(s): {getBillDetails.sponsors}</p>
          <p>Latest action: {getBillDetails.latestActionText}</p>
          <p>Latest action date: {returnReadableTimeOnlyDate(getBillDetails.latestActionDate)}{" "} </p>
          {getBillDetails.latestTextPdfLink ? (
            <Link target="_blank" to={getBillDetails.latestTextPdfLink}>
              {" "}
              Check the latest text of this bill{" "}
            </Link>
          ) : (
            <p>Congess has not yet made availible a document of this bill.</p>
          )}
          <CommentCard getBillDetails={getBillDetails} setGetBillDetails={setGetBillDetails} />
        </>
      )}
      <form className="addComment" onSubmit={handleSubmit}>
        <label> Express yourself! </label>
        <br />
        <textarea
          className="row"
          type="text"
          name="comment"
          value={comment}
          placeholder="placeholder"
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
