const fs = require('fs');
const path = require('path');
const PATH = path.resolve(__dirname, 'input.txt');

class FileWritter {
  constructor() {
    this.readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.createStream = fs.createWriteStream(PATH);
    this.createStream.end();
    this.logInput();
    this.eventListener();
  }

  logInput = () => {
    this.readline.question('Hey, input your "input" \n', async (input) => {
      if (input === 'exit') {
        process.exit();
      }
      const data = await this.readFile();
      const mergeData = data + input;
      this.writeFile(mergeData);
      this.logInput();
    });
  };

  writeFile = (data) => {
    this.writeStream = fs.createWriteStream(PATH);
    this.writeStream.write(data);
  };

  readFile = () => {
    return new Promise((resolve, reject) => {
      try {
        fs.readFile(PATH, 'utf8', (err, data) => {
          resolve(data);
        });
      } catch (e) {
        reject(new Error(e));
      }
    });
  };

  eventListener() {
    process.addListener('exit', () => {
      console.log('Good look!)');
    });
  }
}

new FileWritter();
