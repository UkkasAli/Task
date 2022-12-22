// const validator = require('validator')
const jwt =require('jsonwebtoken')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    email:{
        type: String,
        unique:true,
        required : true,
        trim:true
    },
    name :{
        type : String,
        require : true
    },
    password : {
        type :String,
        required : true,
        minlength : 7
     }
//     tokens:[{
//         token:{
//         type:String,
//         required : true
//     }
// }]
 })

userSchema.methods.generateAuthToken = async function(){
    const user = this 
        const token = jwt.sign({_id:user._id.toString()},'thisismytask') 
        user.tokens = tokens.concat({token})
        await user.save()
        return token
    
    }
userSchema.statics.findByCredentails = async (email,password) => {
    const user = await Users.findOne({email})
    if (!user){
        throw new Error ('Unable to Login')
    }
    const isMatch = await (password,user.password)
    if(!isMatch) {
        throw new Error ('Unable to Login')
    }
    return user
}    
userSchema.method.toJSON = function()
{
    const user = this 
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    return userObject
}

userSchema.pre('save',async function(next){
    const user = this 
    if (user.isModified('password')){
        user.password = await(user.password,8)
    }
    next()
})

const Users = mongoose.model('Users',userSchema)
module.exports= Users