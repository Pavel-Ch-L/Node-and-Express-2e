// Автоматический рендеринг представлений
// Для автоматический выдачи статических HTML файлов

const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

// Использование представлений
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/public'))

// Выдача домашней страницы
app.get('/', (req, res) => res.render('06-home.handlebars'))

const autoViews = {}
const fs = require('fs')
const { promisify } = require('util')
const fileExists = promisify(fs.exists)

// Автоматический обработчик помещается вконце маршрутов
app.use(async (req, res, next) => {
  const path = req.path.toLowerCase()
  // Проверяем кэш если имеется такой путь то отрисовываем
  if(autoViews[path]) return res.render(autoViews[path])
  // Если в кэше нет проверяем в дирректории 
  // если имеется такой путь то отрисовываем
  if(await fileExists(__dirname + '/views' + path + '.handlebars')) {
    autoViews[path] = path.replace(/^\//, '')
    return res.render(autoViews[path])
  }
  // Если не найдено обабатываем 404 
  next()
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log( `\nnavigate to http://localhost:${port}/staff`))
