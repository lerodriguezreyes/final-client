
import { post } from "../services/authService";

function addComment() {
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    post("/comments/new", comment)
    .then((response) => {
        console.log("New comment ===>", response.data);
        setComment(response.data);
      })
      .catch((error) => {
        console.log("Error posting ===>", error);
      });
  }

  return (
    <div className="addComment">
      <h2 className="formHeader"> Add comment form </h2>
      <form onSubmit={handleSubmit}>
        <label className="row"> Express yourself! </label>
        <textarea
          className="row"
          type="text"
          name="comment"
          onChange={(e) => handleChange(e)}
        />
        <br />
        <button className="submitButton" type="submit">
          {" "}
          Speak your mind!{" "}
        </button>
      </form>
    </div>
  );
}

export default addComment;
