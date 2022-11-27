// Параметры строки запроса

const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

// Использование представлений
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Для изображений и др статических файлов
app.use(express.static(__dirname + '/public'))

const staff = {
  mitch: { name: "Митч",
    bio: 'Митч - человек, который прикроет вашу спину' },
  madeline: { name: "Мадлен", bio: 'Мадлен - наш специалист по Орегону.' },
  walt: { name: "Уолт", bio: 'Уолт - наш специалист по пансионату Орегон' },
}

app.get('/staff/:name', (req, res, next) => {
  const info = staff[req.params.name]
  if(!info) return next()   // Обработчик кода 404
  res.render('05-staffer', info)
})

app.get('/staff', (req, res) => {
  res.render('05-staff', { staffUrls: Object.keys(staff).map(key => '/staff/' + key) })
})

app.get('*', (req, res) => res.send('Перейдите по ссылке "<a href="/staff">staff directory</a>".'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log( `\nПерейдите на http://localhost:${port}/staff`))
