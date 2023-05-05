/* eslint-disable import/extensions */
import {
  fetchLoggedInUser,
  signupAndLoginHandler,
  setNav,
} from './global.js';

function getLoginData () {
  const username = document.querySelector('#user').value;
  const password = document.querySelector('#pswd').value;
  return { username, password };
}

const loginMain = async () => {
  const user = await fetchLoggedInUser();
  if (user) return window.location.assign('/user.html');

  // setNav();
  document.querySelector('#login-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = getLoginData();
      signupAndLoginHandler('/api/users/login', formData);
    });
};

loginMain();
