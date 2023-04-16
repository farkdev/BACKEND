// import { dirname } from "path";
// import { fileURLToPath } from "url";
// export const _dirname = dirname(fileURLToPath(import.meta.url));
// export default __dirname

const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(request, file, cb){
        cb(null, `${__dirname}/public/uploads`)
    },
    filename: function(request, file, cb){
        console.log('file: ', file)
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


const uploader = multer({
    storage, 
    onError: function(err, next){
        console.log(err)
        next()
    }
})





module.exports = {uploader}
