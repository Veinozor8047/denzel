const graphql = require('graphql')
const _ = require('lodash')


const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID
} = graphql;

//dummy data
var movies=[
    {title:'flexman',metascore:'2',id:'1'},
    {title:'geriun',metascore:'54',id:'2'},
    {title:'flzegf',metascore:'32',id:'3'}
]

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields:()=>({
        _id: { type: GraphQLString },
        link:{type: GraphQLString},
        id:{type:GraphQLString},
        metascore:{type:GraphQLString},
        poster:{type:GraphQLString},
        rating:{type:GraphQLInt},
        synopsis:{type:GraphQLString},
        title:{type:GraphQLString},
        votes:{type:GraphQLInt},
        year: { type: GraphQLInt }  
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        movie:{
            type: MovieType,
            resolve: function (source,args,context){
                return context.collection.find({})
                //return context.collection.find({"metascore":{$gt:70}}).toArray();
                //console.log("flex")
            }
                
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
});
