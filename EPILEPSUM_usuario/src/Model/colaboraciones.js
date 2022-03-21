const colaboraciones = (sequelize, type) => {
    return sequelize.define ("colaboraciones", {
        idcolaboraciones: {
            type: type.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },

        foto: type.STRING,
        nombre: type.STRING,
        descripcion: type.STRING(1500),
        crecioncolaboraciones:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizancolaboraciones:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },{
        timestamps: false,
     })
};

module.exports = colaboraciones;
