const communication = document.querySelector('#message')
const toSignUp = document.querySelector('#sign-up')

toSignUp.addEventListener('click', () => {
  document.location.replace('/signup')
})

const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (username && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      // https://www.youtube.com/watch?v=5TxF9PQaq4U 
      // This parses the JSON
      const data = await response.json()
      // Then we need to refer back to what key we gave it... 
      communication.textContent = data.message
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);