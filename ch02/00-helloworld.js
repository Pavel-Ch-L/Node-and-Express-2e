//Простой веб сервер

const http = require('http')
const port = process.env.port || 3000

const server = http.createServer((req, res) => {

  // res.writeHead(200, {'Content-Type': 'text/plain'})
  // res.end('Hellow World')

  res.writeHead(200, {'Content-Type': 'text/html'})
  res.end('<h1>Hellow World</h1>')

})

server.listen(port, () => {
  console.log(`Server is starting on port ${port}...`);
})