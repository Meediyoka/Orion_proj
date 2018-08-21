var aws = require('aws-sdk');
var ses = new aws.SES({
   region: 'us-west-2'										//Only Oregon region was available for the SES service
});

exports.handler = function(event, context) {
    console.log("Incoming: ", event);
   var email = querystring.parse(event); 					// Used as potential ToAddresses when passed from application

    var eParams = {
        Destination: {
            ToAddresses: ["testvitalsreceive@gmail.com"]	// Target Email			
        },
        Message: {
            Body: {
                Text: {
                    Data: "Hey! This is the test text!"
                }
            },
            Subject: {
                Data: "Test Subject Line!!!"
            }
        },
        Source: "testingvitalemail@gmail.com"				// Email to be sent from
    };

    console.log('===SENDING EMAIL===');				
    var email = ses.sendEmail(eParams, function(err, data){
        if(err) console.log(err);
        else {
            console.log("===EMAIL SENT===");
            console.log(data);


            console.log("EMAIL CODE END");
            console.log('EMAIL: ', email);
            context.succeed(event);

        }
    });

};