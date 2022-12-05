//import format from 'date-fns'
// const format = require('date-fns/format')
// import format from 'date-fns/format'
// import { format } from "date-fns"

// const d = new Date()
// let year = d.getFullYear()
// let month = d.getMonth()
// let day = d.getDay()

// console.log(day + ' ' + month + ' ' + year)

const commentForm = document.querySelector('#comment-form')
const editPost = document.querySelector('#edit-post')
const deletePost = document.querySelector('#delete-post')
const postIdFromURL = window.location.pathname
const destructuring = postIdFromURL.split('/')

const message = text => {
    const message3 = document.querySelector('#message3')
    message3.textContent = text 
}

const postComment = async (event) => {
    event.preventDefault()

    const comment = document.querySelector('#user-comment')
    // You should probably grab it from the URL instead
    const postId = document.querySelector('.invisible').textContent

    const response = await fetch('/api/comments/upload', {
        method: 'POST',
        body: JSON.stringify({
            content: comment.value.trim(),
            post_id: postId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })

    if (response.ok) {
        const newTime = document.querySelector('#new-time')
        const newComment = document.querySelector('#new-comment')
        const newContent = document.querySelector('#new-content')

        const today = moment()

        setTimeout(() => {
            newComment.style.display = 'block'
            newTime.textContent = today.format("DD MMM YYYY")
            newContent.textContent = comment.value.trim()

            // Set the textarea to ''
            commentForm.style.display = 'none'
            // Prevent a user submitting a new comment and overwriting their previous 
            // By disabling the form and replacing the input with a message
            // 'To view the latest comments and or comment again please refresh the page'

            const commentBody = document.querySelector('#comment-body')

            const refreshMessageLine = document.createElement('div')
            refreshMessageLine.className = 'line'
            commentBody.appendChild(refreshMessageLine)

            const refreshMessage = document.createElement('p')
            refreshMessage.className = 'padding'
            refreshMessage.textContent = 'To view the latest comments and or comment again please refresh the page.'
            commentBody.appendChild(refreshMessage)

        }, 200)
        
    } else {
        message('Something went wrong, please try again.')
    }    
}

// Edit post
if (editPost) {
    editPost.addEventListener('click', () => {
        document.location.replace(`/post/${destructuring[2]}/edit`)
    })
}

// Delete post
if (deletePost) {
    deletePost.addEventListener('click', async () => {
        // API call
        const response = await fetch('/api/posts/delete', {
            method: 'DELETE',
            body: JSON.stringify({
                id: destructuring[2],
            }),
            headers: {
            'Content-Type': 'application/json'
            }
        }) 

        if (response.ok) {
            document.location.replace('/')     
        } 
    })
}

if (commentForm) {
    commentForm.addEventListener('submit', postComment)
}
