// travelRoutes.js
const express = require('express');
const router = express.Router();
const { getTravelOptions } = require('../controllers/travel-controller');
const { addTravelDetails } = require('../controllers/create-travel');

// Unified route to handle all travel options
router.get('/travel', getTravelOptions);
router.post('/travel', addTravelDetails);

module.exports = router;
