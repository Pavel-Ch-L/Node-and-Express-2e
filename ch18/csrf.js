// Это нужно вставить после body-parser
// cookie-parser и express-session

const csrf = require('csurf')
const { appendFile } = require('fs')

app.use(csrf({ cookie: true }))
app.use((req, res, next) => {
  res.locals._csrfToken = req.csrfToken()
  next()
})

// У каждой отправляемой формы и вызовах AJAX нужно предоставить поле _csrf