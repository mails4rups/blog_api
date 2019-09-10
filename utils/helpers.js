/*** function defination for creating response JSON ***/
const resultData = (object, response) => {
    response.send(JSON.stringify(object));
}

/*** function defination for validate header ***/
const isHeaderValid = (headerName,headerType) => {
    let arr = headerName.split(';');
    if(headerType == arr[0]){
        return true;
    }else{
        return false;
    } 
}

module.exports = {resultData,isHeaderValid}