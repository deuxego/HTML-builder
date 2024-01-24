const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');
const htmlPath = path.resolve(__dirname, 'template.html');
const distPath = path.resolve(__dirname, 'project-dist');
const stylePath = path.resolve(__dirname, 'styles');
const styleFilePath = path.resolve(__dirname, 'project-dist', 'style.css');
const assetsPath = path.resolve(__dirname, 'assets');
const componentsPath = path.resolve(__dirname, 'components');

class Bundler {
  constructor() {
    fs.mkdir(distPath, (e) => e);

    this.createAssetsFolders();
    this.htmlParser();
    this.mergeStyles();
    setTimeout(() => this.copy(), 1000);
  }

  htmlParser() {
    fs.readdir(componentsPath, (err, files) => {
      fs.readFile(htmlPath, async (err, data) => {
        files.forEach(async (fileName) => {
          let dt = new Promise((res, rej) => {
            fs.readFile(componentsPath + `/${fileName}`, (err, fileData) => {
              data = data
                .toString()
                .replace(`{{${fileName.slice(0, -5)}}}`, fileData.toString());
              res(data);
            });
          });

          fs.writeFile(distPath + '/index.html', await dt, (err) => err);
        });
      });
    });
  }

  mergeStyles() {
    fs.readdir(stylePath, (err, files) => {
      files.forEach((file) => {
        if (file.slice(-3) === 'css') {
          let styleFile = path.resolve(stylePath, file);
          fs.readFile(styleFile, (err, data) => {
            fs.appendFile(styleFilePath, data.toString(), (e) => e);
          });
        }
      });
    });
  }

  async copy() {
    const directory = await readdir(assetsPath, (err) => err);
    for (const dir of directory) {
      const dirFiles = await readdir(path.resolve(assetsPath, dir));
      for (const file of dirFiles) {
        fs.copyFile(
          path.resolve(assetsPath, dir, file),
          path.resolve(distPath, 'assets', dir, file),
          (err) => err,
        );
      }
    }
  }

  createAssetsFolders() {
    fs.readdir(assetsPath, (err, folders) => {
      folders.forEach((dir) => {
        fs.mkdir(
          distPath + '/assets' + `/${dir}`,
          { recursive: true },
          (err) => err,
        );
      });
    });
  }
}

new Bundler();
