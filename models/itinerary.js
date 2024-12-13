module.exports = (sequelize, DataTypes) =>{
    const itineraryModel = sequelize.define('itinerary', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });

    itineraryModel.associate = (models)=>{
        itineraryModel.hasMany(models.itineraryItemModel, {
            foreignKey: 'itineraryId',
        })
    }

    return itineraryModel;
}