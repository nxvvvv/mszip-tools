const fs = require('fs');
const { MSZipDecompressor } = require('./index');

const compressedData = fs.readFileSync('path/to/compressed/file.mszip');
const decompressor = new MSZipDecompressor();
decompressor.decompress(compressedData)
  .then(decompressedData => console.log(decompressedData.toString('utf-8')))
  .catch(error => console.error(`Error: ${error.message}`));