const axiosInstance = require('../lib/axios');
const validateInputs = require('../validation/flightSearchValidation')
const rateLimit = require('express-rate-limit');


const flightRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per 15 minutes
    statusCode: 429, // Explicitly set status code for rate limiting
    message: 'Too many requests for flights, please try again later.',
    handler: (req, res) => {
        res.status(429).json({ error: 'Too many requests for flights, please try again later.' });
    },
});

const hotelRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50, // Limit each IP to 50 requests per 10 minutes
    statusCode: 429,
    message: 'Too many requests for hotels, please try again later.',
    handler: (req, res) => {
        res.status(429).json({ error: 'Too many requests for hotels, please try again later.' });
    },
});

const siteRateLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50, // Limit each IP to 50 requests per 10 minutes
    statusCode: 429,
    message: 'Too many requests for sites, please try again later.',
    handler: (req, res) => {
        res.status(429).json({ error: 'Too many requests for sites, please try again later.' });
    },
});

const getAllFlights = async (req, res) => {
    try {
        const response = await axiosInstance.get('/flights');

        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error fetching flights:', err);
        res.status(500).json({ error: err.message });
    }
};

const flightDetails = async (req, res) => {
    const { origin, destination } = req.query;
    const errors = validateInputs(req.query)

    if(errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        const flight = await axiosInstance.get(`/flights/search?origin=${origin}&destination=${destination}`);

        res.status(200).json({ data: flight.data });
    } catch (err) {
        console.error('Error fetching flights:', err);
        res.status(500).json({ error: err.message });
    }
};

const getAllHotels = async (req, res) => {
    try {
        const response = await axiosInstance.get('/hotels');

        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error fetching Hotels:', err);
        res.status(500).json({ error: err.message });
    }
};

const getAllSites = async (req, res) => {
    try {
        const response = await axiosInstance.get('/sites');

        res.status(200).json(response.data);
    } catch (err) {
        console.error('Error fetching Sites:', err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllFlights: [flightRateLimiter, getAllFlights],
    getAllHotels: [hotelRateLimiter, getAllHotels],
    getAllSites: [siteRateLimiter, getAllSites],
    flightDetails: [flightRateLimiter, flightDetails],
};
