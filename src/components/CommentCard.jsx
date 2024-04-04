import { returnReadableTime } from "../services/time";
import "../styles/commentCard.css";
import { axiosDelete } from "../services/authService";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";

function CommentCard({ getBillDetails, setGetBillDetails }) {
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);
  const { user } = useContext(AuthContext);

  const handleDelete = (comment) => {
    axiosDelete(`/comments/delete/${comment._id}`)
      .then((response) => setGetBillDetails(response.data))
      .catch((error) => console.log(error));
  };

  const handleEdit = (comment) => {
    console.log("This is the comment ID ===>", comment._id);
  };

  return (
    <div>
      {getBillDetails.comments.map((comment, index) => {
        return (
          <div className="commentCard" key={comment._id}>
            <div className="cardContainer">
              <div>
                <img
                  className="commentImage"
                  src={comment.owner.profilePicURL}
                />
                {user._id === comment.owner._id && (
                  <>
                    <img
                      onClick={() => handleDelete(comment)}
                      src="https://res.cloudinary.com/dw1igjvgi/image/upload/v1712249139/vsae7bau37zdyvuibmfw.png"
                    />
                    <img
                      onClick={() => handleEdit(comment)}
                      src="https://res.cloudinary.com/dw1igjvgi/image/upload/v1712249175/cl827gcafqrkngvbcdmh.png"
                    />
                  </>
                )}
                <p className="commentText"> {comment.owner.name} says: </p>
                <div></div>
              </div>
              <div>
                <h4>{comment.comment} </h4>
                <h5>{returnReadableTime(comment.createdAt)} </h5>{" "}
              </div>
              {/* { {comment.updatedAt} ? <p>{comment.updatedAt}</p> : <p>{comment.createdAt}</p>} */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default CommentCard;
