const router = require('express').Router()
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth')
const format = require('date-fns/format')

router.get('/', async (req, res) => {
    // Set posts to local storage and then check if there is any. Also add a button to refresh??

    try {

        const dbBlogData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const blogs = dbBlogData.map((blog) => blog.get({ plain: true }))

        // Format time from ISO stored in the DB
        blogs.forEach(blog => {
            blog.timestamp = format(blog.timestamp, 'dd LLL yyyy')
        })

        res.render('home', { 
            blogs,
            logged_in: req.session.logged_in 
        })

    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/signup', (req, res) => {
    res.render('signup')
});

router.get('/dashboard', withAuth, (req, res) => {
    res.render('dashboard')
});

router.get('/create', withAuth, (req, res) => {
    res.render('create')
});

router.get('/post/:id', (req, res) => {
    res.render('blog-post')
});


module.exports = router