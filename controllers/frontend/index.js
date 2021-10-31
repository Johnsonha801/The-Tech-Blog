const router = require('express').Router();

// Home/Auth Routes
router.use('/', require('./homeRoutes'));

// Dashboard Routes
router.use('/dashboard', require('./dashboardRoutes'));

module.exports = router;