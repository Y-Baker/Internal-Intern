const connection = require("./database");

async function getAllMess(email) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT title, users.email, body FROM messages
      INNER JOIN users ON receiverId = users.id;`,
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}

module.exports = getAllMess;
