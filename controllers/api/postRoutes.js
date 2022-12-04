const router = require('express').Router()
const { Post } = require('../../models')
const withAuth = require('../../utils/auth')

// api/posts

router.post('/upload', withAuth, async (req, res) => {
    try {
        const timestamp = new Date()

        const newBlog = await Post.create({
            title: req.body.title, 
            content: req.body.content, 
            timestamp: timestamp,
            user_id: req.session.user_id,
        })

        res.status(200).json(newBlog)

    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
})

module.exports = router