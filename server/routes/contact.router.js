const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const path = require('path');
const async = require('async');
const nodemailer = require('nodemailer');


// serve index.html
router.post('/', () => {

    // 
    // Hook-up email post here
    // 

    let email = '';    

    // connect to db and post info
    async.waterfall([
        function (callback) {
            pool.connect(function (err, client, done) {
                if (err) {
                    console.log('Error connecting:', err);
                } else {

                    // 
                    // TODO -- add query/values for post message
                    // 

                    client.query(query, values, function (error) {
                        done();
                        callback(error, token);
                    });
                }
            });
        },
        // output email
        function (username, done) {
            let transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'test.dev.mn.senate@gmail.com',
                    pass: process.env.MAILERPASSWORD
                }
            });
            // configure nodemailer
            let mailOptions = {
                from: 'test.dev.mn.senate@gmail.com',
                to: email,
                subject: 'MN Senate Code Challenge',
                html: '<p>Hello User!</p>'
            };
            // send new nodemailer
            transporter.sendMail(mailOptions, function (err, info) {
                done(err, 'done');
            });
        }
    ], function (err) {
        if (err) return next(err);
        res.sendStatus('200');
    });
});

module.exports = router;