const nodemailer = require('nodemailer');
const option = require('./option.js')
var transport = nodemailer.createTransport(option);

  var mailOptions = {
    from: '"CEO Nude" <CEO@nudegoals.com>',
    to: 'andrewtocchi@gmail.com',
    subject: 'Dumb Test',
    text: 'Hello, This message is a test ', 
    html: '<b>Hello,</b><br> This message is a test '
};
// transport.verify(function(error, success) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("Server is ready to take our messages");
//   }
// });

transport.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
});