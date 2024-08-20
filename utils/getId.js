const connection = require("./database");

async function getId(email) {
  return new Promise((resolve, reject) => {
    connection.query("SELECT id FROM users WHERE email = ?;", [email], (err, result) => {
      if (err) return reject(err);
      const id = result.length > 0 ? result[0].id : null;
      resolve(id);
    });
  });
}

module.exports = getId;