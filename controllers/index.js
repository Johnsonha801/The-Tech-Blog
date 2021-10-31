const router = require('express').Router();

// api routes - /api/
router.use('/api', require('./api'));

// views routes - /views/
router.use('/', require('./frontend'));

// Catch all other routes
router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;