require('dotenv').config()
const path = require('path')
const express = require('express')
const session = require('express-session')
const routes = require('./controllers')
const sequelize = require('./config/connection')
const exphbs = require('express-handlebars')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express()
const PORT = process.env.PORT || 3001

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

const hbs = exphbs.create({ defaultLayout: 'main' })

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

const init = async () => {
  await sequelize.sync({ force: false })
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
  });
}

init()