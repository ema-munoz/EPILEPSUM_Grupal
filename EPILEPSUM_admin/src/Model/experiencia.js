const experiencias = (sequelize, type) => {
    return sequelize.define('experiencias', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreExperiencia: type.STRING,
        imagenExperiencia: type.STRING,
        videoExperiencia: type.STRING,
        descripcionExperiencia: type.STRING,

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