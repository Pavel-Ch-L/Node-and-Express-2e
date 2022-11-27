const express = require('express')
const expressHandlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const multiparty = require('multiparty')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const RedisStore = require('connect-redis')(expressSession)
const cors = require('cors')

const handlers = require('./lib/handlers')
const weatherMiddlware = require('./lib/middleware/weather')

const credentials = require('./my_credentials')

require('./db')

const app = express()

app.use('/api', cors())

// Настройка движка представлений
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main',
  helpers: {
    section: function(name, options) {
      if(!this._sections) this._sections = {}
      this._sections[name] = options.fn(this)
      return null
    },
  },
}))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cookieParser(credentials.cookieSecret))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: credentials.cookieSecret,
  store: new RedisStore({
    //url: credentials.redis[app.get('env')].url,
    url: credentials.redis.url,
  }),
}))

const port = process.env.PORT || 3000

app.use(express.static(__dirname + '/public'))

app.use(weatherMiddlware)

app.get('/', handlers.home)

// Обработчики форм браузера
app.get('/newsletter-signup', handlers.newsletterSignup)
app.post('/newsletter-signup/process', handlers.newsletterSignupProcess)
app.get('/newsletter-signup/thank-you', handlers.newsletterSignupThankYou)

// Обработчики fetch/JSON форм
app.get('/newsletter', handlers.newsletter)
app.post('/api/newsletter-signup', handlers.api.newsletterSignup)

// Конкурс фотографий
app.get('/contest/vacation-photo', handlers.vacationPhotoContest)
app.get('/contest/vacation-photo-ajax', handlers.vacationPhotoContestAjax)
app.post('/contest/vacation-photo/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if(err) return handlers.vacationPhotoContestProcessError(req, res, err.message)
    console.log('got fields: ', fields)
    console.log('and files: ', files)
    handlers.vacationPhotoContestProcess(req, res, fields, files)
  })
})
app.post('/api/vacation-photo-contest/:year/:month', (req, res) => {
  const form = new multiparty.Form()
  form.parse(req, (err, fields, files) => {
    if(err) return handlers.api.vacationPhotoContestError(req, res, err.message)
    handlers.api.vacationPhotoContest(req, res, fields, files)
  })
})

// Туры
app.get('/vacations', handlers.listVacations)
app.get('/notify-me-when-in-season', handlers.notifyWhenInSeasonForm)
app.post('/notify-me-when-in-season', handlers.notifyWhenInSeasonProcess)

// Обработка валют
app.get('/set-currency/:currency', handlers.setCurrency)

const db = require('./db')

// API
const vhost = require('vhost')
app.get('/', vhost('api.*', handlers.getVacationsApi))

// Извлекает отпускные туры
app.get('/api/vacations', handlers.getVacationsApi) 

// Возвращает тур по его SKU
app.get('/api/vacation/:sku', handlers.getVacationBySkuApi) 

// Принимает адре эл почты, как параметр строки запроса и добавляет для указанного тура слушателя, ожидающего уведомления.
app.post('/api/vacation/:sku/notify-when-in-season', handlers.addVacationInSeasonListenerApi)

// Запрашивает удаление тура (принимает адрес эл почты и примечание в кач-ве параметров строки запроса)
app.delete('/api/vacation/:sku', handlers.requestDeleteVacationApi)

app.use(handlers.notFound)
app.use(handlers.serverError)

if(require.main === module) {
  app.listen(port, () => {
    console.log( `Express started on http://localhost:${port}` +
      '; press Ctrl-C to terminate.' )
  })
} else {
  module.exports = app
}
