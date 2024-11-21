module.exports=(Sequelize,DataType)=>{
    const Object=Sequelize.define("Object",{
        objectif:DataType.INTEGER,
    })
    return Object
}