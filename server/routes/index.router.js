const express = require('express');
const router = express.Router();
const path = require('path');

// serve index.html
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views/index.html'));
});

module.exports = router;