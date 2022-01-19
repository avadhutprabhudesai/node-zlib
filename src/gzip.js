const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');
/**
 *  Compression using gzip algorithm
 *
 */

let reader = fs.createReadStream('src/samples/zlib-file1.txt');
let writer = fs.createWriteStream('src/samples/zlib-file1.txt.gz');
let gzip = zlib.createGzip();
let unzip = zlib.createGunzip();

pipeline(reader, gzip, writer, (err) => {
  if (err) {
    console.log('\n\nError occured in creating gzip');
  } else {
    console.log('\n\nbuiltins/zlib.js -> gzip successful');
  }

  pipeline(
    fs.createReadStream('src/samples/zlib-file1.txt.gz'),
    unzip,
    fs.createWriteStream('src/samples/zlib-file2.txt'),
    (err) => {
      if (err) {
        console.log('\n\nError occured in unzipping with gunzip');
      } else {
        console.log('\n\nbuiltins/zlib.js -> gunzip successful');
      }
    }
  );
});
