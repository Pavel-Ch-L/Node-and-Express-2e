// Один маршрут будет обрабатываться одним обработчиком app.get() по разному 33/50/остальные

const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

app.get('/rgb',
  (req, res, next) => {
    // треть запросов вернет "red"
    if(Math.random() < 0.33) return next()
    res.send('red')
  },
  (req, res, next) => {
    // половина от оставшихся 2/3 запросов
    // вернет "green"
    if(Math.random() < 0.5) return next()
    res.send('green')
  },
  function(req, res){
    // остальные вернут "blue"
    res.send('blue')
  },
)

app.get('*', (req, res) => res.send('Check out the "<a href="/rgb">rgb</a>" page!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(
  `\nПерейдите на http://localhost:${port}/rgb\n` +
  "\n...обновите страницу несколько раз\n"))
