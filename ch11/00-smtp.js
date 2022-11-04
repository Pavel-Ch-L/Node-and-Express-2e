const nodemailer = require('nodemailer')

const credentials = require('./my_credentials')

const mailTransport = nodemailer.createTransport({
  host: credentials.mail.host,
  auth: {
    user: credentials.mail.user,
    pass: credentials.mail.password,
  },
})

async function go() {
  try {
    const result = await mailTransport.sendMail({
      from: '"Meadowlark Travel" <voltmaster.com@gmail.com>',
      to: 'dbhabu@mailto.plus',
      subject: 'Your Meadowlark Travel Tour 2',
      text: 'Thank you for booking your trip with Meadowlark Travel.  ' +
        'We look forward to your visit!',
    })
    console.log('mail sent successfully: ', result)
  } catch(err) {
    // err.message сообщения только при обмене сообщениями с MSA (сетевая ощибка или ошибка аутентификации).
    // Если MSA не сумел доставить письмо, то узнать об этом можно с помощю API или в аккаунте почтового сервиса.
    console.log('could not send mail: ' + err.message)
  }
}

go()
