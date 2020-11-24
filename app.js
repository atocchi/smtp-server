const SMTPServer = require("smtp-server").SMTPServer;
const port = 25;

const server = new SMTPServer({
    onMailFrom(address, session, callback) {
      console.log(address.address)
    },
    onAuth(auth, session, callback) {
      if (auth.username !== "abc" || auth.password !== "def") {
        return callback(new Error("Invalid username or password"));
      }
      console.log(session.envelope.mailFrom);
      callback(null, { user: 123 }); // where 123 is the user id or similar property
    },
    onData(stream, session, callback) {
      console.log(session.envelope.mailFrom);
    }
 });

server.listen(port, console.log('started'))

server.on("error", err => {
    console.log("Error %s", err.message);
  });