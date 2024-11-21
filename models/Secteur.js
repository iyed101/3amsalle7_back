module.exports=(Sequelize,DataType)=>{
    const Secteur=Sequelize.define("Secteur",{
        sect:DataType.STRING,
    })
    return Secteur
}