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
         cb(null,'blog' + '-' + Date.now() + path.extname(file.originalname));
     }
 });

 /*** defining upload function ***/
 const upload = multer({
     storage : imageStorage
 }).single('blogImage');


/*** create blog using post ***/
router.post('/',(req,res)=>{

    upload(req,res,err => {
        const blogTitle = req.body.blogTitle;
        const blogDesc = req.body.blogDesc;
        const blogImage = req.file.filename;
        const blogTimestamp = Date.now();
        const blogStatus = 1;
        const blogAuthor = req.body.blogAuthor;

        // console.log(req.body)
        // console.log(req.file)
        
        // console.log(blogTitle)
        // console.log(blogDesc)
        // console.log(blogImage)
        // console.log(blogTimestamp)

        if(helpers.isHeaderValid(req.headers["content-type"],'multipart/form-data') == true){
            if(
                blogTitle!='' && blogTitle!=undefined &&
                blogDesc!='' && blogDesc!=undefined && 
                blogDesc!='' && blogDesc!=undefined && 
                blogImage!='' && blogImage!=undefined &&
                blogAuthor!='' && blogAuthor!=undefined 

            ){
               
                /*** creating object for insertin database ***/
                let obj = {blogTitle,blogDesc,blogImage,blogAuthor,blogTimestamp,blogStatus};
                
                db.getDb().collection(collection).insertOne(obj,(err,result)=>{
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
                });
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
    
    
    
});

module.exports = router;