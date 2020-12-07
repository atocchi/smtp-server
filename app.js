const SMTPServer = require("smtp-server").SMTPServer;
const nodemailer = require('nodemailer');
const os = require('os');
const port = 25;
const simpleParser = require('mailparser').simpleParser;
const express = require('express');
const cors = require ('cors');
const app = express();
const PORT = 3030;
const orm = require('./orm.js');
const url = require('./url.js');

app.use(cors());
app.set('trust proxy', true)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let arr = [];
let raw = [];

const server = new SMTPServer({
    name: url,
    secure: false,
    logger: true,
    onMailFrom(address, session, callback) {
      console.log(address.address)
      return callback();
    },
    onAuth(auth, session, callback) {
      if (auth.username !== "abc" || auth.password !== "def") {
        return callback(new Error("Invalid username or password?>?"));
      }
      console.log(session.envelope.mailFrom);
      callback(null, { user: "CEO" }); // where 123 is the user id or similar property
    },
     onData(stream, session, callback) {
      simpleParser(stream, {}, (err, parsed) => {
        if (err){
          console.log("Error:" , err)
        }
        const toExchange = 'a11-124.smtp-out.amazonses.com';
        const outMessage = {
          from: parsed.from.text,
          to: parsed.to.text,
          subject: parsed.subject,
          text: parsed.text,
          html: parsed.html
        }

        // const transporter = nodemailer.createTransport({
        //     port: 25,
        //     host: toExchange,
        //     name: os.hostname(),
        //     secure: false,
        //     debug: true,
        //     logger: true,
        //     tls: {
        //           rejectUnauthorized: false
        //           }
        // });

        // transporter.sendMail(outMessage);
        // console.log(parsed)
        // console.log(parsed.to.text)
        // console.log(parsed.from.text)
        // console.log(parsed.text)
        let newObj = {
          from: parsed.from.text,
          to: parsed.to.text,
          subject: parsed.subject,
          date: parsed.date,
          text: parsed.text
        }
        orm.insertOne(newObj.from, newObj.to, newObj.subject, newObj.text, newObj.date)
        // arr.unshift(newObj)
        // raw.unshift(parsed)
        stream.on("end", callback)
      })
    // stream.pipe(process.stdout); // print message to console
    // stream.on("end", callback);
    return callback();
  },
  // onRcptTo(address, session, callback) {
  //   if (address.address !== "CEO@nudegoals.com") {
  //     return callback(
  //       new Error("Only allowed@example.com is allowed to receive mail")
  //     );
  //   }
  //   return callback(); // Accept the address
  // },
  disabledCommands: ['AUTH']
 });
console.log
server.listen(port, console.log('started'))

app.listen(PORT, function() {
  console.log(`Server listening on: ${PORT}`);
});

server.on("error", err => {
    console.log("Error %s", err.message);
  });

  app.get('/raw', cors(), function(req, res) {
    res.send(raw)
   })

  app.get('/*', cors(), function(req, res) {
    orm.selectTen(function(data){
      res.json(data)
  })
  })