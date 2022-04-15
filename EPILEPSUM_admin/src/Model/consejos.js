const consejos = (sequelize, type) => {
    return sequelize.define('consejos', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreConsejo: type.STRING,
        imagenConsejo: type.STRING,
        videoConsejo: type.STRING,
        descripcionConsejo: type.STRING,
        creacionConsejo: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionConsejo: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = consejos