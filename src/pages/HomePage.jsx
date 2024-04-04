import VideoPlayer from "../components/VideoPlayer";
import "../styles/home.css";

function HomePage() {
  return (
    <div className="homePage">
      <div>
        <div className="cutout1">
          <p id="slogan1">
            The Power of the People | By the People | For the People |The Power
            of the People | By the People | For the People{" "}
          </p>
        </div>
      </div>
      <VideoPlayer />
      
        <div className="statsAndAction">
          <div className="columns">
            <div className="cutout2">
              <p id="slogan2">Power... is it really the people's power?</p>
      
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
