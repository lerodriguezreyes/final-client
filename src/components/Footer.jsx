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
          href="https://github.com/lerodriguezreyes/dnd-character-generator"
          className="spread"
        >
          {" "}
          SPA Repository{" "}
        </a>
        <a
          href="https://github.com/lerodriguezreyes/mock-server-dnd-character-generator"
          className="spread"
        >
          {" "}
          Mock server repository{" "}
        </a>
        <a
          href="mailto:lerodriguezreyes@outlook.com?subject=About%20Your%20DND%20Generator%20"
          className="spread"
        >
          {" "}
          Reach Out!{" "}
        </a>
      </p>
    </div>
  );
}

export default Footer;
