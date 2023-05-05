/* eslint-disable import/extensions */
import {
  fetchLoggedInUser,
  handleFetch,
  setNav,
  makePostHandler
} from './global.js';

function getPostData () {
  const content = document.querySelector('#post-content').value;
  return { content };
}


const main = async () => {
  const user = await fetchLoggedInUser();
  // setNav(!!user);

  const [secret, _err] = await handleFetch('/api/logged-in-secret');
  console.log('secret, _err:', secret, _err);
  console.log('Ready to work!!!!')

  document.querySelector('#make-post')
  .addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = getPostData();
    makePostHandler('/api/posts', formData);
  });

  



};


main();
