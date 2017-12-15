const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const path = require('path');
const nodemailer = require('nodemailer');

router.post('/', (req, res) => {
    const user = req.body;
    const email = req.body.email;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.MAILERUSER,
            pass: process.env.MAILERPASSWORD
        }
    });
    // object to send
    const mailOptions = {
        from: 'test.dev.mn.senate@gmail.com',
        // !TODO! adjust this for dynamic
        to: 'test.dev.mn.senate@gmail.com',
        subject: 'MN Senate Code Challenge',
        html: '<p>Name: ' + user.fName + ' ' + user.lName +'</p>' + 
        '<p>Email: ' + email + '</p>' + 
        '<p>Phone: ' + user.phone + 
        '</p><p>Address: ' + user.address + 
        '</p><p>Comments: ' + user.comments + 
        '</p>'
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

module.exports = router;