const zlib = require('zlib');

class MSZip {
  async decompress(compressedData) {
    try {
      // Check if compressedData is a buffer
      if (!Buffer.isBuffer(compressedData)) {
        throw new Error('Input data must be a Buffer');
      }

      const magic = compressedData.slice(0, 2);
      // Compare magic bytes using Buffer.equals
      if (!magic.equals(Buffer.from('CK'))) {
        throw new Error('Invalid MSZip format');
      }

      // Assuming zlib compression is used in MSZip
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

module.exports = MSZip;