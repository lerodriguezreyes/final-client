import { useEffect, useRef } from "react";

const VideoPlayer = () => {
  const cloudinaryRef = useRef();
  const videoRef = useRef();

  useEffect(() => {
    if (cloudinaryRef.current) return;

    cloudinaryRef.current = window.cloudinary;
    cloudinaryRef.current.videoPlayer(videoRef.current, {
      cloud_name: "dw1igjvgi",
    });
  }, []);

  return (
    <video
      ref={videoRef}
      data-cld-public-id="I_m_Just_a_Bill_Schoolhouse_Rock_uva64c"
      controls
      className="video"
    ></video>
  );
};

export default VideoPlayer;
