const { readdir } = require('node:fs/promises');
const fs = require('fs');
const path = require('path');
const PATH = path.resolve(__dirname, 'secret-folder');
class LogStats {
  constructor() {
    this.logFileList();
  }

  async logFileList() {
    const files = await readdir(PATH, { withFileTypes: true });

    for (const file of files) {
      const filePath = path.resolve(file.path, file.name);
      let name = file.name;
      name = name.slice(0, name.indexOf('.'));
      let ext = path.extname(filePath);

      const size = new Promise((res, rej) => {
        fs.stat(filePath, (err, stat) => {
          try {
            res(stat.size);
          } catch (e) {
            rej(e);
          }
        });
      });

      if (!file.isDirectory()) {
        console.log(`${name} - ${ext.slice(1)} - ${(await size) * 0.001}kb`);
      }
    }
  }
}

new LogStats();
