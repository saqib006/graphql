const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
const cors = require('cors')
const schema = require('./scehma/schema')
const PORT = process.env.PORT || 5000
const app = express()


mongoose.Promise = global.Promise

mongoose.connect("mongo uri", {useNewUrlParser:true})
mongoose.connection.once('open', ()=>{
    console.log('mongo connected')
}).on('error', (err)=>{
    console.log('mongo err', err)
})

app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql:true
}))
















app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})









