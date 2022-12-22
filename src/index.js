const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const userRouter = require('./router/user')
// const { append } = require('vary')
const port = process.env.PORT || 3000
app.use(userRouter)

const myFunction = async() => {
    const token = jwt.sign({_id:'ukkas123'},'thisismytask',{expiresIn :'30 seconds'})
    console.log(token);
    const data = jwt.verify(token,'thisismytask')
    console.log(data);
}
myFunction()

app.listen(port,()=> {
    console.log('server is up on Port' + port);
})