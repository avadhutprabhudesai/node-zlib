const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');
/**
 *  Compression using Brotli algorithm
 */
let reader = fs.createReadStream('src/samples/zlib-file3.txt');
let writer = fs.createWriteStream('src/samples/zlib-file3.txt.gz');
let brotCompress = zlib.createBrotliCompress();
let brotDeCompress = zlib.createBrotliDecompress();

pipeline(reader, brotCompress, writer, (err) => {
  if (err) {
    console.log('\n\nError occured in creating brotli compress');
  } else {
    console.log('\n\nbuiltins/zlib.js -> brotli compress successful');
  }

  pipeline(
    fs.createReadStream('src/samples/zlib-file3.txt.gz'),
    brotDeCompress,
    fs.createWriteStream('src/samples/zlib-file3.txt'),
    (err) => {
      if (err) {
        console.log('\n\nError occured in decompressing with brotli');
      } else {
        console.log('\n\nbuiltins/zlib.js -> brotli decompress successful');
      }
    }
  );
});
