import YoutubeEmbed from "../components/YoutubeEmbed";
import "../styles/home.css";

function HomePage() {
  return (
    <div className="homePage">
      <YoutubeEmbed embedId="tyeJ55o3El0" />
      <div className="grid">
        <div className="statsAndAction">
          <div className="columns">
            <div className="cutout">
              <p className="center">Bills in</p>
              <p className="bigNumber">290,007 </p>
              <p className="center">50 years</p>
            </div>
          </div>
          <div className="columns">
            <div className="cutout">
              <p id="slogan">Where do we fit in this process?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
