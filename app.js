const SMTPServer = require("smtp-server").SMTPServer;
const port = 25;
// const host = '192.168.50.57';

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
    stream.pipe(process.stdout); // print message to console
    stream.on("end", callback);
    return callback();
  }
 });
console.log
server.listen(port, console.log('started'))



server.on("error", err => {
    console.log("Error %s", err.message);
  });