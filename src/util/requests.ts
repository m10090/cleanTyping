export async function getText(
  setText: React.Dispatch<React.SetStateAction<string[]>>,
  author: { current: string },
) {
  const [minLength, maxLength] =
    localStorage.getItem("difficulty") === "easy"
      ? [50,100]
      : localStorage.getItem("difficulty") == "medium"
        ? [100, 200]
        : [200, 300];

  const response = await fetch(
    `https://api.quotable.io/random?minLength=${minLength}&maxLength=${maxLength}`,
  );
  if (response.status === 404) {
    alert("lower the min length or raise the max length");
    window.location.href = "/settings";
    return;
  }

  const data = await response.json();
  author.current = data.author;
  const k = data.content.split("");
  setText(k);
}
