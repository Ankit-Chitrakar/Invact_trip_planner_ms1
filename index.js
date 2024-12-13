const express = require('express')
const app = express()
const cors = require('cors')
const {getAllFlights, getAllHotels, getAllSites, flightDetails} = require('./controllers/dataController')
const {createItinerary, getItinerary} = require('./controllers/itineraryController')
const { sequelize } = require('./models')
require('dotenv').config()

const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());


app.post('/create/itinerary', createItinerary)
app.get('/itinerary/:id', getItinerary)
app.get('/data/flights', getAllFlights)
app.get('/flights/search', flightDetails)
app.get('/data/hotels', getAllHotels)
app.get('/data/sites', getAllSites)

sequelize.authenticate().then(()=>{
    console.log('Database connected successfully')
}).catch(()=>{
    console.error('Error connecting to the database')
    process.exit(1);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});