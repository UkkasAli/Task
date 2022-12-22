const express = require('express')
const Users = require('../models/user')
// const auth = require('../middleware/auth')
const router = new express.Router()
//  const auth = require('../middleware/auth')

// router.post('/user', async (req,res) => {
//     const user = new Users (req.body)
//     try{
//         await user.save()
//         console.log(req.body);
//         res.status(201).send(user)
//     }catch(e) {
//         res.status(400).send(e)
//     }
// })

router.post('/user',async (req,res) =>{
    const user = new Users(req.body)
    try {
        await user.save()
        const token = await
        console.log(req.body)
        user.generateAuthToken()
        res.status(201).send({user,token})
        console.log(user)
    }
    catch(e){
        res.status(400).send(e)
    }
})

router.post('/login', async(req,res) =>{
    try {
        const user = await Users.findByCredentails(req.body.email,req,body.password)
        const token = await user.generateAuthToken() 
        res.send({user,token})
    }catch(e) {
        res.status(400).send()
    }
})
module.exports = router