const fs = require('fs');
const path = require('path');
const PATH = path.resolve(__dirname, 'input.txt');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const writeFile = (data) => {
  const writeStream = fs.createWriteStream(PATH);
  writeStream.write(data);
};

const createStream = fs.createWriteStream(PATH);
createStream.end();

readline.question('Hey, input your "input" \n', (input) => {
  writeFile(input);
  readline.close();
});
