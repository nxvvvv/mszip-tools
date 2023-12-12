const fs = require('fs');
const { MSZip } = require('./mszip');

async function extractOriginalData(filePaths) {
  try {

    const chunks = filePaths.map(filePath => fs.readFileSync(filePath));

    const concatenatedData = Buffer.concat(chunks);

    const MSZip = new MSZip();

    const decompressedData = await MSZip.decompress(concatenatedData);

    fs.writeFileSync('output.txt', decompressedData);

    console.log('Extraction successful!');
  } catch (error) {
    console.error(`Error during extraction: ${error.message}`);
  }
}

const mszipFiles = [
  'path/to/chunk1.mszip',
  'path/to/chunk2.mszip',

];
extractOriginalData(mszipFiles);