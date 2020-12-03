const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "mail.nudegoals.com",
    secure: false,
    port: 25,
    auth: { 
      user: "abc",
      pass: "d"
    },
    debug: true,
    logger: true,
    tls: {
        rejectUnauthorized: false
      }
  });

  var mailOptions = {
    from: '"CEO Nude" <CEO@nudegoals.com>',
    to: 'andrewtocchi@gmail.com',
    subject: 'Nice Nodemailer test',
    text: 'Hey there, it’s our first message sent with Nodemailer ;) ', 
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer'
};
transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});