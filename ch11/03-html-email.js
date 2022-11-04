const nodemailer = require('nodemailer')
const credentials = require('./my_credentials')

const mailTransport = nodemailer.createTransport({
  host: 'smtp.sendgrid.net',
  auth: {
    user: credentials.sendgrid.user,
    pass: credentials.sendgrid.password,
  },
})

// Nodemailer позволяет оправлять в одном письме как текстовую версию, так и HTML(почтовая программа 
//   сама выбирает версию для отображения) 
async function go() {
  try {
    const result = await mailTransport.sendMail({
      from: '"Meadowlark Travel" <info@meadowlarktravel.com>',
      to: 'joe@gmail.com, "Jane Customer" <jane@yahoo.com>, ' +
        'fred@hotmail.com',
      subject: 'Your Meadowlark Travel Tour',
      html: '<h1>Meadowlark Travel</h1>\n<p>Thanks for book your trip with ' +
        'Meadowlark Travel.  <b>We look forward to your visit!</b>',
      text: 'Thank you for booking your trip with Meadowlark Travel.  ' +
        'We look forward to your visit!',
    })
    console.log('mail sent successfully: ', result)
  } catch(err) {
    console.log('could not send mail: ' + err.message)
  }
}

go()
