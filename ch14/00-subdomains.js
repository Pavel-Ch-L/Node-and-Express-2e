// Express по умолчанию не учитывает поддомены
// Для обработки поддоменов используйте vhost
// Для запуска отредактировать C:\Windows\System32\drivers\etc\hosts 	=>  127.0.0.1 	admin.meadowlark.local  127.0.0.1		meadowlark.local

const express = require('express')
const vhost = require('vhost')
const app = express()

// Создадим поддомен admin
// перед всеми остальными роутами
const admin = express.Router()
app.use(vhost('admin.meadowlark.local', admin))

// Создадим маршрут admin
admin.get('*', (req, res) => res.send('Welcome, Admin!'))

// Остальные маршруты
app.get('*', (req, res) => res.send('Welcome, User!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(
  "\nУбедитесь, что отредактировали host файл как показано ниже:" +
  "\n" +
  "\n  127.0.0.1 admin.meadowlark.local" +
  "\n  127.0.0.1 meadowlark.local" +
  "\n" +
  "\nЗатем перейдите по маршрутам:" +
  "\n" +
  `\n  http://meadowlark.local:${port}` +
  "\n" +
  "\n and" +
  `\n  http://admin.meadowlark.local:${port}\n`))
