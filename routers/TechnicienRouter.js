const express=require('express')
const route=express.Router()
const db=require('../models')


route.post('/addTech',(req,res,next)=>{
    db.Technicien.count({where:{cin:req.body.cin}}).then(doc=>{
        if(doc!=0){
            res.status(400).send("thi cin is used !!")
        }else{
                db.Technicien.create({
                nom:req.body.nom,
                prenom:req.body.prenom,
                cin:req.body.cin,
                numTel:req.body.numTel,
                email:req.body.email,
                zone:req.body.zone,
                secteur:req.body.secteur
                }).then((response)=>res.status(200).send(response))
                .catch((err)=>res.status(400).send(err))
        }
    })
    
    // create(req.body)
})

route.get('/technicien/:id',(req,res,next)=>{
    db.Technicien.findOne({ where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
    // db.User.findAll({where:{id:req.params.id}})
})
route.get('/techniciens',(req,res,next)=>{
    db.Technicien.findAll()
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})
route.patch('/technicien/:id',(req,res,next)=>{
    db.Technicien.update({
        nom:req.body.nom,
        prenom:req.body.prenom,
        cin:req.body.cin,
        numTel:req.body.numTel,
        email:req.body.email,
        zone:req.body.zone,
        secteur:req.body.secteur
    },{where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})
route.delete('/technicien/:id',(req,res,next)=>{
    db.Technicien.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send("deleted !!"))
    .catch((err)=>res.status(400).send(err))
})
route.get('/filtrTech/:secteur',(req,res,next)=>{
    db.Technicien.findAll({ where:{secteur:req.params.secteur}})
    .then((response)=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
})
route.get('/secteurs',(req,res,next)=>{
    db.Secteur.findAll()
    .then((response)=>res.status(200).json(response))
    .catch((err)=>res.status(400).json(err))
})
module.exports=route