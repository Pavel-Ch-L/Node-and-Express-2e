const express = require('express')
const morgan = require('morgan')
const fs = require('fs')

const app = express()

switch(app.get('env')) {
  case 'development':
    app.use(morgan('dev')) // Логирование в консоль
    break
  case 'production':
    const stream = fs.createWriteStream(__dirname + '/access.log',
      { flags: 'a' })
    app.use(morgan('combined', { stream })) // Логирование в файл access.log
    break
}

app.get('*', (req, res) => res.send('hello!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Express started in ` +
  `${app.get('env')} at http://localhost:${port}` +
  `; press Ctrl-C to terminate.`))
