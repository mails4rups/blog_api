/***  Initializing database variable ***/
const db = require('../dbConfig');

/*** Initializing router ***/
const router = require('express').Router();

/*** importing helper file ***/
const helpers = require('../utils/helpers');

/*** importing variables ***/ 
const collection=require('../app');

/*** Initialing API response object ***/
let response={error:{},result:{}};

router.post('/',(req,res)=>{
    const pageNo = req.body.pageNo;
    const noOfItemsPerPage = req.body.noOfItemsPerPage;

    if(pageNo!='' && pageNo!=undefined && noOfItemsPerPage!='' && noOfItemsPerPage!=undefined){ 
        db.getDb().collection(collection).find({}).toArray((err,documents)=>{
            if(err){
                response.error.error_data=1;
                response.error.error_msg=err;
                helpers.resultData(response,res);
            }else{
                response.error.error_data=0;
                response.error.error_msg='';
                response.result=documents;
                helpers.resultData(response,res);
            }
        });
    }else{
        response.error.error_data=1;
        response.error.error_msg='All fields must be field with values';
        helpers.resultData(response,res);  
    }
    
});

module.exports = router;