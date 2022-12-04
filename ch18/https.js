const https = require('https')
const fs = require('fs')

const options = {
  key  : fs.readFileSync(__dirname + 'ssl/meadowlark.pem'),
  cert : fs.readFileSync(__dirname + 'ssl/meadowlark.crt')
}

const port = process.env.PORT || 3000
https.createServer(options, app).listen(port, () => {
  console.log(`Express running on port  ${port}`)
})