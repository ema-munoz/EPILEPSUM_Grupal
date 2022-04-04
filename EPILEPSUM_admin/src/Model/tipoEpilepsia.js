const tipoEpilepsia = (sequelize, type) => {
    return sequelize.define('tipoEpilepsia', {
        idEfectosSecundarios: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: type.STRING,
        descripcionTipoEpilepsia:type.STRING(250),
        creacionTipoEpilepsia: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        ActulizacionTipoEpilepsia: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = tipoEpilepsia
