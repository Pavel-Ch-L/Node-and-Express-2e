// Инкапсуляция функциональности электронной почты

const nodemailer = require('nodemailer')
const htmlToFormattedText = require('html-to-formatted-text')

module.exports = credentials => {

	const mailTransport = nodemailer.createTransport({
    host: credentials.mail.host,
    auth: {
      user: credentials.mail.user,
      pass: credentials.mail.password,
    },
	})

	const from = '"Meadowlark Travel" <voltmaster.com@gmail.com>'
	const errorRecipient = 'youremail@gmail.com'

	return {
    send: (to, subject, html) => 
      mailTransport.sendMail({
        from,
        to,
        subject,
        html,
        text: htmlToFormattedText(html),
      }),
  }

}
