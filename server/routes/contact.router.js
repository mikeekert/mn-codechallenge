const express = require('express');
const router = express.Router();
const request = require('request');
const pool = require('../modules/pool');
const path = require('path');
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
    const user = req.body;
    const email = req.body.email;
    const secret = process.env.V2PASS;

    // checking capcha being empty
    if (req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null) {
        return res.json({"responseDesc": "Please select captcha"});
    }

    

    // build API call variable to verify capcha token
    const verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secret + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

    // start API call to google
    request(verificationUrl, function (error, response, body) {
        body = JSON.parse(body);
        if (body.success !== undefined && !body.success) {
            // capcha verification failed
            return res.json({"responseCode": 1, "responseDesc": "Failed captcha verification"});
        }

        // perform nodemailer after verification passed
        const transporter = nodemailer.createTransport({ // using Google to send mail, credentials in .env
            service: 'Gmail',
            auth: {
                user: process.env.MAILERUSER,
                pass: process.env.MAILERPASSWORD
            }
        });

        // nodemailer mail object to send
        const mailOptions = {
            from: 'test.dev.mn.senate@gmail.com',

            // !TODO! adjust this for dynamic
            to: 'test.dev.mn.senate@gmail.com',

            subject: 'MN Senate Code Challenge',
            html: '<p>Name: ' + user.fName + ' ' + user.lName + '</p><p>Email: ' + email + '</p><p>Phone: ' + user.phone + '</p><p>Address: ' + user.address + '</p><p>Comments: ' + user.comments + '</p>'
        };

        // send nodemailer obj
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });
    });
});

router.get('/', (req, res) => {
    pool
        .connect(function (err, client, done) {
            const query = 'SELECT * FROM districts INNER JOIN senators on districts.id=senators.district';
            client.query(query, (queryErr, resultObj) => {
                done();
                if (queryErr) {
                    console.log(queryErr);
                    res.sendStatus(500);
                } else {
                    res.send(resultObj.rows);
                }
            });
        });
});


module.exports = router;