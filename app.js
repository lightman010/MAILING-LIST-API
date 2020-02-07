const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const now = new Date().toLocaleTimeString();

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});


app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    var postData = JSON.stringify(data);
    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/fff086f4a3",
        method: "POST",
        headers: {
            "Authorization": "auth 4bcd433a383df2e9b572c28f8e0f7844-us4"
        },
        body: postData

    };
    request(options, function (error, response, body) {
        if (error) {
            res.send(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/sucess.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });

});

app.post("/failure", function (req, res) {
    res.redirect("/");
});


app.listen(process.env.Port || 3000, function () {
    console.log("server working");
});

//4bcd433a383df2e9b572c28f8e0f7844-us4
//fff086f4a3.
//4bcd433a383df2e9b572c28f8e0f7844 - us4