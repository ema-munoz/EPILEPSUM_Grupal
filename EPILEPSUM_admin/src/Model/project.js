const project = (sequelize, type) => {
    return sequelize.define('projects', {
        idProyect: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: type.STRING,
        descripcion: type.STRING(2250),
        mision: type.STRING(2250),
        vision: type.STRING(2250),
        crecionProject:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizanProjects:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },{
        timestamps: false,
     })    
}

module.exports = project