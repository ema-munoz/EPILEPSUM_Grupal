const medicacion =(sequelize, type)=>{
    return sequelize.define('medicaciones',{
        idmedicaciones:{
            type:type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        nombre: type.STRING,
        dosis: type.INTEGER,
        hora: type.STRING,
        fechaInicio: type.STRING,
        fechaFinal: type.STRING,
        crecionMedicaciones:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        },
        
        actualizanMedicaciones:{
            type: 'TIMESTAMP',
            defaultValue: type.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    },{
        timestamps: false,
    })
}

module.exports = medicacion