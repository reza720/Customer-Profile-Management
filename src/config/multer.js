import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb (null, "storage/photos");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedType = ["image/jpeg", "image/png"];

    if(allowedType.includes(file.mimetype)){
        cb(null, true);
    }
    else{
        cb(new Error("Invalid filr formate", false))
    }
}

const upload = multer({
    storage,
    fileFilter
});
export default upload;