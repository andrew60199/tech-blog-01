const blogForm = document.querySelector('#blog-form')

const message = text => {
    const message = document.querySelector('#message4')
    message.textContent = text 
}

const postEditedBlog = async (event) => {
    event.preventDefault()

    const overallElement = document.querySelector('#overall')
    const title = document.querySelector('#user-title').value.trim()
    const article = document.querySelector('#user-article').value.trim()

    const postIdFromURL = window.location.pathname
    const destructuring = postIdFromURL.split('/')

    const response = await fetch('/api/posts/edit', {
        method: 'POST',
        body: JSON.stringify({
            id: destructuring[2],
            title: title,
            content: article
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        overallElement.style.display = 'none'
        message('Edit successful! Navigate back to your dashboard to view the updated post.')      
    } 
}

if (blogForm) {
    blogForm.addEventListener('submit', postEditedBlog)
}