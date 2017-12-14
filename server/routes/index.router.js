const express = require('express');
const router = express.Router();
const path = require('path');

// serve index.html
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

// serve districts
router.get('/getDistricts', () => {});

// serve senators
router.get('/getSenators', () => {});

// else serve 404
router.get('/*', (req,res) => {
    res.sendStatus(404);
});

module.exports = router;