const {flightModel, hotelModel, siteModel, itineraryModel, itineraryItemModel} = require('../models');
const createItinerary = async (req, res)=>{
    try{
        const {flights, hotels, sites, name}= req.body; 
        const newItinerary = await itineraryModel.create({name: name});

        // check if flight data is in req.body or not 
        if(flights && flights.length > 0){
            for(let flight of flights){
                const savedFlight = await flightModel.create(flight);
                await itineraryItemModel.create({
                    itineraryId: newItinerary.id,
                    itemId: savedFlight.id,
                    type: 'flight'
                })

            }
        }
        if(hotels && hotels.length > 0){
            for(let hotel of hotels){
                const savedHotel = await hotelModel.create(hotel);
                await itineraryItemModel.create({
                    itineraryId: newItinerary.id,
                    itemId: savedHotel.id,
                    type: 'hotel'
                })

            }
        }
        if(sites && sites.length > 0){
            for(let site of sites){
                const savedSites = await siteModel.create(site);
                await itineraryItemModel.create({
                    itineraryId: newItinerary.id,
                    itemId: savedSites.id,
                    type: 'site'
                })

            }
        }

        res.status(201).json({message: 'Itinerary created successfully', itinerary: newItinerary});
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

const getItinerary = async (req, res) => {
    try{
        const itinerary = await itineraryItemModel.findByPk(req.params.id);
        if(!itinerary){
            return res.status(404).json({message: 'Itinerary not found'});
        }

        const items = itineraryItemModel.findAll({where: {itineraryId: itinerary.id}})
        const flights = [];
        const hotels = [];
        const sites = [];

        for(const item of items) {
            if(item.type === 'flight'){
                const flightDetails = flightModel.findByPk(item.itemId);
                flights.push(flightDetails);
            } else if(item.type === 'hotel'){
                const hotelDetails = hotelModel.findByPk(item.itemId);
                hotels.push(hotelDetails);
            }else{
                const siteDetails = siteModel.findByPk(item.itemId);
                sites.push(siteDetails);
            }
        }

        res.status(200).json({
            itinerary: itinerary,
            flights: flights,
            hotels: hotels,
            sites: sites
        });
    }catch(err){
        console.log(err);
        res.status(500).json({message: err.message});
    }
}

module.exports = {createItinerary, getItinerary}