const express = require('express')
const graphqlHTTP = require('express-graphql')
const PORT = process.env.PORT || 5000
const app = express()

app.use('/graphql', graphqlHTTP({
    
}))














app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})









