const connection = require("./connection.js");



let orm = {

//This Query Selects all from the MYSQL DB
selectTen: function (cb){
query = "SELECT * FROM files ORDER BY id DESC LIMIT 10";
connection.query(query, function(err, result) {
    if (err) throw err;
    cb(result);
  })
},
//finds 10 most recent inputs based on users name, fend to api
findUser: function (too,cb){
  query = "SELECT * FROM files WHERE too = (?) ORDER BY id DESC LIMIT 10";
  connection.query(query,[too], function(err, result) {
      if (err) throw err;
      cb(result);
    })
  },

//This Query Inserts the Variable into the MYSQL DB
insertOne: function(fro,too,subject,text,date){
query = "INSERT INTO files (fro, too, subject, text, date) VALUES (?,?,?,?,?)";
connection.query(query,[fro, too, subject, text, date ], function(err, result) {
        if (err) throw err;
        console.log(`inserted mail from ${fro} to ${too} on ${date}, subject: ${subject}`)
      });
},

deleteOne: function(id){
query = "DELETE FROM files WHERE id=(?)";
connection.query(query,[id], function(err,result){
  if (err) throw err;
  console.log(`Deleted ID #${id} from DataBase`)
})
}

//not currently used
//This Query updates a value in the mysql database (the boolean to true)
// updateOne: function (uName) {
// query = "UPDATE files SET ? WHERE ?";
// connection.query(query,[{value: 1}, {user: uName}], function(err, result) {
//     if (err) throw err;
//   }); 
// }

}


module.exports = orm;