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
          rej(false);
        } else {
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
              fs.mkdir(this.copyPath, (err) => err);
              this.copy();
            }
          });
        }
      })
      .catch(() => {
        fs.mkdir(this.copyPath, (err) => err);
        this.copy();
      });
  }

  async copy() {
    const files = await readdir(this.sourcePath, (err) => err);
    for (const file of files) {
      fs.copyFile(
        this.sourcePath + `/${file}`,
        this.copyPath + `/${file}`,
        (err) => err,
      );
    }
  }
}

new CopyFiles();
