const fortune = require('./lib/fortune')
const express= require('express')
const {engine} = require('express-handlebars');
const app = express()

const port = process.env.port || 3000

app.engine('.hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main'
}))
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {
  res.render('about', {
    fortune: fortune.getFortune()
  })
})

app.use((req, res) => {
  res.status(404)
  res.render('404')
})

app.use((err, req, res, next) => {
  console.error(err.message)
  res.status(500)
  res.render('500')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}...`);
})