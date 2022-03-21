const citaControl = (sequelize, type) => {
    return sequelize.define('citasControl', {
        idcitaControl: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreCita: type.STRING,
        nombrePaciente: type.STRING,
        fecha: type.STRING,
        hora: type.STRING,
        establecimiento: type.STRING,
        creacionCitaControl: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionCitaControl: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = citaControl