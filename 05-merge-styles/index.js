const fs = require('fs');
const path = require('path');
const stylePath = path.resolve(__dirname, 'styles');
const bundlePath = path.resolve(__dirname, 'project-dist', 'bundle.css');

let createStream = fs.createWriteStream(bundlePath);
createStream.end();

const readFiles = () => {
  fs.readdir(stylePath, (err, files) => {
    files.forEach((file) => {
      if (file.slice(-3) === 'css') {
        let styleFile = path.resolve(stylePath, file);
        fs.readFile(styleFile, (err, data) => {
          fs.appendFile(bundlePath, data.toString(), (e) => e);
        });
      }
    });
  });
};

readFiles();
