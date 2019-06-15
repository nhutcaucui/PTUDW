var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    let username = req.query.username;
    console.log('[Profile] -', username);
});

module.exports = router;