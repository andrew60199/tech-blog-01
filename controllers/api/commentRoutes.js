const router = require('express').Router()
const { Comment } = require('../../models')
// Technically you won't need this as the comment form wont be added to the client if not logged in. But it is handy to have
// const withAuth = require('../../utils/auth')

// api/comments

router.post('/upload', async (req, res) => {
    try {
        // post_id: req.params doesnt work since we dont have :id in the route
        // console.log(req.params)

        const timestamp = new Date()

        const newComment = await Comment.create({ 
            content: req.body.content, 
            timestamp: timestamp,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })

        // We should send back a message saying the quiz has been added uploaded for people to start using it...
        res.status(200).json(newComment)

    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
})


module.exports = router