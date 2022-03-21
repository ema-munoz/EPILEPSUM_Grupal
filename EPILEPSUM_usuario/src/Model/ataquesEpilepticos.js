const ataquesEpilepticos = (sequelize, type) => {
    return sequelize.define('ataquesEpilepticos', {
        idataquesEpilepticos: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        dias: type.STRING,
        hora: type.STRING,
        duracion: type.STRING,
        creacionAtaquesEpilepticos: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionAtaquesEpilepticos: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}


module.exports = ataquesEpilepticos