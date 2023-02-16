import { MD5 } from 'crypto-js';

export function getHashFromLocalStorage() {
  const hash = localStorage.getItem('hashGravatar');
  return `https://www.gravatar.com/avatar/${hash}`;
}
export function getUserNameFromLS() {
  const userName = localStorage.getItem('userName');
  return `${userName}`;
}
export function saveHashAndUserNametoLS(email, name) {
  const hash = MD5(email).toString();
  localStorage.setItem('hashGravatar', hash);
  localStorage.setItem('userName', name);
}
