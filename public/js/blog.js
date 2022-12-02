//import format from 'date-fns'
// const format = require('date-fns/format')
// import format from 'date-fns/format'
import { format } from "date-fns"

const message = text => {
    const message3 = document.querySelector('#message3')
    message3.textContent = text 
}

const postComment = async (event) => {
    event.preventDefault()

    const comment = document.querySelector('#user-comment').value.trim()
    const postId = document.querySelector('.invisible').textContent
    const newComment = document.querySelector('#new-comment')

    console.log(postId)

    const response = await fetch('/api/comments/upload', {
        method: 'POST',
        body: JSON.stringify({
          content: comment,
          post_id: postId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
    })
  
    if (response.ok) {
        const newTime = document.querySelector('#new-time')
        const newContent = document.querySelector('#new-comment')

        const time = new Date()

        setTimeout(() => {
            newComment.style.display = 'block'

            newTime.textContent = format(time, 'dd LLL yyyy')
            newContent.textContent = comment

        }, 2000)
        
    } else {
        message('Something went wrong, please try again.')
    }
}

document.querySelector('#comment-form').addEventListener('submit', postComment)