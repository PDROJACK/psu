const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,callback){
        callback(null, `./media/posts/`);
    },
    filename: function(req,file,callback){
        const date = Date.now();
        callback(null, `${date}_${file.originalname.split('.')[0]}.${file.mimetype.split('/')[1]}` );
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});

module.exports = {
    upload
}