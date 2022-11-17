// Event listener to redirect them to the login route... 

const navigationListener = document.querySelector('#navigation')

navigationListener.addEventListener('click', (e) => {
    // console.log(e.target.textContent)
    if (e.target.textContent === 'Login') {
        document.location.replace('/login')

    } else if (e.target.textContent === 'Home Page') {
        document.location.replace('/')

        // const homepage = document.querySelector('#home-page')
        // homepage.style.fontWeight = '700'

    } else if (e.target.textContent === 'Your Dashboard') {
        document.location.replace('/dashboard')
    } else {
        return
    }
})
