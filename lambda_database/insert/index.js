var mysql = require('mysql');
var AWS = require('aws-sdk');
const querystring = require('querystring');

exports.handler = (event, context, callback) => {

    const bodyParams = querystring.parse(event.body);

    // Our field from the request.
    const subId = bodyParams['subId'];
    const heartRate = bodyParams['heart'];
    const respRate = bodyParams['resp'];
    const oxySaturation = bodyParams['sp02'];
    const sysBP = bodyParams['sys-bp'];
    const height = bodyParams['height'];
    const weight = bodyParams['weight'];
    const bodyTemp = bodyParams['bodyTemp'];
    const suppOxy = bodyParams['supp-02'];
    const concLevel = bodyParams['conc'];

    

var connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DB_NAME,
    port: process.env.RDS_PORT,
});

var date = Date.now();
console.log(date);
var dateString = date.toString();
var testSubId = subId;

    connection.query("INSERT into userdata (subId, heartRate, respRate, bodyTemp, height, concLevel, oxySaturation, suppOxy, sysBP, weight, dateCreated) VALUES('"+testSubId+"','"+heartRate+"','"+respRate+"','"+bodyTemp+"','"+height+"','"+concLevel+"','"+oxySaturation+"','"+suppOxy+"','"+sysBP+"','"+weight+"','"+Date.now()+"')", function (error, results, fields) {

        callback( null, results );
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