export default function Result( { author, wpm }:{string, number},) {

  return(<h1>
    {author} typed at {wpm} words per minute
  </h1>)
}
