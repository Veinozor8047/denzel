const Express = require("express");
const BodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectID;

const imdb = require('./src/imdb')
const DENZEL_IMDB_ID = 'nm0000243'

const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = "mongodb+srv://antoineWashington:WashingtonDenzel@denzelcluster-anseg.azure.mongodb.net/test?retryWrites=true";
const DATABASE_NAME = "DenzelDB";
/*
const graphql = require('graphql')
const _ = require('lodash')

const { 
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLID
} = graphql;
*/
var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

var database, collection, collectionReviewed;

app.listen(9292, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("AllMovies");
        collectionWorkable = database.collection("ToReview")
        console.log("Connected to `" + DATABASE_NAME + "`");
    });
});

//PostMan
app.post("/movies/populate", async(request, response) => {
    const all = await imdb(DENZEL_IMDB_ID);

    collection.insert(all, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
        console.log("Movies inserted")
    });
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        var answer = {"total :": result.length}
        response.send(answer)
        console.log("Movies sent");
    });
});
app.get("/movies", (request, response) => {
    collection.find({metascore:{$gt:70}}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        var random = result[Math.floor((Math.random()*result.length-1)+1)]
        response.send(random);
        //console.log(result.length-1)
    });
});
app.get("/movies/search", (request, response) => {
    console.log(request)
    var SrcLimit=5;
    var SrcMeta=0;
    if(request.query.metascore!=null){
        SrcMeta=Number(request.query.metascore);
    }
    if(request.query.limit!=null){
        SrcLimit=Number(request.query.limit);
    }
    collection.find({"metascore":{"$gt":SrcMeta-1}}).limit(SrcLimit).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        //console.log(request.query.metascore)
        response.send(result);
    });
});
app.get("/movies/:id", (request, response) => {
    collection.findOne({"id":request.params.id}, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        //console.log("moviesid")
        response.send(result);
    });
});


app.post("/movies/:id", (request, response) => {
    collection.find({}).toArray((error, result) => {
        if(error) {
            return response.status(500).send(error);
        }

        response.send(result);
    });
});

//graphql
app.use('/graphql', graphqlHTTP({
    schema,
    context:{collection},
    graphiql: true
}));

/*
//GraphQL
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLString },
        metascore: { type: GraphQLInt },
        title: { type: GraphQLString }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                //getting the data from MongoDB
                //console.log(typeof(args.id))
                return _.findOne(collection, { "id": request.params.id })

            }
        }
    }
})

const Schemaa = new GraphQLSchema({ query: RootQuery });
app.use('/graphql', graphqlHTTP({
    Schemaa,
    graphiql: true
}));
*/