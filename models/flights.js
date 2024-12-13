module.exports = (sequelize, DataTypes) => {
    const flightModel = sequelize.define('flight', {
        origin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destination: {
            type: DataTypes.STRING,
            allowNull: false
        },
        flight_number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        departure_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        arrival_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        timestamps: true,
    })

    return flightModel;
}
