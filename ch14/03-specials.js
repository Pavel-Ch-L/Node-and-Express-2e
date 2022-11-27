// Внедрение спец предложений, через промежуточное ПО

const express = require('express')
const expressHandlebars = require('express-handlebars')
const app = express()

// Использование представлений
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Для изображений и др статических файлов
app.use(express.static(__dirname + '/public'))

// Имитация создания спец предложений
async function getSpecialsFromDatabase() {
  return {
    name: 'Deluxe Technicolor Widget',
    price: '$29.95',
  }
}

// Записаль в локальный контекст представления спец предложение
async function specials(req, res, next) {
  res.locals.special = await getSpecialsFromDatabase()
  next()
}

app.get('/page-with-specials', specials, (req, res) =>
  res.render('page-with-specials')
)

app.get('*', (req, res) => res.send('Перейдите по ссылке "<a href="/page-with-specials">specials</a>" !'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`\nПерейдите на http://localhost:${port}/page-with-specials`))
