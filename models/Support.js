module.exports=(Sequelize,DataType)=>{
    const Support=Sequelize.define("Support",{
        nom:{
            type:DataType.STRING,
            allowNull:false
        },
        prenom:{
            type:DataType.STRING,
            allowNull:false
        },
        cin:{
            type:DataType.STRING,
            allowNull:false
        },
        numTel:{
            type:DataType.STRING,
            allowNull:false
        },
        email:{
            type:DataType.STRING,
            allowNull:false
        },
        password:{
            type:DataType.STRING,
            allowNull:false
        }
    })
    Support.associate=models=>{
        Support.hasMany(models.Ticket,{
            onDelete:"cascade"
        })
        Support.hasMany(models.Auth,{
            onDelete:"cascade"
        })
    }
    return Support
}