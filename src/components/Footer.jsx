function Footer() {
  return (
    <div id="Footer">
      <p id="p1">
        Made with{" "}
        {
          <img
            width="20"
            height="20"
            src="https://github.com/lerodriguezreyes/react-kanban/blob/main/images/love.png?raw=true"
            alt="filled-like"
          />
        }
        by Luis Emmanuel
      </p>
      <p id="p2">
        <a
          href="https://github.com/lerodriguezreyes/final-client"
          target= "_blank"
        >
          {" "}
          SPA Repository{" "}
        </a>
        <a
          href="https://github.com/lerodriguezreyes/final-server"
          target= "_blank"
        >
          {" "}
          Mock server repository{" "}
        </a>
        <a
          href="mailto:lerodriguezreyes@outlook.com?subject=About%20is%20Democracy%20%20"
        >
          {" "}
          Reach Out!{" "}
        </a>
      </p>
    </div>
  );
}

export default Footer;
