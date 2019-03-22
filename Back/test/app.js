const Express = require("express");
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

var app = Express();

app.use('/graphql',graphqlHTTP({
    schema,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log('listens to 4000')
});