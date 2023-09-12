const multer = require('multer');
const fs = require('fs');
const { dirname } = require('path');

const validDocumentNames = [
  'Identificacion',
  'Comprobante de domicilio',
  'Comprobante de estado de cuenta',
];

const validExtensions = ['.jpg', '.jpeg', '.png', '.pdf'];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { uploadType } = req.body;
    const userId = req.params.uid;
    let uploadFolder = '';

    if (uploadType === 'profile') {
      uploadFolder = 'profiles';
    } else if (uploadType === 'product') {
      uploadFolder = 'products';
    } else if (uploadType === 'document') {
      uploadFolder = 'documents';
    }

    const userFolder = `${__dirname}/../files/${uploadFolder}/${userId}`;

    // Crear la carpeta del usuario si no existe
    if (!fs.existsSync(userFolder)) {
      fs.mkdirSync(userFolder);
    }

    cb(null, userFolder);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const { uploadType } = req.body;

  if (uploadType === 'document') {
    const fileName = file.originalname.split('.');
    const fileBaseName = fileName.slice(0, -1).join('.');
    const fileExtension = `.${fileName.pop()}`;

    if (validDocumentNames.includes(fileBaseName) && validExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file name or extension for document upload'), false);
    }
  } else {
    cb(null, true);
  }
};

const uploader = multer({
  storage,
  fileFilter,
  onError: (err, next) => {
    console.error(err);
    next(err);
  },
});

module.exports = { uploader };
