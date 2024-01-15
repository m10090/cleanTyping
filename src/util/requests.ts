import Cookies from "js-cookie";
export async function getText(
  setText: React.Dispatch<React.SetStateAction<string[]>>,
  author: { current: string },
) {
  const response = await fetch(
    `https://api.quotable.io/random?minLength=${
      Cookies.get("string-min-length") ?? 50 
    }&maxLength=${Cookies.get("string-max-length")}`,
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
