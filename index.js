var express = require("express");
var app = express();
const nodemailer = require("nodemailer");
const cors = require("cors");
app.use(express.json());
app.use(express.static("public"));
app.use(cors());

var transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
	    user: "hedoneaccess.business@gmail.com",
	    pass: "tmwb mrai ygjy wszl"
	}
 });

let template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        }
        .center-logo {
            text-align: center;
        }
        .logo {
            width: 170px;
        }
        h2 {
            color: #333;
        }
        p {
            margin: 0 0 10px;
        }
        strong {
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="center-logo">
            <img src="https://imageupload.io/ib/3VMdGkCHZGgAa37_1694856951.png" class="logo" alt="Logo">
        </div> <!-- Logo centered within the container -->
        <h2>Contact Form Submission</h2>
        <p><strong>Name:</strong> {{firstName}} {{lastName}}</p>
        <p><strong>Contact Number:</strong> {{contactNumber}}</p>
        <p><strong>Profession:</strong> {{profession}}</p>
        <p><strong>Country:</strong> {{country}}</p>
        <p><strong>Email:</strong> {{email}}</p>
        {{company}}
        {{message}}
    </div>
</body>
</html>
`
let receiver = "hedoneaccess.business@gmail.com";

function sendEmail(html){
	return transport.sendMail({
		from: "Contact Alert <VanillePudding>", // sender address e.g. no-reply@xyz.com or "Fred Foo 👻" <foo@example.com>
		to: receiver, // list of receivers e.g. bar@example.com, baz@example.com
		subject: "Contact", // Subject line e.g. 'Hello ✔'
		//text: text, // plain text body e.g. Hello world?
		html:  html // html body e.g. '<b>Hello world?</b>'
	});
};

app.get("/", function (req, res) {
	res.send("App is running!")
});

// app.post("/set/receiver", function (req, res) {
// 	receiver = req.body.email;
// 	res.send("Receiver set successfully");
	
// });

app.post("/sendEmail", function (req, res) {
    if(!receiver){
        res.status(500).send("Receiver not set");
    }
	else{let html = template;
	html = html.replace("{{firstName}}", req.body.firstName);
	html = html.replace("{{lastName}}", req.body.lastName);
	html = html.replace("{{contactNumber}}", req.body.contactNumber);
	html = html.replace("{{profession}}", req.body.profession);
	html = html.replace("{{country}}", req.body.country);
	html = html.replace("{{email}}", req.body.email);
	html = html.replace("{{company}}", req.body.company ? `<p><strong>Company:</strong> ${req.body.company}</p>` : "");
	html = html.replace("{{message}}", req.body.message ? `<p><strong>Message:</strong> ${req.body.message}</p>` : "");
	sendEmail(html).then(() => {
		res.send("Email sent successfully");
	}).catch((err) => {
        console.log(err);
		res.status(500).send(err);
	});}
});


app.listen(8000, function () {
     console.log("App is running on port 8000!");
})