module.exports = (sequelize, DataTypes)=>{
    const itineraryItemModel = sequelize.define('itineraryItem', {
        itineraryId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            refernce: {model: 'itinerary', key: 'id'},
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING,
        },
    }, {timestamps: true})

    itineraryItemModel.associate = (models)=>{
        itineraryItemModel.belongsTo(models.itineraryModel, {foreignKey: 'itineraryId'});
    }

    return itineraryItemModel;
}