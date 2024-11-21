const express=require("express")
const app=express()
const db=require('./models')
const supportRouter=require('./routers/supportRouter')
const technicienRouter=require('./routers/TechnicienRouter')
const ticketRouter=require('./routers/TicketRouter')


app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Request-Method','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    res.setHeader('Access-Control-Allow-Methods','*')
    next()
})
app.use('/',supportRouter)
app.use('/',technicienRouter)
app.use('/',ticketRouter)


db.sequelize.sync().then(()=>{
    app.listen(5005,()=>console.log("server running.."))
})