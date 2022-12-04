const blogForm = document.querySelector('#blog-form')

const message = text => {
    const message = document.querySelector('#message4')
    message.textContent = text 
}

const postBlog = async (event) => {
    event.preventDefault()

    // Grab the data
    const overallElement = document.querySelector('#overall')
    const title = document.querySelector('#user-title').value.trim()
    const article = document.querySelector('#user-article').value.trim()

    // console.log(title)
    // console.log(article)

    const response = await fetch('/api/posts/upload', {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            content: article
        }),
        headers: {
        'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        overallElement.style.display = 'none'
        message('Upload successful! Navigate back to your dashboard to view the new post.')      
    } 
}

if (blogForm) {
    blogForm.addEventListener('submit', postBlog)
}

