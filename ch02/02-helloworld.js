//Раздача статических ресурсов

const fs = require('fs')
const http = require('http')
const port = process.env.port || 3000

function serveStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(__dirname + path, (err, data) => {
    if(err) {
      res.writeHead(500, {'Content-Type': 'text/plain'})
      return res.end('500 - внутренняя ошибка')
    }
    res.writeHead(responseCode, {'Content-Type': contentType})
    res.end(data)
  })
}

const server = http.createServer((req, res) => {

  //Удаляем строку запроса, косую черту, приводим к нижнему регистру
  const path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase()

  switch(path) {

    case '':
      serveStaticFile(res, '/public/home.html', 'text/html')
      break

    case '/about':
      serveStaticFile(res, '/public/about.html', 'text/html')
      break

    case '/img/logo.png':
      serveStaticFile(res, '/public/img/logo.png', 'image/png')
      break

    default:
      serveStaticFile(res, '/public/404.html', 'text/html')
      break
  }
})

server.listen(port, () => {
  console.log(`Server is starting on port ${port}...`);
})