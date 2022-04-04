const consejos = (sequelize, type) => {
    return sequelize.define('consejos', {
        idconsejos: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreConsejo: type.STRING,
        imagenConsejo: type.STRING,
        videoConsejo: type.STRING,
        creacionConsejos: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionConsejos: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = consejos