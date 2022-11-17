const path = require('path')
const express = require('express')
// const routes = require('./routes')
const sequelize = require('./config/connection')
const exphbs = require('express-handlebars');

const app = express()
const PORT = process.env.PORT || 3001

const hbs = exphbs.create({ defaultLayout: 'main' });

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// app.use(routes)

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

const init = async () => {
  await sequelize.sync({ force: false })
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`)
  });
}

init()