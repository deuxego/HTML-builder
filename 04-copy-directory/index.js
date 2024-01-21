const fs = require('fs');
const { readdir } = require('node:fs/promises');
const path = require('path');
class CopyFiles {
  constructor() {
    this.copyPath = path.resolve(__dirname, 'files-copy');
    this.sourcePath = path.resolve(__dirname, 'files');

    this.exist = new Promise((res, rej) => {
      fs.access(this.copyPath, function (error) {
        if (error) {
          console.log('Directory does not exist.');
          rej(false);
        } else {
          console.log('Directory exists.');
          res(true);
        }
      });
    });

    this.exist
      .then((bool) => {
        if (bool === true) {
          fs.rmdir(this.copyPath, { recursive: true }, (err) => {
            if (err) {
              console.log(err);
            } else {
              fs.mkdir(this.copyPath, (err) => console.log(err));
              this.copy();
            }
          });
        }
      })
      .catch(() => {
        fs.mkdir(this.copyPath, (err) => console.log(err));
        this.copy();
      });
  }

  async copy() {
    const files = await readdir(this.sourcePath, (err) => console.log(err));
    for (const file of files) {
      fs.copyFile(
        this.sourcePath + `/${file}`,
        this.copyPath + `/${file}`,
        (err) => console.log(err),
      );
    }
  }
}

new CopyFiles();
