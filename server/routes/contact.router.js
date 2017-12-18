const express = require('express');
const router = express.Router();
const request = require('request');
const pool = require('../modules/pool');
const path = require('path');
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
    console.log('data in /get route', req.body);
    const user = req.body;
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
            to: req.body.destination.email,
            subject: 'MN Senate Code Challenge',
            html: '<p>Name: ' + user.fName + ' ' + user.lName + '</p><p>Email: ' + user.email + '</p><p>Phone: ' + user.phone + '</p><p>Address: ' + user.address + '</p><p>Address2: ' + user.address2 + '</p><p>City: ' + user.city + '</p><p>State: ' + user.state + '</p><p>Zip: ' + user.zip + '</p><p>Subject: ' + user.subject + '</p><p>Comments: ' + user.comments + '</p>'
        };

        // send nodemailer obj
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.sendStatus(500);
            } else {
                res.sendStatus(200);
            }
        });

        pool // post user comments/info to DB
            .connect(function (err, client, done) {
            const query = 'INSERT INTO comments(first, last, email, address1, address2' +
                    ', zip, state, subject, comments, senatorid, districtid) VALUES($1, $' +
                    '2, $3, $4, $5, $6, $7, $8, $9, $10, $11)';
            const target = [
                user.fName,
                user.lName,
                user.email,
                user.address,
                user.address2,
                user.zip,
                user.state,
                user.subject,
                user.comments,
                user.destination.id,
                user.destination.districtid
            ];
            client.query(query, target, (queryErr, resultObj) => {
                done();
                if (queryErr) {
                    res.sendStatus(500);
                } else {
                    console.log('posted!');
                    res.send(resultObj.rows);
                }
            });
        });
    });
});

router.get('/', (req, res) => {
    pool
        .connect(function (err, client, done) {
            const query = 'SELECT * FROM districts INNER JOIN senators on districts.id=senators.district OR' +
                    'DER BY districts.districtid';
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