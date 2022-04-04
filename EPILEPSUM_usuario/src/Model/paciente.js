const pacientes = (sequelize, type) => {
    return sequelize.define('pacientes', {
        idpaciente: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: type.STRING(99),
        password: type.STRING,
        correoPaciente:type.STRING(150),
        nombrePaciente: type.STRING,
        apellidoPaciente: type.STRING,
        fechaNacimientoPaciente: type.STRING(50),
        celularPaciente: type.STRING(50),
        crecionPaciente:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionPacientes:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },{
        timestamps: false,
     })    
}

module.exports = pacientes
