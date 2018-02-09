const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var data =  {
  id: 4
};

var token = jwt.sign(data, 'mySaltSecret');
console.log(token);
var decoded = jwt.verify(token, 'mySaltSecret');
console.log(decoded);

var password = '123abc';
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$dihBIsnEQ8zT89Ays/7U8eNORG2nr4YVtFLlkEnd/tvvf7wzy4TXm';
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
