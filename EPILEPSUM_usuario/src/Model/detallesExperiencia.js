const detallesExperiencias = (sequelize, type) => {
    return sequelize.define('detallesExperiencias', {
        iddetallesExperiencias: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        experiencias: type.STRING(2500),
        creacionDetallesExperiencias: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionDetallesExperiencias: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
};

module.exports = detallesExperiencias