const SMTPServer = require("smtp-server").SMTPServer;
const port = 25;
const simpleParser = require('mailparser').simpleParser;
const express = require('express');
const cors = require ('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.set('trust proxy', true)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let arr = []
const server = new SMTPServer({
    name: 'mail.nudegoals.com',
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
        if (err)
          console.log("Error:" , err)
        
        console.log(parsed)
        console.log(parsed.to.text)
        console.log(parsed.from.text)
        console.log(parsed.text)
        let newObj = {
          from: parsed.from.text,
          to: parsed.to.text,
          subject: parsed.subject,
          date: parsed.date,
          text: parsed.text
        }
        arr.push(newObj)
        stream.on("end", callback)
      })
    // stream.pipe(process.stdout); // print message to console
    // stream.on("end", callback);
    return callback();
  },
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

  app.get('/*', cors(), function(req, res) {
   res.send(arr)
  })