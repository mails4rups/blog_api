/*** Initializing App *****/
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
const path = require('path');

const db = require('./dbConfig');
const collection = "blog_api";
module.exports = collection;





db.connect((err)=>{
    if(err){
        console.log('Unable to connect to database');
        process.exit(1);
    }else{
        app.listen(3000,()=>{
            console.log('Database connected successfully, app listening on port 3000');
        });
    }
});

app.use('/api/getBlogList',require('./api/getBlogList'));
//app.use('/api/addBlog',require('./api/addBlog'));
