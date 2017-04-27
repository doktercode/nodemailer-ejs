const nodemailer = require('nodemailer');
const express = require('express');
const ejs = require('ejs');
var fs = require('fs');
const app = express();

app.set('view engine', 'ejs');  

app.listen(3000, function() {
   console.log("Listening on 3000");
	sendMail((err,info)=>{
  		console.log(info)
  	});
 });

app.get('/', function (req, res) {
  res.send('Hello World!')
});

const sendMail = (cb) => {
  
	// Create a SMTP transporter object
	let transporter = nodemailer.createTransport({
	    service: 'gmail',
	    auth: {
	        user: 'username',
	        pass:  'password'
	    }
	});
	//let poolConfig = 'smtp://virender.nehra@causeway.com:10101989\@Cc@192.168.76.5/?pool=true';
    //  let transporter = nodemailer.createTransport(poolConfig);        	          
	// Message object
	let message = {

		from: '"name" <emaiId>',

	    // Comma separated list of recipients
	    to: 'test1@gmail.com,test2@gmail.com',
	    subject: 'Subject of the message', //Subject of the message
	    UserName: 'viru56',
	    FullName: 'Virender Nehra',
	    Message: 'Hi this is test project to send mail with ejs template.'
	    
	};
	 var filePath = './views/mail.ejs';
	 var compiled = ejs.compile(fs.readFileSync(filePath, 'utf8'));
	 message.html = compiled(message);
	transporter.sendMail(message, (error, info) => {
		console.log(error);
	    if (error) {
	       cb(error.message,null);
	    }
	    cb(null,info.response);
	    transporter.close();
	});
};