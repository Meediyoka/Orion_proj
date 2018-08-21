console.log('Function has started!');

const AWS = require('aws-sdk');
var docClient = new AWS.DynamoDB.DocumentClient({region: 'ap-southeast-1'});
const querystring = require('querystring');

exports.handler = (event, context, callback) => {
  
  const bodyParams = querystring.parse(event.body);
  const subId = bodyParams['subId'];
  

 var params = { }
    params.TableName = "vitalSignRecords";
    var hashRangeKey = {"subId" : subId};
  
  /*let scanningParams = {
    TableName: 'vitalRecords',
    Limit: 1,
  };*/
 
 docClient.get(params, function(err, data) {
   if (err) {
        callback(err, null); // an error occurred // 
   }else{  
       callback(null, JSON.stringify(data), subId); 
   }
 })
}
