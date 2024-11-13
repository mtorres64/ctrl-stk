const multer = require('multer');

function uploadFile(){
    const storage = multer.diskStorage({
        destination:'../storage/imgproductos/',

        filename: function (req, file, cb) {

          var id = req.params.id;

          var extension = file.originalname.slice(file.originalname.lastIndexOf('.'));

          var nombre = id + extension;

          cb(null, nombre);

        }
      })
      
      const upload = multer({ storage: storage }).single('file');

      return upload;
}

module.exports = uploadFile;