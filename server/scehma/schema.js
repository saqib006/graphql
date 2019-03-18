const graphql = require('graphql')
const _ = require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')
const {GraphQLNonNull, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt} = graphql

/*var books = [
    {name:"the wind", genre:"fantasy", id:"1", authorId:"1"},
    {name:"final empire", genre:"fantasy", id:"2", authorId:"2"},
    {name:"hero of ages", genre:"sci-fic", id:"3", authorId:"3"},
    {name:"avengers", genre:"sci-fic", id:"4", authorId:"2"},
    {name:"steel of man", genre:"sci-fic", id:"5", authorId:"3"},
    {name:"the nun", genre:"sci-fic", id:"6", authorId:"3"}
    
]

var authors = [
    {name:"saqib", age:"44", id:"1"},
    {name:"bilal", age:"48", id:"2"},
    {name:"jhon", age:"49", id:"3"},
]*/

const authorType = new GraphQLObjectType({
    name:'Author',
    fields:() => ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent, args){
                //return _.filter(books, {authorId:parent.id})
                console.log('id author', parent)
                return Book.find({authorId:parent.id})
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() => ({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:authorType,
            resolve(parent, args){
                //return _.find(authors,{id:parent.authorId})
                console.log('id book', parent)
                return Author.findById(parent.authorId)
            }
        }
    })
})


const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:authorType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                age:{type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent, args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                })

                return author.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type: new GraphQLNonNull(GraphQLString)},
                genre:{type: new GraphQLNonNull(GraphQLString)},
                authorId:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                })
                return book.save()
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
                // code to get data from db / other source
                //return _.find(books, {id:args.id})
                return Book.findById(args.id)
            }
        },
        author:{
            type:authorType,
            args:{id:{type:GraphQLID}},
            resolve(parent, args){
               // return _.find(authors, {id:args.id})
                console.log('id', parent)
               return Author.findById(args.id)
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent, args){
              //  return books
              return Book.find({})
            }
        },
        authors:{
            type:new GraphQLList(authorType),
            resolve(parent, args){
               // return authors
               return Author.find({})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation
})

