import "../styles/footer.css";

function Footer() {
  return (
    <div className="footerContainer">
      <img
        id="footerFrame"
        src="https://res.cloudinary.com/dw1igjvgi/image/upload/v1711644483/quoteFrame180_fohqjp.png"
        alt="quote frame"
      />
      <div className="footerText">
        <p id="p1">
          Made with{" "}
          <span>
            <img
              width="25"
              height="25"
              src="https://github.com/lerodriguezreyes/react-kanban/blob/main/images/love.png?raw=true"
              alt="filled-like"
            />
          </span>{" "}
          by Luis Emmanuel
        </p>
        <p id="p2">
          <a
            href="https://github.com/lerodriguezreyes/final-client"
            target="_blank"
          >
            {" "}
            SPA Repository{" "}
          </a>
          <a
            href="https://github.com/lerodriguezreyes/final-server"
            target="_blank"
          >
            {" "}
            Server repository{" "}
          </a>
          <a href="mailto:lerodriguezreyes@outlook.com?subject=About%20is%20Democracy%20%20">
            {" "}
            Reach Out!{" "}
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
