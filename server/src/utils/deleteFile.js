import fs from 'node:fs/promises';

async function deleteFile(path) {
  return await fs.unlink(path);
}

export default deleteFile;
