// Механизм авторизации через промежуточное ПО
// При попытке перейти не авторизованному по адресу http://localhost:3000/secret вызовет ошибку

const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

// Подключение промежуточного ПО для имитации авторизации
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
const cookieSecret = Math.random().toString()
app.use(cookieParser(cookieSecret))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: cookieSecret,
}))

// Подключение представления
app.engine('handlebars', expressHandlebars({ defaultLayout: '04-main' }))
app.set('view engine', 'handlebars')

// Статические файлы
app.use(express.static(__dirname + '/public'))

// Фейковая авторизация
app.post('/login', (req, res) => {
  req.session.user = { email: req.body.email }
  req.session.authorized = true
  res.redirect('/secret')
})

// Фейковый выход
app.get('/logout', (req, res) => {
  delete req.session.user
  delete req.session.authorized
  res.redirect('/public')
})

// Делаем user доступным всем представлениям путем помещения его в локальный контекст 
app.use((req, res, next) => {
  if(req.session) res.locals.user = req.session.user
  next()
})

function authorize(req, res, next) {
  if(req.session.authorized) return next()
  res.render('Не авторизован!')
}

app.get('/public', (req, res) => res.render('public'))

app.get('/secret', authorize, (req, res) => res.render('secret'))

app.get('*', (req, res) => res.send('Перейти к <a href="/public"> открытому контенту</a>.'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nПерейти на http://localhost:${port}/public`))
