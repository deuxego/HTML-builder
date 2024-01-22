const fs = require('fs');
const path = require('path');

const logFile = () => {
  const result = fs.createReadStream(path.join(__dirname, 'text.txt'));
  result.on('data', (data) => {
    console.log(data.toString());
  });
};

logFile();
