module.exports=(Sequelize,DataType)=>{
    const Ticket=Sequelize.define("Ticket",{
        nomClient:{
            type:DataType.STRING,
            allowNull:false
        },
        prenomClient:{
            type:DataType.STRING,
            allowNull:false
        },
        numTelClient:{
            type:DataType.STRING,
            allowNull:false
        },
        adresse:{
            type:DataType.STRING,
            allowNull:false
        },
        zone:{
            type:DataType.STRING,
            allowNull:false
        },
        montant:{
            type:DataType.FLOAT,
            allowNull:false
        },
        secteur:{
            type:DataType.STRING,
            allowNull:false
        },
        description:{
            type:DataType.STRING,
            allowNull:false
        },
        etat:{
            type:DataType.STRING,
            allowNull:false
        }
    })
    Ticket.associate=models=>{
        Ticket.belongsTo(models.Support,{
            onDelete:"cascade"
        })
        Ticket.belongsTo(models.Technicien,{
            onDelete:"cascade"
        })
    }
    return Ticket
}