module.exports = (sequelize, DataTypes) => {
    const hotelModel = sequelize.define('hotel', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price_per_night: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        avaiable_rooms:{
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {timestamps: true})

    return hotelModel
}



