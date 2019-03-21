const graphql = require('graphql')
const _ = require('lodash')

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLNumber,
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
        id: {type: GraphQLString},
        metascore: {type: GraphQLString},
        title: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        movie:{
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent,args){
                //getting the data from MongoDB
                //console.log(typeof(args.id))
                return _.find(movies, {id:args.id});

            }
        }
    }

})


module.exports = new GraphQLSchema({
    query: RootQuery
});