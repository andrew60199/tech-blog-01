//import format from 'date-fns'
// const format = require('date-fns/format')
// import format from 'date-fns/format'
// import { format } from "date-fns"

// const d = new Date()
// let year = d.getFullYear()
// let month = d.getMonth()
// let day = d.getDay()

// console.log(day + ' ' + month + ' ' + year)

const message = text => {
    const message3 = document.querySelector('#message3')
    message3.textContent = text 
}

const postComment = async (event) => {
    event.preventDefault()

    const comment = document.querySelector('#user-comment')
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
            comment.value = ''

        }, 200)
        
    } else {
        message('Something went wrong, please try again.')
    }


    
}

document.querySelector('#comment-form').addEventListener('submit', postComment)