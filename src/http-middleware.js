const { pipeline } = require('stream');
const zlib = require('zlib');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const encodings = (req.header('accept-encoding') || '').trim().split(', ');
  console.log('\n\nencodings', encodings);
  if (encodings.includes('br')) {
    const reader = fs.createReadStream('src/builtins/zlib/index.html');
    const writer = fs.createWriteStream('src/builtins/zlib/index.br.html');
    const brot = zlib.createBrotliCompress();
    pipeline(reader, brot, writer, (err) => {
      if (err) {
        console.log('\n\nError while compressing index.html using brotli');
      } else {
        res.set({
          'Content-Type': 'text/html',
          'Content-Encoding': 'br',
        });
        res.sendFile('index.br.html', {
          root: path.join(__dirname),
        });
      }
    });
  } else {
    res.sendFile('index.html', {
      root: path.join(__dirname),
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
