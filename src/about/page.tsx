import githubImage from "../assets/github-desktop.svg";
export default function About() {
  return (
    <div>
      <h1> about </h1>
      <p>
        {" "}
        this page is a project I did to practice typing and react hooks. I used
        the quotable api to get a random quote and then typed it out. I also
        added a cursor to show where I was in the quote. I also need alot of
        your help to make this page better{" "}
        <h6>
          like implementing your styles at
          <a href = "https://github.com/m10090/cleanTyping">
            <img src={githubImage} />
          </a>
        </h6>
        .
      </p>
    </div>
  );
}
