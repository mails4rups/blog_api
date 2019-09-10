const db = require('../dbConfig');

/*** Initializing router ***/
const router = require('express').Router();

/*** importing helper file ***/
const helpers = require('../utils/helpers');

/*** importing variables ***/ 
const collection=require('../app');

/*** initializing multer for image upload ***/
const multer = require('multer');

/*** initializing path ***/
const path = require('path');

/*** Initialing API response object ***/
let response={error:{},result:{}};

/*** setting up storage engine for files & images ***/
const imageStorage = multer.diskStorage({
    destination : './storage/blogs/',
    filename : function(req,file,cb){
        cb(null,file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
})

/*** defining upload function ***/
const upload = multer({
    storage : imageStorage
}).single('blog-image');


/*** create blog using post ***/
router.post('/',(req,res)=>{

    const blogTitle = req.body.blogTitle;
    const blogDesc = req.body.blogDesc;
    const blogImage = req.body.blogImage;
    const blogTimestamp = Date.now();

    if(helpers.isHeaderValid(req.headers["content-type"],'multipart/form-data') == true){
        console.log(req.body)
        if(
            blogTitle!='' && blogTitle!=undefined &&
            blogDesc!='' && blogDesc!=undefined 
    
        ){
            /* db.getDb().collection(collection).insertOne(req.body,(err,result)=>{
                if(err){
                    response.error.error_data=1;
                    response.error.error_msg=err;
                    helpers.resultData(response,res);
                }else{
                   // res.json({result : result,document : result.ops[0]}); 
                   response.error.error_data=0;
                   response.error.error_msg='';
                   response.result=result.ops[0];
                   helpers.resultData(response,res);
                }
            }); */
        }else{
            response.error.error_data=1;
            response.error.error_msg='All fields must be field with values';
            helpers.resultData(response,res);
        }
    }else{
        response.error.error_data=1;
        response.error.error_msg='Input Type mismatched';
        helpers.resultData(response,res);
    }
    
    
});

module.exports = router;