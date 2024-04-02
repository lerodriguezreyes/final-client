import { post } from "../services/authService";

function EditComment() {
    const [editComment, setEditComment] = useState("");
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setEditComment(e.target.value);
    };

    const handleSubmit = (e) => {
      e.preventDefault();
    };

    // useEffect(() => {
    //   }, []);
    
    return (
      <div className="addComment">
        <h2 className="formHeader"> Edit comment </h2>
        <form onSubmit={handleSubmit}>
          <label className="row"> Express yourself! </label>
          <textarea
            className="row"
            type="text"
            name="comment"
            value={comment.comment}
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
  
  
export default EditComment



