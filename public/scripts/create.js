/* eslint-disable import/extensions */
import {
  fetchLoggedInUser,
  signupAndLoginHandler,
  setNav,
} from './global.js';

function getSignupData () {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;
  const firstName = document.querySelector('#first-name').value;
  const lastName = document.querySelector('#last-name').value;
  const email = document.querySelector('#email').value;
 return { username, password, firstName, lastName, email };
}

const signupMain = async () => {
  const user = await fetchLoggedInUser();
  if (user) return window.location.assign('/user.html');

  // setNav();
  document.querySelector('#signup-form')
    .addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = getSignupData();
      signupAndLoginHandler('/api/users', formData);
    });
};

signupMain();
