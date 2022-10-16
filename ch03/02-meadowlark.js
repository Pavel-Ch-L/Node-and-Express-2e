const express= require('express')
const {engine} = require('express-handlebars');
const app = express()

const fortunes = [
  'Победи свои страхи или они победят тебя.',
  'Рекам нужны истоки.',
  'Не бойся неведомого.',
  'Тебя ждет приятный сюрпиз.',
  'Будъ проще везде, где только можно.'
]

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
  const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
  res.render('about', {
    fortune: randomFortune
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