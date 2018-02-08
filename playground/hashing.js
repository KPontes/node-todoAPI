const {SHA256} = require('crypto-js');

var message = 'I am user number 3';
var hash = SHA256(message).toString();
console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data =  {
  id: 4
};

var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'someSecret').toString()
};

// Middle man attacker change the id but does not know the Salt, so fails
token.data.id = 5
token.hash = SHA256(JSON.stringify(data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'someSecret').toString();

if (resultHash === token.hash) {
  console.log('Data not modified');
} else {
  console.log('Data was modified, no trust!');
}
