const fortune = require('./lib/fortune')
const handlers = require('./lib/handlers')
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

app.get('/', handlers.home)

app.get('/about', handlers.about)

app.use(handlers.notFound)

app.use(handlers.serverError)

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}...`);
})