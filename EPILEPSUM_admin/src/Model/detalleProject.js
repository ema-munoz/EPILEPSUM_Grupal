const detalleProject = (sequelize, type) => {
    return sequelize.define('detalleProjects', {
        idDetalleProyect: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        objetivo: type.STRING,
        crecionDetalleProject:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        actualizanDetalleProjects:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },{
        timestamps: false,
     })    
}

module.exports = detalleProject