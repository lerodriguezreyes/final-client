import PropTypes from "prop-types";

const YoutubeEmbed = ({ embedId }) => (
  <div className="cutoutShadow">
    <div className="cutout">
      <div className="video-responsive">
        <iframe
          src={`https://www.youtube.com/embed/${embedId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </div>
  </div>
);

YoutubeEmbed.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeEmbed;
