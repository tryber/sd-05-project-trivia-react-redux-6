export function getTokenTriviaAPI() {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  return fetch(URL)
    .then((response) => response.json())
    .then((data) => data.token);
}

export async function getQuestionsAPI(token) {
  const URL_TOKEN = `https://opentdb.com/api.php?amount=5&token=${token}`;
  return fetch(URL_TOKEN)
    .then((response) => response.json())
//     .then((data) => objectAPI['results'] = data.results);
//   console.log('obj', objectAPI)
//   return objectAPI;
}
