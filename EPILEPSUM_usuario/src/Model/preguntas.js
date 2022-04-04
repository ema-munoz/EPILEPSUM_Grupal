const preguntas = (sequelize, type) => {
    return sequelize.define('preguntas', {
        idPreguntas: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        pregunta: type.STRING,
        video: type.STRING,
        imagen: type.STRING,
        creacionPreguntas: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionPreguntas: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = preguntas