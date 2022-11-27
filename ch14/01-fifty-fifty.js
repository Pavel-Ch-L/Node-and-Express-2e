// Один и тот же маршрут будет обрабатываться разными обработчиками app.get() 50/50

const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

app.get('/fifty-fifty', (req, res, next) => {
  if(Math.random() < 0.5) return next()
  res.send('sometimes this')
})
app.get('/fifty-fifty', (req,res) => {
  res.send('and sometimes that')
})

app.get('*', (req, res) => res.send('Check out the "<a href="/fifty-fifty">fifty-fifty</a>" page!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(
  `\nПерейдите на http://localhost:${port}/fifty-fifty\n` +
  "\n...и обновите страницу несколько раз\n"))
