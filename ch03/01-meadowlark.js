const express= require('express')
const expressHBS = require('express-handlebars')
const app = express()

const port = process.env.port || 3000

app.engine('hbs', expressHBS({
  defaultLayout: 'main'
}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.type('text/plain')
  res.send('Meadowlark Travel')
})

app.get('/about', (req, res) => {
  res.type('text/plain')
  res.send('About Meadowlark Travel')
})

app.use((req, res) => {
  res.type('text/plain')
  res.status(404)
  res.send('404 - Не найдено')
})

app.use((err, req, res, next) => {
  console.error(err.message)
  res.type('text/plain')
  res.status(500)
  res.send('500 - Ошибка сервера')
})

app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}...`);
})