const sintomas = (sequelize, type) => {
    return sequelize.define('sintomas', {
        idEfectosSecundarios: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreSintomas: type.STRING,
        descrpcionsintomas:type.STRING(250),
        creacionSintomas : {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        ActulizacionSintomas : {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = sintomas