const zlib = require('zlib');

class MSZipTools {
  async decompress(compressedData) {
    try {
      if (!Buffer.isBuffer(compressedData)) {
        throw new Error('Input data must be a Buffer');
      }

      const magic = compressedData.slice(0, 2);
      if (!magic.equals(Buffer.from('CK'))) {
        throw new Error('Invalid MSZip format');
      }

      const compressedContent = compressedData.slice(2);
      const decompressedContent = await this.inflateAsync(compressedContent);

      return decompressedContent;
    } catch (error) {
      throw new Error(`Error during MSZip decompression: ${error.message}`);
    }
  }

  inflateAsync(buffer) {
    return new Promise((resolve, reject) => {
      zlib.inflate(buffer, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = MSZipTools;
