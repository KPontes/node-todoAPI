const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data =  {
  id: 4
};

var token = jwt.sign(data, 'mySaltSecret');
console.log(token);
var decoded = jwt.verify(token, 'mySaltSecret');
console.log(decoded);
