export const apiRequestToken = async () => {
  const TOKEN_REQ_URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(TOKEN_REQ_URL);
  const data = await response.json();
  return data;
};

export const apiRequestQuestions = async (token) => {
  const GAME_REQ_URL = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(GAME_REQ_URL);
  const data = await response.json();
  return data;
};
