import useState from "react";

function Buzz() {
  const [upVote, setUpVote] = useState(0);
  const [downVote, setDownVote] = useState(0);

  return (
    <div>
      <button onClick={() => setUpVote((upVote) => upVote + 1)}>
        UPVOTE: {upVote}
      </button>
      <button onClick={() => setDownVote((downVote) => downVote + 1)}>
        DOWNVOTE: {downVote}
      </button>
    </div>
  );
}

export default Buzz;
