const router = require('express').Router()
const { Post } = require('../../models')

// api/posts

router.post('/upload', async (req, res) => {
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
        res.status(500).json(error)
    }
})

router.post('/edit', async (req, res) => {
    try {

        // I feel as if I need more checks to double check they own the post 
        const dbBlogData = await Post.findByPk(req.body.id)

        const blog = dbBlogData.get({ plain: true })

        if (blog.user_id === req.session.user_id) {
            
            const editPost = await Post.update({ 
                title: req.body.title,
                content: req.body.content, 
            }, {
                where: {
                    id: req.body.id
                }
            })

            res.status(200).json(editPost) 

        } else {
            res.status(403).json('Forbidden')
        }         

    } catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/delete', async (req, res) => {
    try {

        // There has to be more checks I need to include
        const dbBlogData = await Post.findByPk(req.body.id)

        const blog = dbBlogData.get({ plain: true })

        if (blog.user_id === req.session.user_id) {
            
            // Need to also delete any comments within that blog post
            const deletePost = await Post.destroy({ 
                where: {
                    id: req.body.id
                }
            })

            res.status(200).json(deletePost) 

        } else {
            res.status(403).json('Forbidden')
        }   

    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router