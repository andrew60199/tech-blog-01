require('dotenv').config()
const path = require('path')
const express = require('express')
const session = require('express-session')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const exphbs = require('express-handlebars')
const helpers = require('handlebars-helpers')(['comparison'])
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()
const PORT = process.env.PORT || 3001

// Add secrets to heroku
const sess = {
  secret: [
    process.env.SESS_SECRET_01, 
    process.env.SESS_SECRET_02, 
    process.env.SESS_SECRET_03, 
    process.env.SESS_SECRET_04, 
    process.env.SESS_SECRET_05, 
    process.env.SESS_SECRET_06
  ],
  cookie: {
    maxAge: 12 * 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
}

app.use(session(sess))

// Helpers still works if you delete it. Maybe it does it automatically? But its good to include it anyways
const hbs = exphbs.create({ 
  defaultLayout: 'main', 
  helpers: helpers  
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

const init = async () => {
  await sequelize.sync({ alter: true })
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
  });
}

init()