const experiencias = (sequelize, type) => {
    return sequelize.define('experiencias', {
        idexperiencias: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreExperiencia: type.STRING,
        creacionExperiencias: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionExperiencias: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = experiencias