import { returnReadableTime } from "../services/time";
import "../styles/commentCard.css";
import { axiosDelete, post } from "../services/authService";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/auth.context";

function CommentCard({ getBillDetails, setGetBillDetails , getDetails}) {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState({ editing: false, index: null });
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [editedComment, setEditedComment] = useState(null)

  const handleSubmit = (e, index) => {
    e.preventDefault();

    console.log(
      "This is the comment id that I want to edit. ==>",
      getBillDetails.comments[index]._id
    );

    console.log(
      "This is what is currently there ==>",
      getBillDetails.comments[index].comment
    );
    
    console.log("This is what I edited ==>", commentToEdit);
    
    setCommentToEdit(commentToEdit);
    
    post(
      `/comments/update/${getBillDetails.comments[index]._id}`,
      {comment: commentToEdit}
    )
      .then((response) => {
        console.log("Edited comment, this is what I sent ===>", response.data);
      getDetails()
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  const handleDelete = (comment) => {
    axiosDelete(`/comments/delete/${comment._id}`)
      .then((response) => setGetBillDetails(response.data))
      .catch((error) => console.log(error));
  };

  const handleEdit = (comment, index) => {
    setEditing({
      editing: editing.editing ? false : true,
      index: index || index === 0 ? index : null,
    });
    setCommentToEdit(comment.comment);
  };

  useEffect(() => {
    console.log(editing);
  }, [editing]);

  return (
    <>
      {getBillDetails.comments.map((comment, index) => {
        return (
          <div className="commentCard" key={comment._id}>
            <div className="cardContainer">
              <img className="userprofile" src={comment.owner.profilePicURL} />
              {user._id === comment.owner._id && (
                <>
                  <img
                    className="deleteicon"
                    onClick={() => handleDelete(comment)}
                    src="https://res.cloudinary.com/dw1igjvgi/image/upload/v1712249139/vsae7bau37zdyvuibmfw.png"
                  />
                  {editing.editing && editing.index === index ? (
                    <span onClick={() => handleEdit(comment, index)}>❌</span>
                  ) : (
                    <img
                      className="editicon"
                      onClick={() => handleEdit(comment, index)}
                      src="https://res.cloudinary.com/dw1igjvgi/image/upload/v1712249175/cl827gcafqrkngvbcdmh.png"
                    />
                  )}
                </>
              )}
              <p className="commentowner"> {comment.owner.name} says: </p>
              <div>
                {editing.editing && editing.index === index ? (
                  <form onSubmit={(e) => handleSubmit(e, index)}>
                    <input
                      type="text"
                      name="comment"
                      value={commentToEdit}
                      onChange={(e) => setCommentToEdit(e.target.value)}
                    />
                    <button type="submit">edit comment</button>
                  </form>
                ) : (
                  <h4 className="commenttext">{comment.comment} </h4>
                )}
                <h5 className="commentdate">
                  {returnReadableTime(comment.createdAt)}{" "}
                </h5>{" "}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CommentCard;
