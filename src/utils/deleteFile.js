import fs from "node:fs/promises";

async function deleteFile(path) {
   try{
        await fs.unlink(path);
        return true;
   }
   catch(err){
        throw err;
   }
};

export default deleteFile;



