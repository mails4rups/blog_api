/*** function defination for creating response JSON ***/
const  resultData = (object, response) => {
    response.send(JSON.stringify(object));
}

module.exports = {resultData}