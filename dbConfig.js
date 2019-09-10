/******** FOR CONNECTING DATABASE *********/

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const dbName = "blog";
const url = "mongodb://localhost:27017";
const mongoOptions = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
};

const state={
    db: null
}

const connect = (cb) => {
    if(state.db){
        cb();
    }else{
        MongoClient.connect(url,mongoOptions,(err,client) => {
            if(err){
                cb(err)
            }else{
                state.db=client.db(dbName);
                cb();
            }
        });
    }
}

const getPrimaryKey=(_id)=>{
    return ObjectID(_id);
}

const getDb=()=>{
    return state.db;
}

module.exports = {getDb,connect,getPrimaryKey};