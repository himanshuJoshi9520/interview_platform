import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file , cb){
        cb(null , "public")
    },
    filename: function(req , file , cb){
        const filename = Date.now() + "-" + file.originalname;
        cb(null , filename)
    }
})


const fileFilter = (req, file, cb) => {
    const allowed = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/msword' // .doc
    ];
    if (allowed.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF or Word (.docx) files are allowed.'), false);
    }
};

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter,
});