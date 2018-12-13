const multer = require('multer');
const moment = require('moment');


const storadge = multer.diskStorage({
    description(req, file, cd) {
        cb(null, 'uploads/')
    },
    filename(req, file, cd) {
        const date = moment().format('DDMMYYYY-HHmmss_SSS');
        cd(null, `${date}-${file.originalname}`)
    }
});
const fileFilter = (req, file, cd) => {
    if (file.mimeType === 'image/png' || file.mimeType === 'image/jpeg') {
        cd(null, true)
    } else {
        cd(null, false)
    }
};
const limits = {
    fileSize: 1024 * 1024 * 5
};
module.exports = multer({
    storadge, fileFilter, limits
});