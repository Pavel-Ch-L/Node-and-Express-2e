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
      
      //Отправка писем нескольким адресатам
      //Допускается перемешивать адреса с именем получателя и без
      to: 'dbhabu@mailto.plus, "Jane Customer" <fofesbq9azf@tmp-mail.ru> ' +
        'fred@hotmail.com',
      subject: 'Your Meadowlark Travel Tour',
      text: 'Thank you for booking your trip with Meadowlark Travel.  ' +
        'We look forward to your visit!',
    })
    console.log('mail sent successfully: ', result)
  } catch(err) {
    console.log('could not send mail: ' + err.message)
  }
}

go()
