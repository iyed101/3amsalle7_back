module.exports=(Sequelize,DataType)=>{
    const Auth=Sequelize.define("Auth",{
        jwt:DataType.STRING,
    })
    Auth.associate=models=>{
        Auth.belongsTo(models.Support,{
            onDelete:"cascade"
        })
    }
    return Auth
}