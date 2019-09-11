/*** Initializing App *****/
const express = require('express');
const bodyParser = require('body-parser');


const app = express();

/*** initializing body parser for JSON request ***/
app.use(bodyParser.json());
/*** initializing body parser for multipart formdata and others request ***/
app.use(bodyParser.urlencoded({ extended : true}));

const path = require('path');

const db = require('./dbConfig');
const collection = "blog_api";
module.exports = collection;



/*** defining promise for database connection ***/

db.connect((err)=>{
    if(err){
        console.log('Unable to connect to database');
        process.exit(1);
        throw err;
    }else{
       console.log(' Database connected successfully ');
    }
});

app.use('/api/getBlogList',require('./api/getBlogList'));
app.use('/api/addBlog',require('./api/addBlog'));

/*** defining opening server ***/
app.listen(3000,()=>{
    console.log(' App listening on port 3000');
});