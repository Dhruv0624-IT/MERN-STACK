import multer from "multer";
import { extname } from 'path'

const allowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const ext = extname(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

// File filter
const fileFilter = (req, file, cb) => {
    const ext = extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (allowedExtensions.includes(ext) && mime.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"));
    }
};
const upload = multer({ storage, fileFilter, limits: { fileSize: 2 * 1024 * 1024 } })
export default upload