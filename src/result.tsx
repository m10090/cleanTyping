export default function Result({ author, wpm }) {
  return (
    <div onKeyDown={() =>location.reload()}>
      <h1>
        {author} typed at {wpm} words per minute
      </h1>
      <h3> any key to try agian</h3>
      <button onClick={() => location.reload()}>Try Again</button>
    </div>
  );
}
