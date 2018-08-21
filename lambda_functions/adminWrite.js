var mysql = require('mysql');
var AWS = require('aws-sdk');
const querystring = require('querystring');

exports.handler = (event, context, callback) => {

    const bodyParams = querystring.parse(event.body);

    // Our field from the request.
    const user_subId = bodyParams['user-subId'];
    const admin_subId = bodyParams['admin-subId'];
    const address = bodyParams['address'];
    const city = bodyParams['city'];
    const suburb = bodyParams['suburb'];
    const email = bodyParams['email'];
    const DOB = bodyParams['DOB'];
    const familyName = bodyParams['familyName'];
    const middleName = bodyParams['middleName'];
    const firstName = bodyParams['firstName'];
    const phoneNumber = bodyParams['phoneNumber'];
    const gender = bodyParams['gender'];
    
    /*const user_subId = "113ab89f-5532-491e-829e-c33be5f93656";
    const admin_subId = "183bfd38-2ec2-4cf1-8102-a45772a867ce";
    const address = "8 Testing Avenue";
    const city = "Auckland";
    const suburb = "Avondale";
    const email = "Thomas.bird.93@hotmail.com";
    const DOB = "1993/22/08";
    const familyName = "Bird";
    const middleName = "Test";
    const firstName = "Thomas";
    const phoneNumber = "+232323232";
    const gender = "Male";*/
    

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

    connection.query("INSERT into admindata (adminsubId, usersubId, address, DOB, email, familyName, gender, middleName, firstName, phoneNumber, city, suburb, dateLinked) VALUES('"+admin_subId+"','"+user_subId+"', '"+address+"', '"+DOB+"','"+email+"','"+familyName+"','"+gender+"','"+middleName+"','"+firstName+"','"+phoneNumber+"','"+city+"','"+suburb+"','"+date+"')", function (error, results, fields) {
    //connection.query("SELECT * FROM admindata", function (error, results, fields) {
    //connection.query("TRUNCATE TABLE admindata", function (error, results, fields) {
        //callback( null, results );
        if (error) {
            connection.destroy();
            throw error;
        } else {
            // connected!
            //var rows = JSON.parse(JSON.stringify(results[0]));
            //console.log(rows);
            connection.end();
            //callback(null, JSON.stringify(event));
            context.done(null, results); 

        }
    });
};