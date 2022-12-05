const router = require('express').Router()
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth')
const format = require('date-fns/format')

router.get('/', async (req, res) => {
    try {

        const dbBlogData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
            order: [
                ['timestamp', 'DESC'],
            ]
        });

        const blogs = dbBlogData.map((blog) => blog.get({ plain: true }))

        // Format time from ISO stored in the DB
        blogs.forEach(blog => {
            blog.timestamp = format(blog.timestamp, 'dd LLL yyyy')
        })

        // You can't set local storage from the backend
        // const blogsToString = JSON.stringify(blogs)
        // const getTime = new Date
        // localStorage.setItem("time", getTime)
        // localStorage.setItem("posts", blogsToString)

        res.render('home', { 
            blogs,
            logged_in: req.session.logged_in 
        })

        // res.send({ 
        //     blogs,
        //     logged_in: req.session.logged_in 
        // })

    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/dashboard', withAuth, async (req, res) => {
    // Error 'Cannot set headers after they are sent to the client'
    // Check body of what you are sending - quizme project
    // Make sure your not sending two files to the client!!

    try {
        const dbBlogData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            // Dont need since they are all owned by the user
            // include: [
            //     {
            //         model: User,
            //         attributes: ['username'],
            //     },
            // ],
            order: [
                ['timestamp', 'DESC'],
            ],         
        })

        const blogs = dbBlogData.map((blog) => blog.get({ plain: true }))

        blogs.forEach(blog => {
            blog.timestamp = format(blog.timestamp, 'dd LLL yyyy')
        })

        res.render('dashboard', { 
            blogs,
            logged_in: req.session.logged_in 
        })
        
        // res.send({ 
        //     blogs,
        //     logged_in: req.session.logged_in 
        // })

    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/create', withAuth, (req, res) => {
    res.render('create', { 
        logged_in: req.session.logged_in 
    })
})

router.get('/post/:id', async (req, res) => {
    try {
        // How do you get the comments username 
        // Had do make a new association
        // And used the debugger to verify it was in there
        // Set the breakpoint on the const blog
        // To use debugger you need ctrl shift p
        // Toggle auto detach 
        // Then do into the data values etc

        const dbBlogData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: [
                        'username'
                    ],
                },
                {
                    model: Comment,
                    attributes: [
                        'content',
                        'timestamp',
                        'user_id'
                    ],
                    include: [
                        {
                            model: User,
                            attributes: [
                                'username'
                            ]
                        }
                    ]
                }
            ]
        })

        const blog = dbBlogData.get({ plain: true });

        // Format time for the post and any comments 
        blog.timestamp = format(blog.timestamp, 'dd LLL yyyy')
        if (blog.comments) {
            blog.comments.forEach(comment => {
                // console.log(comment)
                // console.log(comment.timestamp)
                return comment.timestamp = format(comment.timestamp, 'dd LLL yyyy')
            })
        }

        // console.log(blog)

        // Since we are sending two keys we need to include the key before accessing the value inside it

        // To send username we need to save it in the session check userRoutes
        // Otherwise it was coming up as undefined
        // console.log({ 
        //     blog,
        //     logged_in: req.session.logged_in,
        //     username: req.session.username 
        // })
        
        res.render('blog-post', { 
            blog,
            logged_in: req.session.logged_in,
            username: req.session.username 
        })

    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/post/:id/edit', withAuth, async (req, res) => {

    try {  

        // Need to check that they own the post! If not send them a forbidden message
        const dbBlogData = await Post.findByPk(req.params.id)

        const blog = dbBlogData.get({ plain: true })

        if (blog.user_id === req.session.user_id) {
            res.render('edit', {
                blog,
                logged_in: req.session.logged_in 
            })
            
        } else {
            res.status(403).json('Forbidden')
        }        

    } catch (error) {
        res.status(500).json(error)
    }
    
})

module.exports = router