const express = require('express')
const expressHandlebars = require('express-handlebars')
const cluster = require('cluster')

const app = express()

app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

app.use((req, res, next) => {
  if(cluster.isWorker) //Верно, если процесс не является первичным
    console.log(`Worker ${cluster.worker.id} received request`)
  next()
})

app.get('/fail', (req, res) => {
  // Перехваченное исключение
  throw new Error('Nope!')
})

app.get('/epic-fail', (req, res) => {
  // Не пререхваченное исключение
  process.nextTick(() => {
    throw new Error('Kaboom!')
  })
  res.send('embarrased')
})

app.get('*', (req, res) => res.send('online'))

app.use((err, req, res, next) => {
  // Обработка перехваченных ошибок сервера /fail
  console.error(err.message, err.stack)
  res.status(500).render('500')
})

process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION\n', err.stack);
  // Обработка неперехваченных исключений /epic-fail
  // закрыть соединение с БД
  // записать лог ...
  process.exit(1)
})

function startServer(port) {
  app.listen(port, function() {
    console.log(`Express started in ${app.get('env')} ` +
      `mode on http://localhost:${port}` +
      `; press Ctrl-C to terminate.`)
  })
}

if(require.main === module) {
  // Приложение было запущено напрямую "node 01-server.js"
  startServer(process.env.PORT || 3000)
} else {
  // Приложение вызвано из другого скрипта ("require": export) "node 01-cluster.js"
  module.exports = startServer
}
