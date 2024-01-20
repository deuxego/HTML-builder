const { promises } = require('fs');
const path = require('path');

const logFile = async () => {
  const result = await promises.readFile(path.join(__dirname, 'text.txt'));
  console.log(result.toString());
};

logFile();
