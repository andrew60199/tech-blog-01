const router = require('express').Router()
const { User } = require('../../models')

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } })

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' })
      return
    }

    const validPassword = await userData.checkPassword(req.body.password)

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' })
      return
    }

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.logged_in = true
      req.session.username = userData.username

      res.status(200).json({ message: 'You are now logged in!' })
    })
    
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({ username: req.body.username, password: req.body.password })

    req.session.save(() => {
      req.session.user_id = userData.id
      req.session.logged_in = true
      req.session.username = userData.username
      
      res.status(200).json({ message: 'You created an account' })
    })

  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

module.exports = router
