const fs = require('fs');
const { MSZipTools } = require('./msziptools');

async function extractOriginalData(filePaths) {
  try {

    const chunks = filePaths.map(filePath => fs.readFileSync(filePath));

    const concatenatedData = Buffer.concat(chunks);

    const MSZipTools = new MSZipTools();

    const decompressedData = await MSZipTools.decompress(concatenatedData);

    fs.writeFileSync('output.txt', decompressedData);

    console.log('Extraction successful!');
  } catch (error) {
    console.error(`Error during extraction: ${error.message}`);
  }
}

const MSZipToolsFiles = [
  'path/to/chunk1.mszip',
  'path/to/chunk2.mszip',

];
extractOriginalData(MSZipToolsFiles);
