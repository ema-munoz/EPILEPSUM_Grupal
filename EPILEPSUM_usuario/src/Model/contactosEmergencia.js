const contactosEmergencia = (sequelize, type) => {
    return sequelize.define ("contactosEmergencia", {
        idcontactosEmergencia: {
            type: type.INTEGER, 
            primaryKey: true,
            autoIncrement: true
        },

        nombre: type.STRING,
        familiar: type.STRING,
        telefono: type.INTEGER,
        celular: type.INTEGER,
        crecionContactosEmergencia:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizanContactosEmergencia:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },{
        timestamps: false,
     })
};

module.exports = contactosEmergencia;
