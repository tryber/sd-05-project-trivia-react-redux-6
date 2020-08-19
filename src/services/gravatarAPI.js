
export default function gravatarAPI(hash) {
  const URL = `https://www.gravatar.com/avatar/${hash}`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => console.log(data))
}