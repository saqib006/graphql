const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const schema = require('./scehma/schema')
const PORT = process.env.PORT || 5000
const app = express()
// mongodb://saqib:saqib@321@ds113849.mlab.com:13849/graphql

mongoose.Promise = global.Promise

mongoose.connect("mongodb://saqib:saqib321@ds113849.mlab.com:13849/graphql", {useNewUrlParser:true})
mongoose.connection.once('open', ()=>{
    console.log('mongo connected')
}).on('error', (err)=>{
    console.log('mongo err', err)
})
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))














app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})









