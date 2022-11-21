// How can I remove the login,js file from the html doc...
// Was causing errors since the first variable was named the same as one another... 
const communication2 = document.querySelector('#message')

const signUpFormHandler = async (event) => {
    event.preventDefault();
  
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (email && password) {
      const response = await fetch('/api/users/signup', {
        method: 'PUT',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        const data = await response.json()
        communication2.textContent = data.message
      }
    }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signUpFormHandler);