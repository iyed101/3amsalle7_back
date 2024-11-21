const express=require('express')
const route=express.Router()
const db=require('../models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const { Op } = require('sequelize');
const today = new Date();
const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
route.post('/register',(req,res,next)=>{
    db.Support.count({where:{email:req.body.email}}).then(doc=>{
        if(doc!=0){
            res.status(400).send("thi email is used !!")
        }else{
            bcrypt.hash(req.body.password,10).then(hpass=>{
                db.Support.create({
                nom:req.body.nom,
                prenom:req.body.prenom,
                cin:req.body.cin,
                numTel:req.body.numTel,
                email:req.body.email,
                password:hpass
                }).then((response)=>res.status(200).send(response))
                .catch((err)=>res.status(400).send(err))
            })
        }
    })
    
    // create(req.body)
})
const privatekey="this is may privat key 123789"
route.post('/login',(req,res,next)=>{
    db.Support.findOne({where:{email:req.body.email}}).then(support=>{
        if(!support){
            res.status(400).json("invalid email and password !!")
        }else{
            bcrypt.compare(req.body.password,support.password).then(same=>{
                if(same){
                    let token=jwt.sign({id:support.id,username:support.nom},privatekey,{
                        expiresIn:"24h"
                    })
                    res.status(200).json({token:token, supportId: support.id })
                }else{
                    res.status(400).json({ message: "invalid email and password !!" })
                }
            })
        }
    })
    
    // create(req.body)
})
route.get('/support/:id',(req,res,next)=>{
    db.Support.findOne({ where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
    // db.User.findAll({where:{id:req.params.id}})
})
route.get('/supports',(req,res,next)=>{
    db.Support.findAll()
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

route.patch('/support/:id',(req,res,next)=>{
    db.Support.update({
        nom:req.body.nom,
        prenom:req.body.prenom,
        cin:req.body.cin,
        numTel:req.body.numTel,
        email:req.body.email,
        password:req.body.password
    },{where:{id:req.params.id}})
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})
route.delete('/support/:id',(req,res,next)=>{
    db.Support.destroy({where:{id:req.params.id}})
    .then((response)=>res.status(200).send("deleted !!"))
    .catch((err)=>res.status(400).send(err))
})


route.post('/jwt',(req,res,next)=>{
    db.Auth.create({
        jwt:req.body.jwt,
        SupportId:req.body.SupportId,
    })
    .then((response)=>res.status(200).send(response))
    .catch((err)=>res.status(400).send(err))
})

route.get('/jwt/:jwt',(req,res,next)=>{
    db.Auth.findOne({ where:{jwt:req.params.jwt}})
    .then((response)=>res.status(200).json(response))
    .catch((err)=>res.status(400).send(err))
})
route.get('/jwt/findname/:jwt',(req,res,next)=>{
    db.Support.findAll({
        attributes: ['nom','prenom'],
        include:[{
            model: db.Auth,
            required: true, 
            where: {
                jwt:req.params.jwt
            }
        }]
    })
    .then(supports => {
        res.json({nom:supports[0].nom,prenom:supports[0].prenom});
    })
    .catch(err=>{
        console.error('Error fetching supports:', err);
    })
})
route.get('/supportdonnne', (req, res, next) => {
    db.Ticket.findAll({
        attributes: [
            [db.sequelize.literal('Support.nom'), 'nom'],
            [db.sequelize.literal('Support.prenom'), 'prenom'],
            [db.sequelize.fn('COUNT', db.sequelize.col('*')), 'total_tickets']
        ],
        include: [{
            model: db.Support,
            attributes: [],
            where: {
                createdAt: {
                [Op.gte]: startOfDay
            }
            }
        }],
        group: ['Support.nom', 'Support.prenom']
    })
    .then(result => {
        console.log(result);
        res.status(200).json(result); 
    })
    .catch(err => {
        console.error('Erreur lors de la récupération des données:', err);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des données' }); 
    });
});



route.get('/supportwork', (req, res, next) => {
    db.Support.findAll({
        attributes: ['id', 'nom', 'prenom', [db.sequelize.fn('COUNT', db.sequelize.col('Tickets.id')), 'nombre_tickets']],
        include: [{
            model: db.Ticket,
            attributes: [],
            where: {
                createdAt: {
                    [db.Sequelize.Op.gte]: startOfDay // Filtrer les tickets à partir du début de la journée
                }
            },
            required: false // Utiliser une jointure externe
        }],
        group: ['Support.id', 'Support.nom', 'Support.prenom']
    })
    .then((response) => res.status(200).send(response))
    .catch((err) => res.status(400).send(err));
});




module.exports=route