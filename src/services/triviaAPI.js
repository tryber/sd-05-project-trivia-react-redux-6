export default function triviaAPI() {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  fetch(URL)
    .then((response) => response.json())
    .then((data) => console.log(data))
}
