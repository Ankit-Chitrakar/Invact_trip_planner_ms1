module.exports = (sequelize, DataTypes) => {
    const siteModel = sequelize.define('site', {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }, {
        timestamps: true,
    })

    return siteModel;
}
