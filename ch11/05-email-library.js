// Инкапсуляция функциональности электронной почты

const credentials = require('./my_credentials')
const emailService = require('./lib/email')(credentials)

const email_to = 'e@zepln.com'

if(email_to) {
  emailService.send(email_to, "Hood River tours on sale today!",
    "Get 'em while they're hot!")
    .then(() => {
      console.log('sent successfully!')
    })
    .catch(err => {
      console.log('failed to send email: ', err.message)
    })
} else {
  console.log('Edit this file, and specify an email address to test....')
}
