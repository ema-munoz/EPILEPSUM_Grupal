const usuario = (sequelize, type) => {
    return sequelize.define('usuario', {
        idusuario: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: type.STRING,
        telefono: type.INTEGER,
        edad: type.INTEGER,
        username: type.STRING(99),
        password: type.STRING,
        creacionUsuario: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizacionUsuario: {
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP '),
            allowNull: false
        }
    }, {
        timestamps: false,
    })
}

module.exports = usuario
