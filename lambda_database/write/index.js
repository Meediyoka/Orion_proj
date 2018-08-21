var mysql = require('mysql');
var AWS = require('aws-sdk');
const querystring = require('querystring');

exports.handler = (event, context, callback) => {

    const bodyParams = querystring.parse(event.body);

    // Our field from the request.
    const subId = bodyParams['subId'];

var connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME2,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    port: process.env.RDS_PORT,
});

var date = Date.now();
console.log(date);
var dateString = date.toString();
var testSubId = subId;

    connection.query("SELECT * FROM userData WHERE subId = '"+subId+"' ORDER BY dateCreated DESC LIMIT 5", function (error, results, fields) {    // looks for matching uniqueId in database and gets last 5 results for each value descending by 5

        if (error) {
            connection.destroy();
            throw error;
        } else {
            // connected!
            //var rows = JSON.parse(JSON.stringify(results[0]));
            //console.log(rows);
            connection.end();
            //callback(null, JSON.stringify(event));
            callback(null, results);

        }
    });
};